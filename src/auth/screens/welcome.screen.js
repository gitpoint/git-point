import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { Trans } from '@lingui/react';

import { ViewContainer } from 'components';
import { colors, fonts, normalize } from 'config';

const mapStateToProps = state => ({
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
    isLoggingIn: boolean,
  };

  render() {
    const { isLoggingIn } = this.props;

    return (
      <ViewContainer>
        <Container>
          <WelcomeMessage>
            <Trans>Welcome to GitPoint</Trans>
          </WelcomeMessage>
          <ActivityIndicator animating={isLoggingIn} color={colors.white} />
        </Container>
      </ViewContainer>
    );
  }
}

export const WelcomeScreen = connect(mapStateToProps)(Welcome);
