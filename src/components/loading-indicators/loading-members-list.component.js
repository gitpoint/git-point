import React, { Component } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';

import { colors, fonts } from 'config';
import { loadingAnimation } from 'utils';

const Wrapper = styled.View`
  margin-top: 15;
  padding: 15px;
`;

const SectionTitle = styled.Text`
  color: ${colors.black};
  margin-bottom: 10;
  ${fonts.fontPrimaryBold};
`;

const AvatarContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const Avatar = styled(Animated.View)`
  border-radius: 15;
  height: 30;
  width: 30;
  background-color: ${colors.grey};
  margin-right: 5;
`;

export class LoadingMembersList extends Component {
  props: {
    title: string,
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
    const { title } = this.props;

    return (
      <Wrapper>
        <SectionTitle>{title}</SectionTitle>

        <AvatarContainer>
          {[...Array(10)].map((item, index) => {
            return (
              <Avatar
                key={index} // eslint-disable-line react/no-array-index-key
                style={{ opacity: this.state.fadeAnimValue }}
              />
            );
          })}
        </AvatarContainer>
      </Wrapper>
    );
  }
}
