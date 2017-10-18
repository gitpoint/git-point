import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import { ViewContainer } from 'components';
import { colors, fonts, normalize } from 'config';
import { translate } from 'utils';

const mapStateToProps = state => ({
  locale: state.auth.locale,
  isLoggingIn: state.auth.isLoggingIn,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.githubDark,
  },
  welcomeMessage: {
    color: colors.white,
    paddingBottom: 20,
    fontSize: normalize(24),
    ...fonts.fontPrimary,
  },
});

class Welcome extends Component {
  props: {
    locale: string,
    isLoggingIn: boolean,
  };

  render() {
    const { locale, isLoggingIn } = this.props;

    return (
      <ViewContainer>
        <View style={styles.container}>
          <Text style={styles.welcomeMessage}>
            {translate('auth.welcome.welcomeTitle', locale)}
          </Text>
          <ActivityIndicator animating={isLoggingIn} color={colors.white} />
        </View>
      </ViewContainer>
    );
  }
}

export const WelcomeScreen = connect(mapStateToProps)(Welcome);
