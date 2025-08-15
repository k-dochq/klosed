#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

/**
 * 간단하고 정확한 미사용 파일 감지 스크립트
 *
 * 핵심 원리:
 * 1. 모든 Next.js App Router 진입점에서 시작
 * 2. DFS로 모든 참조를 따라가며 사용된 파일들을 수집
 * 3. 수집되지 않은 파일들이 미사용 파일
 */

interface AnalysisConfig {
  deleteFiles: boolean;
  outputJson: boolean;
  verbose: boolean;
}

class SimpleUnusedFileDetector {
  private config: AnalysisConfig;
  private allFiles: string[] = [];
  private usedFiles: Set<string> = new Set();
  private visitedFiles: Set<string> = new Set();

  constructor(config: AnalysisConfig) {
    this.config = config;
  }

  /**
   * 모든 소스 파일 수집
   */
  private async collectAllFiles(): Promise<void> {
    const patterns = ['**/*.{ts,tsx,js,jsx}', '**/*.css'];
    const ignorePatterns = [
      'node_modules/**',
      '.next/**',
      '.git/**',
      'dist/**',
      'build/**',
      'coverage/**',
    ];

    this.allFiles = [];
    for (const pattern of patterns) {
      const files = await glob(pattern, {
        ignore: ignorePatterns,
        absolute: false,
        dot: false,
      });
      this.allFiles.push(...files);
    }

    this.allFiles = [...new Set(this.allFiles)]; // 중복 제거
    if (this.config.verbose) {
      console.log(`📁 Found ${this.allFiles.length} files to analyze`);
    }
  }

  /**
   * Next.js App Router 진입점들 찾기
   */
  private getEntryPoints(): string[] {
    const entryPoints: string[] = [];

    // 1. Next.js App Router 특수 파일들
    for (const file of this.allFiles) {
      const fileName = path.basename(file);
      const isAppRouterFile =
        file.startsWith('app/') &&
        [
          'layout.tsx',
          'layout.ts',
          'layout.js',
          'page.tsx',
          'page.ts',
          'page.js',
          'loading.tsx',
          'loading.ts',
          'loading.js',
          'error.tsx',
          'error.ts',
          'error.js',
          'not-found.tsx',
          'not-found.ts',
          'not-found.js',
          'route.ts',
          'route.js',
          'globals.css',
        ].includes(fileName);

      if (isAppRouterFile || file === 'middleware.ts') {
        entryPoints.push(file);
      }
    }

    if (this.config.verbose) {
      console.log(`🚪 Found ${entryPoints.length} entry points:`, entryPoints);
    }

    return entryPoints;
  }

