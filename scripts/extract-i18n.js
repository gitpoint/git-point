/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
/* eslint-disable no-continue */

const chalk = require('chalk');
const glob = require('glob');
const fs = require('fs');
const babylon = require('babylon');

const i18nConfig = require('./../package.json').i18n;

const report = message => {
  console.log(message);
};

const extractFromSource = config => {
  const messages = {};

  config.sourcePath.forEach(source => {
    const files = glob.sync(`${source}/**/*.js`, { debug: false });

    files.forEach(file => {
      for (let i = 0; i < config.ignorePath.length; i++) {
        if (file.indexOf(config.ignorePath[i]) !== -1) {
          return;
        }
      }

      const contents = fs.readFileSync(file).toString();
      const tokens = babylon.parse(contents, {
        sourceType: 'module',
        plugins: ['jsx', 'classProperties', 'objectRestSpread', 'flow'],
      }).tokens;
      let counter = 0;

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token.type.label === 'name' && token.value === config.translator) {
          const parenthesis = tokens[i + 1];
          const message = tokens[i + 2];

          if (!parenthesis || parenthesis.type.label !== '(') {
            continue;
          }

          if (!message || message.type.label !== 'string') {
            continue;
          }

          if (messages[message.value] === '') {
            continue;
          }

          counter += 1;
          messages[message.value] = '';
        }
      }

      report(
        ` - parsing ${chalk.bold(file)} .. ${chalk.bold(
          counter
        )} strings found!`
      );
    });
  });

  return messages;
};

const generateFiles = (config, messages) => {
  report('Generating translations:');

  let exports = '/* eslint-disable quote-props */\nexport default {\n';

  config.languages.forEach(language => {
    const filepath = `${process.cwd()}/${config.messagePath}/${language}.js`;

    let oldMessages = {};

    try {
      oldMessages = require(filepath);
    } catch (e) {
      console.log(e);
    }

    const action =
      oldMessages && oldMessages.length === 0 ? 'generated' : 'merged';

    // Get a fresh copy of found strings
    const newMessages = { ...messages };

    if (language === config.sourceLanguage) {
      Object.keys(newMessages).forEach(key => {
        newMessages[key] = key;
      });
    }

    // Iterate on old strings
    Object.keys(oldMessages).forEach(key => {
      if (typeof newMessages[key] !== 'undefined') {
        // Translation needed & found: copy it
        if (oldMessages[key] !== '') {
          newMessages[key] = oldMessages[key];
        }
      } else if (typeof oldMessages[key] === 'object') {
        // old syntax, copy blindly
        newMessages[key] = oldMessages[key];
      } else {
        // Translation old & gone: surround it with @
        newMessages[key] = `@${oldMessages[key].replace(/^@+|@+$/g, '')}@`;
      }
    });

    const ordered = {};

    Object.keys(newMessages)
      .sort()
      .forEach(key => {
        ordered[key] = newMessages[key];
      });

    // Write the new message file
    fs.writeFile(
      filepath,
      `module.exports = ${JSON.stringify(ordered, null, 2)};`,
      'utf8',
      err => {
        if (err) throw err;
      }
    );
    report(` - ${action} ${chalk.bold(filepath)}`);
    exports += `  '${language}': require('./${language}'),\n`;
  });

  exports += '};\n';

  fs.writeFile(
    `${process.cwd()}/${config.messagePath}/index.js`,
    exports,
    'utf8',
    err => {
      if (err) throw err;
    }
  );
};

const extractMessages = config => {
  report(
    `Extracting messages in ${chalk.green(
      config.sourcePath
    )} using ${chalk.green(config.translator)}()`
  );

  const messages = extractFromSource(config);

  report('Done parsing\n');

  generateFiles(config, messages);
  report('Done, have fun translating!\n'); // Et voilà!

  return true;
};

extractMessages(i18nConfig);
