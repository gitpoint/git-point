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

const baseLanguage = 'en';
const expectedObject = createExpectedObject(languages[baseLanguage]);

describe('Locales', () => {
  Object.keys(languages).forEach(key => {
    if (key === baseLanguage) return;

    it(`${baseLanguage} vs ${key}`, () => {
      expect(languages[key]).toMatchObject(expectedObject);
    });
  });
});
