import { dumpKeysRecursively } from 'recursive-keys';
import { common } from 'config';
import languages from 'locale/languages';

const baseLanguage = common.defaultLocale;

describe('Locales', () => {
  const baseKeys = dumpKeysRecursively(languages[baseLanguage]).sort();

  Object.keys(languages).forEach(key => {
    if (key === baseLanguage) return;
    it(`${key} should contain same keys as ${baseLanguage}`, () => {
      expect(dumpKeysRecursively(languages[key]).sort()).toEqual(
        expect.arrayContaining(baseKeys)
      );
    });
  });
});
