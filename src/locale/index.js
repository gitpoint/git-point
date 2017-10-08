import { AsyncStorage } from 'react-native';
import I18n from 'react-native-i18n';
import { en, fr, nl, pt, ptBr, tr, ru, gl } from './languages';

I18n.fallbacks = true;

I18n.translations = {
  en,
  fr,
  nl,
  tr,
  pt,
  'pt-br': ptBr,
  ru,
  gl,
};

export default I18n;

export async function saveLanguage(language) {
  await AsyncStorage.setItem('language', language);

  return true;
}

export const getLanguage = () => I18n.locale.substr(0, 2);

export async function determineLanguage() {
  const deviceLanguage = getLanguage();
  const language = await AsyncStorage.getItem(
    'language'
  ).then(settingLanguage => {
    return settingLanguage || deviceLanguage;
  });

  return language;
}
