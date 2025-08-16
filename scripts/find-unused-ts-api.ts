#!/usr/bin/env tsx

import * as ts from 'typescript';
import * as path from 'path';

/**
 * TypeScript Compiler API를 사용한 정확한 미사용 파일 감지
 *
 * 핵심 아이디어:
 * 1. TypeScript 컴파일러가 직접 파일 의존성을 분석
 * 2. 정확한 module resolution (path mapping, node_modules 등)
 * 3. 타입 정보까지 고려한 완전한 의존성 그래프
 */

class TypeScriptBasedUnusedDetector {
  private program!: ts.Program;
  private checker!: ts.TypeChecker;
  private sourceFiles: Map<string, ts.SourceFile> = new Map();
  private referencedFiles: Set<string> = new Set();

  constructor(private configPath: string = 'tsconfig.json') {
    this.initializeProgram();
  }

  /**
   * TypeScript 컴파일러 프로그램 초기화
   */
  private initializeProgram(): void {
    console.log('🔧 Initializing TypeScript compiler...');

    // tsconfig.json 읽기
    const configFile = ts.readConfigFile(this.configPath, ts.sys.readFile);
    if (configFile.error) {
      throw new Error(`Error reading tsconfig.json: ${configFile.error.messageText}`);
    }

    // 컴파일러 옵션 파싱
    const { options, fileNames, errors } = ts.parseJsonConfigFileContent(
      configFile.config,
      ts.sys,
      path.dirname(this.configPath),
    );

    if (errors.length > 0) {
      console.warn(
        '⚠️  TypeScript config warnings:',
        errors.map((e) => e.messageText),
      );
    }

    // 프로그램 생성
    this.program = ts.createProgram({
      rootNames: fileNames,
      options: {
        ...options,
        // 더 정확한 분석을 위한 옵션들
        allowJs: true,
        skipLibCheck: true,
        noEmit: true,
      },
    });

    this.checker = this.program.getTypeChecker();

    // 모든 소스 파일 인덱싱
    for (const sourceFile of this.program.getSourceFiles()) {
      if (!sourceFile.isDeclarationFile && !sourceFile.fileName.includes('node_modules')) {
        const relativePath = path.relative(process.cwd(), sourceFile.fileName);
        // .next 폴더의 자동 생성 파일들은 제외
        if (!relativePath.startsWith('.next/')) {
          this.sourceFiles.set(relativePath, sourceFile);
        }
      }
    }

    console.log(`📁 Found ${this.sourceFiles.size} TypeScript/JavaScript files`);
  }

  /**
   * 미사용 파일 분석 실행
   */
  public analyze(): void {
    console.log('🔍 Analyzing file dependencies with TypeScript compiler...\n');

    // 1. 진입점 파일들 찾기
    const entryPoints = this.findEntryPoints();
    console.log(`📍 Entry points (${entryPoints.length}):`, entryPoints.slice(0, 5));
    if (entryPoints.length > 5) console.log(`    ... and ${entryPoints.length - 5} more`);

    // 2. 각 진입점에서 시작하여 의존성 추적
    for (const entryPoint of entryPoints) {
      this.traceReferences(entryPoint);
    }

    // 3. 결과 분석
    this.analyzeResults();
  }

  /**
   * Next.js 진입점들 찾기
   */
  private findEntryPoints(): string[] {
    const entryPoints: string[] = [];

    for (const [relativePath] of this.sourceFiles) {
      const fileName = path.basename(relativePath);

      // Next.js App Router 특수 파일들
      const isNextJsRoute =
        relativePath.startsWith('app/') &&
        [
          'layout.tsx',
          'layout.ts',
          'layout.js',
          'page.tsx',
          'page.ts',
          'page.js',
          'route.ts',
          'route.js',
          'loading.tsx',
          'loading.ts',
          'loading.js',
          'error.tsx',
          'error.ts',
          'error.js',
          'not-found.tsx',
          'not-found.ts',
          'not-found.js',
          'globals.css',
        ].includes(fileName);

      // 미들웨어
      const isMiddleware = relativePath === 'middleware.ts';

      // 설정 파일들
      const isConfig = [
        'next.config.ts',
        'next.config.js',
        'tailwind.config.ts',
        'tailwind.config.js',
        'eslint.config.mjs',
      ].includes(relativePath);

      if (isNextJsRoute || isMiddleware || isConfig) {
        entryPoints.push(relativePath);
      }
    }

    return entryPoints;
  }

  /**
   * 특정 파일에서 시작하여 참조된 모든 파일들 추적
   */
  private traceReferences(filePath: string): void {
    if (this.referencedFiles.has(filePath)) {
      return; // 이미 방문함
    }

    const sourceFile = this.sourceFiles.get(filePath);
    if (!sourceFile) {
      return; // 파일을 찾을 수 없음
    }

    this.referencedFiles.add(filePath);

    // 1. import/export 문에서 직접 참조되는 파일들
    const referencedFiles = this.getReferencedFiles(sourceFile);
    for (const referenced of referencedFiles) {
      this.traceReferences(referenced);
    }

    // 2. 타입 참조도 추적 (TypeScript의 강점!)
    const typeReferences = this.getTypeReferences(sourceFile);
    for (const typeRef of typeReferences) {
      this.traceReferences(typeRef);
    }
  }

