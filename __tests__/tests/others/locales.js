import { common } from 'config';
import * as languages from 'locale/languages';

function createExpectedObject(object) {
  const ret = {};

  Object.keys(object).forEach(key => {
    ret[key] =
      typeof object[key] === 'object'
        ? createExpectedObject(object[key])
        : expect.stringMatching(/./);
  });

  return ret;
}

const baseLanguage = common.defaultLocale;
const expectedObject = createExpectedObject(languages[baseLanguage]);

describe('Locales', () => {
  Object.keys(languages).forEach(key => {
    if (key === baseLanguage) return;

    it(`${key} should contain same keys as ${baseLanguage}`, () => {
      expect(languages[key]).toMatchObject(expectedObject);
    });
  });
});
