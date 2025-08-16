import 'server-only';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default as Dictionary),
  ko: () => import('./dictionaries/ko.json').then((module) => module.default as Dictionary),
  th: () => import('./dictionaries/th.json').then((module) => module.default as Dictionary),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => dictionaries[locale]();