  /**
   * 소스 파일에서 직접 참조되는 파일들 추출
   */
  private getReferencedFiles(sourceFile: ts.SourceFile): string[] {
    const referencedFiles: string[] = [];

    // import/export 문 방문
    ts.forEachChild(sourceFile, (node) => {
      this.visitNode(node, sourceFile, referencedFiles);
    });

    return referencedFiles;
  }

  /**
   * AST 노드를 재귀적으로 방문하여 import/export 문 찾기
   */
  private visitNode(node: ts.Node, sourceFile: ts.SourceFile, referencedFiles: string[]): void {
    // import 문
    if (ts.isImportDeclaration(node) && node.moduleSpecifier) {
      const moduleName = (node.moduleSpecifier as ts.StringLiteral).text;
      const resolved = this.resolveModule(moduleName, sourceFile.fileName);
      if (resolved) {
        referencedFiles.push(resolved);
      }
    }

    // export from 문
    if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
      const moduleName = (node.moduleSpecifier as ts.StringLiteral).text;
      const resolved = this.resolveModule(moduleName, sourceFile.fileName);
      if (resolved) {
        referencedFiles.push(resolved);
      }
    }

    // dynamic import()
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments.length > 0
    ) {
      const arg = node.arguments[0];
      if (ts.isStringLiteral(arg)) {
        const resolved = this.resolveModule(arg.text, sourceFile.fileName);
        if (resolved) {
          referencedFiles.push(resolved);
        }
      }
    }

    // 재귀적으로 자식 노드들 방문
    ts.forEachChild(node, (child) => {
      this.visitNode(child, sourceFile, referencedFiles);
    });
  }

  /**
   * 타입 참조 추적 (TypeScript Compiler API의 핵심 기능!)
   */
  private getTypeReferences(sourceFile: ts.SourceFile): string[] {
    const typeReferences: string[] = [];

    // 모든 식별자에 대해 타입 정보 확인
    ts.forEachChild(sourceFile, (node) => {
      this.visitNodeForTypes(node, sourceFile, typeReferences);
    });

    return typeReferences;
  }

  private visitNodeForTypes(
    node: ts.Node,
    sourceFile: ts.SourceFile,
    typeReferences: string[],
  ): void {
    // 타입 참조 (type imports, interface extends 등)
    if (ts.isTypeReferenceNode(node)) {
      const symbol = this.checker.getSymbolAtLocation(node.typeName);
      if (symbol?.declarations) {
        for (const declaration of symbol.declarations) {
          const declarationFile = declaration.getSourceFile();
          if (declarationFile !== sourceFile) {
            const relativePath = path.relative(process.cwd(), declarationFile.fileName);
            if (this.sourceFiles.has(relativePath)) {
              typeReferences.push(relativePath);
            }
          }
        }
      }
    }

    ts.forEachChild(node, (child) => {
      this.visitNodeForTypes(child, sourceFile, typeReferences);
    });
  }

  /**
   * 모듈 경로를 실제 파일 경로로 해석
   * TypeScript의 module resolution 사용!
   */
  private resolveModule(moduleName: string, containingFile: string): string | null {
    const resolved = ts.resolveModuleName(
      moduleName,
      containingFile,
      this.program.getCompilerOptions(),
      ts.sys,
    );

    if (resolved.resolvedModule) {
      const resolvedPath = resolved.resolvedModule.resolvedFileName;
      const relativePath = path.relative(process.cwd(), resolvedPath);

      // 우리 프로젝트 파일인지 확인
      if (this.sourceFiles.has(relativePath)) {
        return relativePath;
      }
    }

    return null;
  }

  /**
   * 분석 결과 출력
   */
  private analyzeResults(): void {
    const allFiles = Array.from(this.sourceFiles.keys());
    const unusedFiles = allFiles.filter((file) => !this.referencedFiles.has(file));

    console.log('\n📊 TypeScript Compiler API Analysis Results:');
    console.log(`✅ Referenced files: ${this.referencedFiles.size}`);
    console.log(`🗑️  Unused files: ${unusedFiles.length}`);

    if (unusedFiles.length === 0) {
      console.log('\n🎉 No unused files found! Your project is clean.');
      return;
    }

    // 안전하게 삭제 가능한 파일들과 검토가 필요한 파일들 분류
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

    // 상세 정보
    console.log(`\n💡 Analysis completed using TypeScript ${ts.version}`);
    console.log('   This method is much more accurate than regex-based parsing!');
  }

  /**
   * 파일이 안전하게 삭제 가능한지 확인
   */
  private isSafeToDelete(filePath: string): boolean {
    const protectedPatterns = [
      /^scripts\//,
      /^prisma\//,
      /\.config\.(ts|js|mjs)$/,
      /\.d\.ts$/,
      /\.(test|spec)\.(ts|tsx|js|jsx)$/,
      /package\.json$/,
      /tsconfig\.json$/,
    ];

    return !protectedPatterns.some((pattern) => pattern.test(filePath));
  }
}

/**
 * CLI 인터페이스
 */
async function main() {
  try {
    const detector = new TypeScriptBasedUnusedDetector();
    detector.analyze();
  } catch (error) {
    console.error('❌ Error during TypeScript analysis:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { TypeScriptBasedUnusedDetector };
