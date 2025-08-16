/**
 * Dictionary 타입 정의 - JSON 파일에서 자동으로 타입을 추론
 *
 * 사용법:
 * 1. JSON 파일을 수정하면 자동으로 타입이 업데이트됩니다
 * 2. 타입 안전성을 위해 모든 언어 파일이 같은 구조를 가져야 합니다
 */

import enDict from 'app/[lang]/dictionaries/en.json';

// en.json을 기준으로 타입을 자동 추론
export type Dictionary = typeof enDict;

// 타입 검증용 - 모든 언어 파일이 같은 구조인지 확인
export type DictionaryValidator<T> = T extends Dictionary ? T : never;
