import { AsyncStorage } from 'react-native';
import moment from 'moment/min/moment-with-locales.min';

import { common } from 'config';
import I18n from 'locale';

export const translate = (key, locale, interpolation = null) =>
  I18n.t(key, { locale, ...interpolation });

export const getLocale = () => {
  // If for some reason a locale cannot be determined, fall back to
  // defaultLocale.
  const locale =
    (I18n.locale && I18n.locale.toLowerCase()) || common.defaultLocale;
  const specialLocales = {
    'zh-hans': 'zh-cn',
    'zh-hans-cn': 'zh-cn',
    'zh-hans-sg': 'zh-cn',
    'zh-hans-hk': 'zh-hk',
    'zh-hant': 'zh-tw',
    'zh-hant-tw': 'zh-tw',
    'zh-hant-hk': 'zh-tw',
  };

  return specialLocales[locale] || locale;
};

export async function getCurrentLocale() {
  const deviceLocale = getLocale();
  const locale = await AsyncStorage.getItem('locale').then(settingLocale => {
    return settingLocale || deviceLocale;
  });

  return locale;
}

export const configureLocale = locale => {
  I18n.locale = locale;

  const checkLocales = [locale, locale.substr(0, 2)];
  const localeForMoment =
    moment
      .locales()
      .filter(momentLocale => checkLocales.includes(momentLocale))[0] ||
    common.defaultLocale;

  moment.updateLocale(localeForMoment, {
    relativeTime: translate('common.relativeTime', locale),
  });
};

export async function saveLocale(locale) {
  await AsyncStorage.setItem('locale', locale);

  return true;
}
