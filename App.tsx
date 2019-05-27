import React, { Component } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components/native';
import {
  AppRegistry,
  LayoutAnimation,
  StatusBar,
  Platform,
} from 'react-native';
import codePush from 'react-native-code-push';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationRoute, NavigationParams } from 'react-navigation';
import { colors, getStatusBarConfig } from 'config';
import { getCurrentLocale, configureLocale } from 'utils';
import { GitPoint } from './routes';
import { configureStore, persistor } from './root.store';

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

type State = {
  rehydrated: boolean;
};

type Props = {};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      rehydrated: false,
    };

    this.statusBarHandler = this.statusBarHandler.bind(this);
  }

  async componentDidMount() {
    if (!__DEV__) {
      codePush.sync({
        updateDialog: undefined,
        installMode: codePush.InstallMode.IMMEDIATE,
      });
    }
    const locale = await getCurrentLocale();

    configureLocale(locale);
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  getCurrentRouteName(
    navigationState: NavigationRoute<NavigationParams>
  ): string | null {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];

    if (route.routes) {
      return this.getCurrentRouteName(route);
    }

    return route.routeName;
  }

  statusBarHandler(
    prev: NavigationRoute<NavigationParams>,
    next: NavigationRoute<NavigationParams>
  ) {
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
          <GitPoint onNavigationStateChange={this.statusBarHandler}>
            <StatusBar />
          </GitPoint>
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('GitPoint', () => App);
