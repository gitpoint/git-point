import I18n from 'react-native-i18n';
import { common } from 'config';
import translations from './languages';

I18n.fallbacks = true;
I18n.defaultLocale = common.defaultLocale;
I18n.missingTranslation = scope => scope;
I18n.translations = translations;
I18n.defaultSeparator = 'GITPOINT-DISABLED';

export default I18n;
