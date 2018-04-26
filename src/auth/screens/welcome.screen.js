import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import { ViewContainer } from 'components';
import { colors, fonts, normalize } from 'config';
import { t } from 'utils';

const mapStateToProps = state => ({
  locale: state.auth.locale,
  isLoggingIn: state.auth.isLoggingIn,
});

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
  };

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

export const WelcomeScreen = connect(mapStateToProps)(Welcome);
