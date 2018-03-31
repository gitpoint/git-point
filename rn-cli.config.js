// Inspired by react-native/local-cli/core/index.js

const android = require('react-native/local-cli/core/android');
const ios = require('react-native/local-cli/core/ios');
const findAssets = require('react-native/local-cli/core/findAssets');
const wrapCommands = require('react-native/local-cli/core/wrapCommands');

const path = require('path');

const getRNPMConfig = folder =>
  // eslint-disable-next-line import/no-dynamic-require
  require(path.join(folder, './package.json')).rnpm || {};

const config = {
  getDependencyConfig(packageName) {
    const folder = path.join(process.cwd(), 'node_modules', packageName);
    const rnpm = getRNPMConfig(
      path.join(process.cwd(), 'node_modules', packageName)
    );

    if (packageName === 'react-native-vector-icons') {
      // we do not need link all fonts from it, #402
      rnpm.assets = [];
    }

    return Object.assign({}, rnpm, {
      ios: ios.dependencyConfig(folder, rnpm.ios || {}),
      android: android.dependencyConfig(folder, rnpm.android || {}),
      assets: findAssets(folder, rnpm.assets),
      commands: wrapCommands(rnpm.commands),
      params: rnpm.params || [],
    });
  },
};

module.exports = config;
