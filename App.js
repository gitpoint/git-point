import React, { Component } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components/native';
import {
  AppRegistry,
  AsyncStorage,
  LayoutAnimation,
  StatusBar,
} from 'react-native';
import { persistStore } from 'redux-persist';
import createEncryptor from 'redux-persist-transform-encrypt';
import DeviceInfo from 'react-native-device-info';
import md5 from 'md5';
import codePush from 'react-native-code-push';

import { colors } from 'config';
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
        blacklist: ['user'],
      },
      () => {
        this.setState({ rehydrated: true });
      }
    );

    this.constructor.initLocale();
    this.getCurrentRouteName = this.getCurrentRouteName.bind(this);
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
    // dive into nested navigators

    if (route.routes) {
      return this.getCurrentRouteName(route);
    }

    return route.routeName;
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
        <GitPoint
          onNavigationStateChange={(prev, next) => {
            const darkScreens = [
              'MyProfile',
              'Profile',
              'Organization',
              'Repository',
            ];

            if (darkScreens.includes(this.getCurrentRouteName(next))) {
              StatusBar.setBarStyle('light-content');
              StatusBar.setBackgroundColor(colors.primaryDark);
            } else {
              StatusBar.setBarStyle('dark-content');
              StatusBar.setBackgroundColor(colors.white);
            }
          }}
        />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('GitPoint', () => App);
