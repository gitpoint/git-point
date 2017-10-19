import I18n from 'react-native-i18n';
import { common } from 'config';
import { en, fr, nl, pt, ptBr, tr, ru, eo, gl, pl, de, es } from './languages';

I18n.fallbacks = true;
I18n.defaultLocale = common.defaultLocale;

I18n.translations = {
  en,
  fr,
  nl,
  tr,
  pt,
  'pt-br': ptBr,
  ru,
  es,
  eo,
  gl,
  pl,
  de,
};

export default I18n;
