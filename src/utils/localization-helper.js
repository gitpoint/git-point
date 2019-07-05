import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import distanceInWords from 'date-fns/distance_in_words';

import { common } from 'config';
import I18n from 'locale';

export const t = (message, locale, interpolation = null) => {
  let translation = I18n.t(message, locale, interpolation);

  if (translation === '') {
    translation = message;
  }

  const componentPlaceholdersReg = /({([^}]+)})/g;

  const retval = [];

  let ongoing = '';
  let lastIndex = 0;
  let key = 0;

  translation.replace(
    componentPlaceholdersReg,
    (match, placeholder, name, index) => {
      key += 1;
      ongoing += translation.substring(lastIndex, index);
      const value = interpolation[name];
      const type = typeof value;

      if (type === 'undefined') {
        ongoing += '[unknown placeholder]';
      } else if (type === 'object') {
        retval.push(ongoing);
        retval.push(React.cloneElement(value, { key }));
        ongoing = '';
      } else if (type === 'string' || type === 'number') {
        ongoing += value;
      }
      lastIndex = index + match.length;
    }
  );

  if (lastIndex < translation.length) {
    ongoing += translation.substring(lastIndex);
  }

  if (ongoing.length) {
    retval.push(ongoing);
  }

  if (retval.length === 1) {
    return retval[0];
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
      localize: (token, count) => {
        switch (token) {
          case 'lessThanXSeconds':
            return t('{lessThanXSeconds}s', locale, {
              lessThanXSeconds: count,
            });
          case 'xSeconds':
            return t('{xSeconds}s', locale, { xSeconds: count });
          case 'halfAMinute':
            return t('{halfAMinute}s', locale, { halfAMinute: count });
          case 'lessThanXMinutes':
            return t('{lessThanXMinutes}m', locale, {
              lessThanXMinutes: count,
            });
          case 'xMinutes':
            return t('{xMinutes}m', locale, { xMinutes: count });
          case 'aboutXHours':
            return t('{aboutXHours}h', locale, { aboutXHours: count });
          case 'xHours':
            return t('{xHours}h', locale, { xHours: count });
          case 'xDays':
            return t('{xDays}d', locale, { xDays: count });
          case 'aboutXMonths':
            return t('{aboutXMonths}mo', locale, { aboutXMonths: count });
          case 'xMonths':
            return t('{xMonths}mo', locale, { xMonths: count });
          case 'aboutXYears':
            return t('{aboutXYears}y', locale, { aboutXYears: count });
          case 'xYears':
            return t('{xYears}y', locale, { xYears: count });
          case 'overXYears':
            return t('{overXYears}y', locale, { overXYears: count });
          case 'almostXYears':
            return t('{almostXYears}y', locale, { almostXYears: count });
          default:
            return '?';
        }
      },
    },
  };

  return distanceInWords(date, new Date(), { locale: localeConfig });
}
