import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { colors } from 'config';

import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

class Splash extends Component {
  props: {
    isAuthenticated: boolean,
    navigation: Object
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this._navigateTo('Main');
    } else {
      this._navigateTo('Login');
    }
  }

  _navigateTo = (routeName: string) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    });
    this.props.navigation.dispatch(resetAction);
  };
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

export const SplashScreen = connect(mapStateToProps)(Splash);
