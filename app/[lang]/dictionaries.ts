import 'server-only';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ko: () => import('./dictionaries/ko.json').then((module) => module.default),
  th: () => import('./dictionaries/th.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => dictionaries[locale]();
