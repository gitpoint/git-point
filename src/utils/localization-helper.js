import { AsyncStorage } from 'react-native';
import distanceInWords from 'date-fns/distance_in_words';

import { common } from 'config';
import I18n from 'locale';

export const translate = (key, locale, interpolation = null) =>
  I18n.t(key, { locale, ...interpolation });

export const t = (key, locale, interpolation = null) => {
  let translation = translate(key, locale, interpolation);

  if (translation === '') {
    translation = key;
  }

  const componentPlaceholdersReg = /({([^}]+)})/g;

  const retval = [];

  let ongoing = '';
  let match = false;
  let lastIndex = 0;

  /* eslint-disable no-cond-assign */
  while ((match = componentPlaceholdersReg.exec(translation))) {
    ongoing += translation.substring(lastIndex, match.index);
    if (typeof interpolation[match[2]] === 'undefined') {
      ongoing += this.config.missingPlaceholder;
    } else if (typeof interpolation[match[2]] === 'object') {
      retval.push(ongoing);
      retval.push(interpolation[match[2]]);
      ongoing = '';
    } else if (typeof interpolation[match[2]] === 'string') {
      ongoing += interpolation[match[2]];
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < translation.length) {
    ongoing += translation.substring(lastIndex);
  }

  if (ongoing.length) {
    retval.push(ongoing);
  }

  return retval;
};

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
  // Overrides date-fns `distanceInWords` function.
  // https://github.com/date-fns/date-fns/blob/v1.29.0/src/locale/en/build_distance_in_words_locale/index.js
  const localeConfig = {
    distanceInWords: {
      localize: (token, count) =>
        translate(`common.relativeTime.${token}`, locale, { count }),
    },
  };

  return distanceInWords(date, new Date(), { locale: localeConfig });
}
