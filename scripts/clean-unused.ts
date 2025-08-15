#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

/**
 * 스마트한 미사용 파일 정리 스크립트
 * next-unused의 결과를 기반으로 하되, 실제 사용 여부를 더 정확히 판단합니다.
 */

interface UnusedFile {
  path: string;
  reason: string;
  canDelete: boolean;
}

async function findActualUnusedFiles(): Promise<UnusedFile[]> {
  const results: UnusedFile[] = [];

  // next-unused 결과 파싱
  const unusedFilesContent = fs.readFileSync('unused-files.json', 'utf-8');
  const unusedFiles = unusedFilesContent
    .split('\n')
    .slice(1) // "Found X unused files:" 라인 제거
    .filter((line) => line.trim())
    .map((line) => line.trim());

  console.log(`🔍 Analyzing ${unusedFiles.length} potentially unused files...`);

  for (const filePath of unusedFiles) {
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const analysis = await analyzeFile(filePath);
    results.push(analysis);
  }

  return results;
}

async function analyzeFile(filePath: string): Promise<UnusedFile> {
  const fileName = path.basename(filePath);
  const dirName = path.dirname(filePath);

  // 항상 유지해야 하는 파일들
  const criticalFiles = [
    'middleware.ts',
    'layout.tsx',
    'page.tsx',
    'route.ts',
    'index.ts',
    'index.tsx',
  ];

  if (criticalFiles.includes(fileName)) {
    return {
      path: filePath,
      reason: 'Critical file (middleware, layout, page, route, or index)',
      canDelete: false,
    };
  }

  // 현재 사용되고 있는지 전체 프로젝트에서 검색
  const isUsed = await searchFileUsage(filePath);

  if (isUsed) {
    return {
      path: filePath,
      reason: 'File is actually being used',
      canDelete: false,
    };
  }

  // 설정 파일이나 특수 파일들
  if (fileName.includes('config') || fileName.includes('.d.ts')) {
    return {
      path: filePath,
      reason: 'Configuration or declaration file',
      canDelete: false,
    };
  }

  // 실제로 사용되지 않는 파일
  return {
    path: filePath,
    reason: 'Actually unused',
    canDelete: true,
  };
}

async function searchFileUsage(filePath: string): Promise<boolean> {
  const fileName = path.basename(filePath, path.extname(filePath));
  const relativePath = filePath.replace(/\.(ts|tsx)$/, '');

  // 검색할 패턴들
  const searchPatterns = [
    fileName, // 파일명
    relativePath, // 상대 경로
    `'${relativePath}'`, // 문자열로 임포트
    `"${relativePath}"`, // 문자열로 임포트
    `from '${relativePath}'`,
    `from "${relativePath}"`,
    `import('${relativePath}')`, // 동적 임포트
    `import("${relativePath}")`, // 동적 임포트
  ];

  // 프로젝트 내 모든 TypeScript/JavaScript 파일 검색
  const allFiles = await glob('**/*.{ts,tsx,js,jsx}', {
    ignore: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      filePath, // 자기 자신 제외
    ],
  });

  for (const file of allFiles) {
    try {
      const content = fs.readFileSync(file, 'utf-8');

      for (const pattern of searchPatterns) {
        if (content.includes(pattern)) {
          return true;
        }
      }
    } catch (error) {
      // 파일 읽기 실패 시 무시
      continue;
    }
  }

  return false;
}

async function main() {
  console.log('🧹 Starting smart unused file cleanup...\n');

  try {
    const analysis = await findActualUnusedFiles();

    const canDelete = analysis.filter((item) => item.canDelete);
    const cannotDelete = analysis.filter((item) => !item.canDelete);

    console.log('📊 Analysis Results:');
    console.log(`✅ Files to keep: ${cannotDelete.length}`);
    console.log(`🗑️  Files that can be deleted: ${canDelete.length}\n`);

    if (canDelete.length > 0) {
      console.log('🗑️  Files that can be safely deleted:');
      canDelete.forEach((item) => {
        console.log(`   - ${item.path} (${item.reason})`);
      });

      console.log('\n⚠️  Files to keep (false positives):');
      cannotDelete.forEach((item) => {
        console.log(`   - ${item.path} (${item.reason})`);
      });

      console.log('\n🔧 To delete unused files, run:');
      console.log('   pnpm run clean-unused:delete');
    } else {
      console.log('🎉 No unused files found! Your project is clean.');
    }
  } catch (error) {
    console.error('❌ Error during analysis:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
