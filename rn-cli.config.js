const defaultConfig = require('react-native/local-cli/core/default.config.js');

const config = {
  getDependencyConfig(packageName) {
    if (packageName === 'react-native-vector-icons') {
      // we do not need link all fonts from it, #402
      return {
        assets: [],
        commands: {},
        params: [],
      };
    }

    return defaultConfig.getDependencyConfig(packageName);
  },
};

module.exports = config;
