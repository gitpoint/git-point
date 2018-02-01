import { common } from 'config';
import keysDiff from 'keys-diff';
import * as languages from 'locale/languages';

const baseLanguage = common.defaultLocale;
const baseTranslation = languages[baseLanguage];

describe('Locales', () => {
  Object.keys(languages).forEach(key => {
    if (key === baseLanguage) return;
    it(`${key} should contain same keys as ${baseLanguage}`, () => {
      expect(keysDiff(baseTranslation, languages[key])).toEqual([[], []]);
    });
  });
});
