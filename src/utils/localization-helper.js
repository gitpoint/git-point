import { AsyncStorage } from 'react-native';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';

import { common } from 'config';
import I18n from 'locale';

export const translate = (key, locale, interpolation = null) =>
  I18n.t(key, { locale, ...interpolation });

export const getLocale = () => {
  // If for some reason a locale cannot be determined, fall back to defaultLocale.
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
};

export async function saveLocale(locale) {
  await AsyncStorage.setItem('locale', locale);

  return true;
}

/** Wrapper for date-fns' distanceInWordsStrict applaying current locale. */
export function relativeTimeToNow(date) {
  const locale = getLocale();
  // Custom locale config to get our own translations for relative time and
  // avoid date-fns translations.
  // Overrides date-fns `formatDistance` function.
  // https://github.com/date-fns/date-fns/blob/master/src/locale/en-US/_lib/formatDistance/index.js
  const localeConfig = {
    distanceInWords: {
      localize: (token, count) => {
        const translationKey = `common.relativeTime.${token}.${count === 1
          ? 'one'
          : 'other'}`;

        return translate(translationKey, locale, { count });
      },
    },
  };

  return distanceInWordsStrict(new Date(), date, { locale: localeConfig });
}
