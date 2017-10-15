import I18n from 'react-native-i18n';

import { common } from 'config';
import { en, fr, nl, pt, ptBr, tr, ru, gl, pl } from './languages';

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
  gl,
  pl,
};

export default I18n;
