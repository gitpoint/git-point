import 'react-native';
import 'react-native-mock';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

console.error = message => {
  if (
    message.indexOf('uppercase HTML') === -1 &&
    message.indexOf('spell it as lowercase') === -1 &&
    message.indexOf('cast the value') === -1
  ) {
    console.warn(message);
  }
};

jest.mock('react-native-i18n', () => {
  const i18njs = require('i18n-js');
  const en = require('./src/locale/languages/en');

  i18njs.translations = en;

  return {
    t: jest.fn((k, o) => i18njs.t(k, { locale: 'en' })),
  };
});

jest.mock('react-native-cookies', () => ({}));

jest.mock('react-native-code-push', () => ({}));

jest.mock('react-native-safari-view', () => ({}));
