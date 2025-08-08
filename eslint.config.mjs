import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

// __dirname 및 __filename 준비
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat 사용(Next 공식 및 커뮤니티 추천)
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // 최신 Next.js, TypeScript, Core Web Vitals, 접근성(A11y), Prettier 권장 설정 통합
  ...compat.config({
    extends: [
      'next',
      'next/core-web-vitals',
      'next/typescript',
      'plugin:prettier/recommended',
      'plugin:jsx-a11y/recommended',
    ],
    plugins: ['prettier', 'jsx-a11y'],
    rules: {
      // Prettier와 충돌 방지 및 형식 경고 활성화(필요시 'error'로 격상)
      'prettier/prettier': 'warn',
      // JSX 접근성 추가 권장 규칙(옵션)
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
      // 필요에 따라 본인 코드 스타일에 맞춘 추가/변경 가능
    },
  }),
  // Prettier와의 완벽한 연동을 위해 추가
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          semi: true,
          tabWidth: 2,
          trailingComma: 'all',
          printWidth: 100,
          arrowParens: 'always',
          bracketSpacing: true,
          jsxSingleQuote: true,
          proseWrap: 'always',
          endOfLine: 'lf',
        },
        { usePrettierrc: false },
      ],
    },
  },
  ...prettierConfig,
];
