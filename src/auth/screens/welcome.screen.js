/* eslint-disable no-shadow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import CookieManager from 'react-native-cookies';

import { auth, getUser } from 'auth';
import { ViewContainer } from 'components';
import { colors, fonts, normalize } from 'config';
import { t, resetNavigationTo } from 'utils';

const mapStateToProps = state => ({
  locale: state.auth.locale,
  isLoggingIn: state.auth.isLoggingIn,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      auth,
      getUser,
    },
    dispatch
  );

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.githubDark};
`;

const WelcomeMessage = styled.Text`
  color: ${colors.white};
  padding-bottom: 20;
  font-size: ${normalize(24)};
  ${fonts.fontPrimary};
`;

class Welcome extends Component {
  props: {
    locale: string,
    isLoggingIn: boolean,
    isAuthenticated: boolean,
    auth: Function,
    getUser: Function,
    navigation: Object,
  };

  componentDidMount() {
    const { isAuthenticated, navigation, auth, getUser } = this.props;
    const { code, state } = navigation.state.params;

    if (isAuthenticated) {
      resetNavigationTo('Main', navigation);
    } else {
      CookieManager.clearAll().then(() => {
        auth(code, state).then(() => {
          getUser().then(() => {
            resetNavigationTo('Main', navigation);
          });
        });
      });
    }
  }

  render() {
    const { locale, isLoggingIn } = this.props;

    return (
      <ViewContainer>
        <Container>
          <WelcomeMessage>{t('Welcome to GitPoint', locale)}</WelcomeMessage>
          <ActivityIndicator animating={isLoggingIn} color={colors.white} />
        </Container>
      </ViewContainer>
    );
  }
}

export const WelcomeScreen = connect(mapStateToProps, mapDispatchToProps)(Welcome);
