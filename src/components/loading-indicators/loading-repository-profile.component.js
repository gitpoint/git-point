// @flow

import React, { Component } from 'react';
import { View, Animated } from 'react-native';
import { Icon } from 'react-native-elements';
import styled from 'styled-components';

import { colors, fonts, normalize } from 'config';
import { loadingAnimation, t } from 'utils';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Profile = styled.View`
  flex: 2;
  margin-top: 50;
  align-items: center;
  justify-content: center;
`;

const OctIcon = styled(Icon).attrs({
  name: 'repo',
  type: 'octicon',
  size: 45,
  color: colors.greyLight,
  containerStyle: {
    marginLeft: 10,
    paddingBottom: 20,
  },
})``;

const Details = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  min-width: 300;
`;

const Unit = styled.View`
  flex: 1;
`;

const UnitText = styled.Text`
  text-align: center;
  color: ${colors.white};
  font-size: ${normalize(10)};
  ${fonts.fontPrimary};
`;

export class LoadingRepositoryProfile extends Component {
  props: {
    locale: string,
  };

  state: {
    fadeAnimValue: Animated,
  };

  constructor(props) {
    super(props);
    this.state = {
      fadeAnimValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    loadingAnimation(this.state.fadeAnimValue).start();
  }

  render() {
    const { locale } = this.props;

    return (
      <Container>
        <View>
          <Profile>
            <OctIcon />
          </Profile>

          <Details>
            <Unit>
              <UnitText>{t('Stars', locale)}</UnitText>
            </Unit>

            <Unit>
              <UnitText>{t('Forks', locale)}</UnitText>
            </Unit>
          </Details>
        </View>
      </Container>
    );
  }
}
