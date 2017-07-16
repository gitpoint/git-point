import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import { ViewContainer } from 'components';
import { colors, fonts, normalize } from 'config';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoggingIn: state.auth.isLoggingIn,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeMessage: {
    color: colors.primarydark,
    fontSize: normalize(24),
    ...fonts.fontPrimary,
  },
  loadingIcon: {
    marginTop: 30,
  },
  enterButton: {
    marginTop: 30,
    backgroundColor: colors.primarydark,
    borderRadius: 3,
    paddingVertical: 5,
    width: 100,
  },
  buttonText: {
    ...fonts.fontPrimaryBold,
    fontSize: normalize(16),
  },
});

class Welcome extends Component {
  props: {
    isAuthenticated: boolean,
    isLoggingIn: boolean,
    navigation: Object,
  };

  _navigateTo = (routeName: string) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
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
              buttonStyle={styles.enterButton}
              textStyle={styles.buttonText}
              color={colors.white}
              onPress={() => this._navigateTo('Main')}
            />}
        </View>
      </ViewContainer>
    );
  }
}

export const WelcomeScreen = connect(mapStateToProps)(Welcome);
