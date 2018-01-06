import I18n from 'react-native-i18n';
import { common } from 'config';
import {
  en,
  fr,
  nl,
  pt,
  ptBR,
  tr,
  ru,
  eo,
  gl,
  pl,
  de,
  es,
  zhCN,
  zhTW,
  uk,
  eu,
} from './languages';

I18n.fallbacks = true;
I18n.defaultLocale = common.defaultLocale;

I18n.translations = {
  en,
  fr,
  nl,
  tr,
  pt,
  'pt-br': ptBR,
  ru,
  es,
  eo,
  gl,
  pl,
  de,
  'zh-cn': zhCN,
  'zh-tw': zhTW,
  uk,
  eu,
};

export default I18n;
