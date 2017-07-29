import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image } from 'react-native';

import { colors } from 'config';
import { resetNavigationTo } from 'utils';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

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
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo-black.png')}
        />
      </View>
    );
  }
}

export const SplashScreen = connect(mapStateToProps)(Splash);
