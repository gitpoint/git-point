import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { colors } from 'config';
import { resetNavigationTo } from 'utils';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const LogoContainer = styled.View`
  background-color: ${colors.white};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.View`
  width: 100;
  height: 100;
`;

class Splash extends Component {
  props: {
    isAuthenticated: boolean,
    navigation: Object,
  };

  componentDidMount() {
    const { isAuthenticated, navigation } = this.props;

    if (isAuthenticated) {
      resetNavigationTo('Main', navigation);
    } else {
      resetNavigationTo('Login', navigation);
    }
  }

  render() {
    return (
      <LogoContainer>
        <Logo source={require('../../assets/logo-black.png')} />
      </LogoContainer>
    );
  }
}

export const SplashScreen = connect(mapStateToProps)(Splash);
