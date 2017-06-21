import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';

import { ViewContainer } from 'components';

import { colors, normalize } from 'config';

import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoggingIn: state.auth.isLoggingIn
});

class Welcome extends Component {
  props: {
    isAuthenticated: boolean,
    isLoggingIn: boolean,
    navigation: Object
  };

  _navigateTo = (routeName: string) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    const { isAuthenticated, isLoggingIn } = this.props;

    return (
      <ViewContainer>
        <View style={styles.container}>
          <Text style={styles.welcomeMessage}>Welcome to GitPoint</Text>

          {!isAuthenticated &&
            <ActivityIndicator
              animating={isLoggingIn}
              style={styles.loadingIcon}
            />}

          {isAuthenticated &&
            <Button
              raised
              title="Enter"
              fontSize={16}
              fontWeight="bold"
              buttonStyle={styles.enterButton}
              color={colors.white}
              onPress={() => this._navigateTo('Main')}
            />}
        </View>
      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeMessage: {
    color: colors.primarydark,
    fontSize: normalize(24),
    fontFamily: 'AvenirNext-Medium'
  },
  loadingIcon: {
    marginTop: 30
  },
  enterButton: {
    marginTop: 30,
    backgroundColor: colors.primarydark,
    borderRadius: 3,
    paddingVertical: 5,
    width: 100
  }
});

export const WelcomeScreen = connect(mapStateToProps)(Welcome);