  /**
   * 파일에서 임포트하는 모든 파일들을 찾기
   */
  private getImportedFiles(filePath: string): string[] {
    if (!fs.existsSync(filePath)) return [];

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const imports: string[] = [];

      // 임포트 패턴들
      const importPatterns = [
        /import.*?from\s+['"`]([^'"`]+)['"`]/g,
        /import\(['"`]([^'"`]+)['"`]\)/g,
        /require\(['"`]([^'"`]+)['"`]\)/g,
      ];

      for (const pattern of importPatterns) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const importPath = this.resolveImportPath(match[1], filePath);
          if (importPath) {
            // 절대 경로를 상대 경로로 변환하여 확인
            const relativePath = path.relative(process.cwd(), importPath);
            if (this.allFiles.includes(relativePath) || this.allFiles.includes(importPath)) {
              imports.push(relativePath);
              if (this.config.verbose) {
                console.log(`   ✅ Added import: ${relativePath}`);
              }
            } else {
              if (this.config.verbose) {
                console.log(
                  `   ❌ Import not in allFiles: ${relativePath} (resolved from ${importPath})`,
                );
              }
            }
          }
        }
      }

      return imports;
    } catch (error) {
      if (this.config.verbose) {
        console.warn(`⚠️  Could not read ${filePath}:`, error);
      }
      return [];
    }
  }

  /**
   * 임포트 경로를 실제 파일 경로로 해석
   */
  private resolveImportPath(importPath: string, fromFile: string): string | null {
    // 외부 모듈 제외
    if (!importPath.startsWith('.') && !this.isLocalPath(importPath)) {
      return null;
    }

    let resolvedPath: string;

    if (importPath.startsWith('.')) {
      // 상대 경로
      const fromDir = path.dirname(fromFile);
      resolvedPath = path.resolve(fromDir, importPath);
    } else {
      // 절대 경로 (TypeScript path mapping)
      const tsConfigMapping = this.resolveTypeScriptPath(importPath);
      if (tsConfigMapping) {
        resolvedPath = tsConfigMapping;
      } else {
        resolvedPath = path.resolve(importPath);
      }
    }

    // 실제 파일 찾기
    return this.findActualFile(resolvedPath);
  }

  /**
   * 로컬 경로인지 확인
   */
  private isLocalPath(importPath: string): boolean {
    return (
      importPath.startsWith('@/') ||
      ['shared/', 'entities/', 'features/', 'widgets/', 'app/', 'pages/'].some((prefix) =>
        importPath.startsWith(prefix),
      )
    );
  }

  /**
   * TypeScript path mapping 해석
   */
  private resolveTypeScriptPath(importPath: string): string | null {
    // tsconfig.json 읽기
    try {
      const tsConfigContent = fs.readFileSync('tsconfig.json', 'utf-8');
      const tsConfig = JSON.parse(tsConfigContent);
      const paths = tsConfig?.compilerOptions?.paths || {};
      const baseUrl = tsConfig?.compilerOptions?.baseUrl || '.';

      if (this.config.verbose) {
        console.log(`🔍 Resolving path: ${importPath}`);
      }

      for (const [pattern, mappings] of Object.entries(paths)) {
        const regexPattern = pattern.replace(/\*/g, '(.*)');
        const regex = new RegExp(`^${regexPattern}$`);
        const match = importPath.match(regex);

        if (match && Array.isArray(mappings)) {
          if (this.config.verbose) {
            console.log(`   Matched pattern: ${pattern} → ${mappings}`);
          }

          for (const mapping of mappings) {
            const resolvedMapping = mapping.replace(/\*/g, match[1] || '');
            const fullPath = path.resolve(baseUrl, resolvedMapping);

            if (this.config.verbose) {
              console.log(`   Resolved to: ${fullPath}`);
            }

            return fullPath;
          }
        }
      }

      if (this.config.verbose) {
        console.log(`   No match found for: ${importPath}`);
      }
    } catch (error) {
      if (this.config.verbose) {
        console.log(`   Error reading tsconfig: ${error}`);
      }
    }

    return null;
  }

  /**
   * 실제 파일 찾기
   */
  private findActualFile(basePath: string): string | null {
    if (this.config.verbose) {
      console.log(`   🔍 Finding actual file for: ${basePath}`);
    }

    // 확장자가 있는 파일
    if (fs.existsSync(basePath) && fs.statSync(basePath).isFile()) {
      if (this.config.verbose) {
        console.log(`   ✅ Found exact file: ${basePath}`);
      }
      return basePath;
    }

    // 확장자 추가
    const extensions = ['.ts', '.tsx', '.js', '.jsx', '.css'];
    for (const ext of extensions) {
      const withExt = basePath + ext;
      if (fs.existsSync(withExt)) {
        if (this.config.verbose) {
          console.log(`   ✅ Found with extension: ${withExt}`);
        }
        return withExt;
      }
    }

    // index 파일
    try {
      if (fs.existsSync(basePath) && fs.statSync(basePath).isDirectory()) {
        if (this.config.verbose) {
          console.log(`   📁 ${basePath} is a directory, looking for index files...`);
        }
        for (const ext of extensions) {
          const indexPath = path.join(basePath, `index${ext}`);
          if (fs.existsSync(indexPath)) {
            if (this.config.verbose) {
              console.log(`   ✅ Found index file: ${indexPath}`);
            }
            return indexPath;
          }
        }
      }
    } catch (error) {
      if (this.config.verbose) {
        console.log(`   ❌ Error checking directory: ${error}`);
      }
    }

    if (this.config.verbose) {
      console.log(`   ❌ No file found for: ${basePath}`);
    }
    return null;
  }

  /**
   * DFS로 사용된 파일들 수집
   */
  private markFileAsUsed(filePath: string): void {
    if (this.visitedFiles.has(filePath)) return;
    this.visitedFiles.add(filePath);
    this.usedFiles.add(filePath);

    if (this.config.verbose) {
      console.log(`✅ Marking as used: ${filePath}`);
    }

    // 이 파일이 임포트하는 모든 파일들도 사용됨으로 표시
    const importedFiles = this.getImportedFiles(filePath);
    for (const importedFile of importedFiles) {
      this.markFileAsUsed(importedFile);
    }

    // index 파일이거나 re-export하는 파일인 경우, export하는 파일들도 사용됨으로 표시
    if (this.isIndexFile(filePath) || this.hasExports(filePath)) {
      this.markExportedFilesAsUsed(filePath);
    }
  }

  /**
   * index 파일인지 확인
   */
  private isIndexFile(filePath: string): boolean {
    const fileName = path.basename(filePath);
    return fileName === 'index.ts' || fileName === 'index.tsx';
  }

  /**
   * 파일이 export를 가지고 있는지 확인
   */
  private hasExports(filePath: string): boolean {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      // export ... from 패턴이 있는지 확인
      const exportFromPattern = /export\s*.*\s*from\s*['"`]/;
      return exportFromPattern.test(content);
    } catch (error) {
      return false;
    }
  }

  /**
   * index 파일에서 export하는 파일들을 사용됨으로 표시
   */
  private markExportedFilesAsUsed(indexFile: string): void {
    try {
      const content = fs.readFileSync(indexFile, 'utf-8');

      if (this.config.verbose) {
        console.log(`🔍 Checking exports in index file: ${indexFile}`);
        console.log(`   Content: ${content.trim()}`);
      }

      // export 패턴 찾기
      const exportPatterns = [
        /export\s*\{\s*[^}]*\s*\}\s*from\s*['"`]([^'"`]+)['"`]/g,
        /export\s*\*\s*from\s*['"`]([^'"`]+)['"`]/g,
      ];

      for (const pattern of exportPatterns) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          if (this.config.verbose) {
            console.log(`   🎯 Found export: ${match[1]}`);
          }

          const exportPath = this.resolveImportPath(match[1], indexFile);
          if (exportPath) {
            const relativePath = path.relative(process.cwd(), exportPath);
            if (this.allFiles.includes(relativePath)) {
              if (this.config.verbose) {
                console.log(`   ✅ Marking exported file as used: ${relativePath}`);
              }
              this.markFileAsUsed(relativePath);
            } else {
              if (this.config.verbose) {
                console.log(`   ❌ Exported file not in allFiles: ${relativePath}`);
              }
            }
          }
        }
      }
    } catch (error) {
      if (this.config.verbose) {
        console.log(`   ❌ Error reading index file: ${error}`);
      }
    }
  }

  /**
   * 분석 실행
   */
  public async analyze(): Promise<void> {
    console.log('🧹 Starting simple unused file analysis...\n');

    await this.collectAllFiles();
    const entryPoints = this.getEntryPoints();

    console.log('🔍 Marking used files...');

    // 모든 진입점에서 시작하여 사용된 파일들 수집
    for (const entryPoint of entryPoints) {
      this.markFileAsUsed(entryPoint);
    }

    // 결과 분석
    const unusedFiles = this.allFiles.filter((file) => !this.usedFiles.has(file));
    const usedCount = this.usedFiles.size;
    const unusedCount = unusedFiles.length;

    console.log('\n📊 Analysis Results:');
    console.log(`✅ Used files: ${usedCount}`);
    console.log(`🗑️  Unused files: ${unusedCount}`);

    if (this.config.outputJson) {
      const output = {
        timestamp: new Date().toISOString(),
        summary: {
          totalFiles: this.allFiles.length,
          usedFiles: usedCount,
          unusedFiles: unusedCount,
        },
        unusedFiles: unusedFiles.map((f) => ({
          path: f,
          reason: 'Not referenced from entry points',
        })),
      };

      fs.writeFileSync('unused-files-analysis-v2.json', JSON.stringify(output, null, 2));
      console.log('\n💾 Analysis saved to unused-files-analysis-v2.json');
      return;
    }

    if (unusedCount === 0) {
      console.log('\n🎉 No unused files found! Your project is clean.');
      return;
    }

    // 정말 안전한 파일들과 검토가 필요한 파일들로 분류
    const safeToDelete: string[] = [];
    const needsReview: string[] = [];

    for (const file of unusedFiles) {
      if (this.isSafeToDelete(file)) {
        safeToDelete.push(file);
      } else {
        needsReview.push(file);
      }
    }

    if (safeToDelete.length > 0) {
      console.log('\n🗑️  Files safe to delete:');
      safeToDelete.forEach((file) => console.log(`   - ${file}`));
    }

    if (needsReview.length > 0) {
      console.log('\n⚠️  Files that need manual review:');
      needsReview.forEach((file) => console.log(`   - ${file}`));
    }

    if (this.config.deleteFiles && safeToDelete.length > 0) {
      console.log('\n🗂️  Deleting safe files...');
      for (const file of safeToDelete) {
        try {
          fs.unlinkSync(file);
          console.log(`   ✅ Deleted: ${file}`);
        } catch (error) {
          console.error(`   ❌ Failed to delete ${file}:`, error);
        }
      }
    } else if (!this.config.deleteFiles && safeToDelete.length > 0) {
      console.log('\n💡 To delete safe files, run: pnpm run clean-unused');
    }
  }

  /**
   * 파일이 안전하게 삭제 가능한지 확인
   */
  private isSafeToDelete(filePath: string): boolean {
    const fileName = path.basename(filePath);

    // 절대 삭제하면 안 되는 디렉토리들
    const protectedDirs = ['scripts/', 'prisma/', '.git/', 'node_modules/', '.next/', 'public/'];

    // 보호된 디렉토리에 있는 파일들은 삭제 대상에서 제외
    if (protectedDirs.some((dir) => filePath.startsWith(dir))) {
      return false;
    }

    // 절대 삭제하면 안 되는 파일들
    const criticalPatterns = [
      /\.config\.(ts|js|mjs)$/,
      /\.d\.ts$/,
      /\.(test|spec)\.(ts|tsx|js|jsx)$/,
      /\.stories\.(ts|tsx|js|jsx)$/,
      /^middleware\.(ts|js)$/,
      /^layout\.(ts|tsx|js|jsx)$/,
      /^page\.(ts|tsx|js|jsx)$/,
      /^route\.(ts|js)$/,
      /^package\.json$/,
      /^tsconfig\.json$/,
      /^README\.md$/,
      /^\.env/,
    ];

    if (criticalPatterns.some((pattern) => pattern.test(fileName))) {
      return false;
    }

    return true;
  }
}

/**
 * CLI 인터페이스
 */
async function main() {
  const args = process.argv.slice(2);

  const config: AnalysisConfig = {
    deleteFiles: args.includes('--delete'),
    outputJson: args.includes('--json'),
    verbose: args.includes('--verbose') || args.includes('-v'),
  };

  try {
    const detector = new SimpleUnusedFileDetector(config);
    await detector.analyze();
  } catch (error) {
    console.error('❌ Error during analysis:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { SimpleUnusedFileDetector };
