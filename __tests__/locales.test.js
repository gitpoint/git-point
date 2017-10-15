const fs = require('fs');
const path = require('path');
const localeDir = './src/locale/languages';

/**
 * Compare fields between two parameters
 *
 * @param  {object|string} a - left parameter
 * @param  {object|string} b - right parameter
 * @param  {string} keypath - key path for tracking errors
 * @return {array} error message array
 */
function compareFields(a, b, keypath = '') {
  if (!a) return [`${keypath}: lacks in the left`];
  if (!b) return [`${keypath}: lacks in the right`];
  if (typeof a === 'string' && typeof b === 'string') return [];

  const ka = Object.keys(a);
  const kb = Object.keys(b);

  if (ka.length !== kb.length) return [`${keypath}: different keys count, left=${ka.length}, right=${kb.length}`];

  return ka.reduce((arr, key) => {
    const ret = compareFields(a[key], b[key], keypath ? `${keypath}.${key}` : key);

    return arr.concat(ret);
  }, []);
}

function getLocaleConfig(file) {
  // because Node.js doesn't support export/import
  const content = fs.readFileSync(file, {
    encoding: 'utf-8',
  }).replace(/export const \w+ =/, 'return');
  const fn = new Function(content);

  return fn();
}

function getLocales() {
  const files = fs.readdirSync(localeDir);

  return files.filter(name => name !== 'index.js')
      .map(name => {
        return {
          name: name.replace(/\.js$/, ''),
          locale: getLocaleConfig(path.resolve(localeDir, name)),
        };
      });
}

const locales = getLocales();
const base = locales.find(item => item.name === 'en');
let isOK = true;

locales.forEach(item => {
  if (item.name === base.name) return;

  console.log(`comparing ${base.name} with ${item.name}...`);
  const msgs = compareFields(base.locale, item.locale);

  if (msgs.length) {
    isOK = false;
    msgs.forEach(msg => console.log(`    ${msg}`));
  } else {
    console.log('...ok');
  }
});

if (!isOK) {
  console.error('...locales are not good.');
  process.exit(1);
} else {
  console.log('...locales are good!');
}
