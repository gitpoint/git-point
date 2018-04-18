import I18n from 'react-native-i18n';
import { common } from 'config';
import translations from './languages';

I18n.fallbacks = true;
I18n.defaultLocale = common.defaultLocale;

I18n.translations = translations;

export default I18n;
