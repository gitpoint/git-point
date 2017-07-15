import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Image,
  StyleSheet,
  View,
  LayoutAnimation
} from 'react-native';

import { colors } from 'config';

//Routes
import { GitPoint } from './routes';

// Redux Store
import configureStore from './root.store';
import { Provider } from 'react-redux';

import { persistStore } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';

// Device Info
import DeviceInfo from 'react-native-device-info';

// md5
import md5 from 'md5';

if (console) {
  console.disableYellowBox = true;
}

let store = null;

class App extends Component {
  constructor() {
    super();

    this.state = {
      rehydrated: false
    };
  }

  componentWillMount() {
    const encryptor = createEncryptor({
      secretKey: md5(DeviceInfo.getUniqueID())
    });

    store = configureStore();

    persistStore(
      store,
      { storage: AsyncStorage, transforms: [encryptor] },
      () => {
        this.setState({ rehydrated: true });
      }
    );
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  render() {
    if (!this.state.rehydrated)
      return (
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('./src/assets/logo-black.png')}
          />
        </View>
      );
    return (
      <Provider store={store}>
        <GitPoint />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 100,
    height: 100
  }
});

AppRegistry.registerComponent('GitPoint', () => App);
