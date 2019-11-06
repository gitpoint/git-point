import React, { Component } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import {
  AppRegistry,
  LayoutAnimation,
  StatusBar,
  Platform,
} from 'react-native';
import codePush from 'react-native-code-push';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // eslint-disable-line
import { colors, getStatusBarConfig } from 'config';
import { getCurrentLocale, configureLocale } from 'utils';
import { GitPoint } from './routes';
import { configureStore, persistor } from './root.store';

const Container = styled.View`
  align-items: center;
  background-color: ${colors.white};
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

  renderLogo = () => (
    <Container>
      <Logo source={require('./src/assets/logo-black.png')} />
    </Container>
  );

  render() {
    return (
      <Provider store={configureStore}>
        <PersistGate loading={this.renderLogo} persistor={persistor}>
          <SafeAreaProvider>
            <GitPoint onNavigationStateChange={this.statusBarHandler}>
              <StatusBar />
            </GitPoint>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('GitPoint', () => App);
