import React, { Component } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import {
  AppRegistry,
  AsyncStorage,
  LayoutAnimation,
  StatusBar,
  Platform,
} from 'react-native';
import { persistStore } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import DeviceInfo from 'react-native-device-info';
import md5 from 'md5';
import codePush from 'react-native-code-push';

import { colors, getStatusBarConfig } from 'config';
import { getCurrentLocale, configureLocale } from 'utils';
import { GitPoint } from './routes';
import { configureStore } from './root.store';

const Container = styled.View`
  align-items: center;
  background-color: ${colors.white}
  flex: 1;
  justify-content: center;
`;

const Logo = styled.Image`
  height: 100;
  width: 100;
`;

if (console) {
  console.disableYellowBox = true; // eslint-disable-line no-console
}

class App extends Component {
  static async initLocale() {
    const locale = await getCurrentLocale();

    configureLocale(locale);
  }

  constructor() {
    super();

    this.state = {
      rehydrated: false,
    };
    this.statusBarHandler = this.statusBarHandler.bind(this);
  }

  componentWillMount() {
    const encryptor = createEncryptor({
      secretKey: md5(DeviceInfo.getUniqueID()),
    });

    persistStore(
      configureStore,
      {
        storage: AsyncStorage,
        transforms: [encryptor],
        whitelist: ['auth'],
      },
      () => {
        this.setState({ rehydrated: true });
      }
    );

    this.constructor.initLocale();
  }

  componentDidMount() {
    if (!__DEV__) {
      codePush.sync({
        updateDialog: false,
        installMode: codePush.InstallMode.IMMEDIATE,
      });
    }
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  getCurrentRouteName(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];

    if (route.routes) {
      return this.getCurrentRouteName(route);
    }

    return route.routeName;
  }

  statusBarHandler(prev, next) {
    const routeName = this.getCurrentRouteName(next);

    const { translucent, backgroundColor, barStyle } = getStatusBarConfig(
      routeName
    );

    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(translucent);
      StatusBar.setBackgroundColor(backgroundColor);
    }
    StatusBar.setBarStyle(barStyle);
  }

  render() {
    if (!this.state.rehydrated) {
      return (
        <Container>
          <Logo source={require('./src/assets/logo-black.png')} />
        </Container>
      );
    }

    return (
      <Provider store={configureStore}>
        <GitPoint onNavigationStateChange={this.statusBarHandler}>
          <StatusBar />
        </GitPoint>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('GitPoint', () => App);
