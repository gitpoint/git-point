import I18n from 'react-native-i18n';
import { common } from 'config';

I18n.fallbacks = true;
I18n.defaultLocale = common.defaultLocale;

export default I18n;
