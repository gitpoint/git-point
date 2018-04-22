import React, { Component } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';
import { colors } from 'config';
import { infiniteAnimation } from 'utils';

const Container = styled.View`
  padding: 10px;
  border-bottom-width: 1;
  border-bottom-color: #ededed;
  background-color: transparent;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled(Animated.View)`
  width: 34;
  height: 34;
  background-color: ${colors.greyDark};
  border-radius: 17;
  margin-right: 10;
`;

const Icon = styled(Animated.View)`
  width: 16;
  height: 16;
  background-color: ${colors.greyDark};
  margin-left: 10;
  margin-right: 5;
  border-radius: 8;
`;

const TextBar = styled(Animated.View)`
  height: 7;
  flex: 1;
  background-color: ${colors.greyDark};
`;

export class LoadingEventListItem extends Component {
  constructor() {
    super();
    this.fadeFrom = 0.3;
    this.fadeTo = 0.6;
    this.state = {
      fadeAnimValue: new Animated.Value(this.fadeTo),
    };
  }

  componentDidMount() {
    this.runAnimation();
  }

  runAnimation() {
    infiniteAnimation(
      this.state.fadeAnimValue,
      this.fadeFrom,
      this.fadeTo,
      () => {
        this.runAnimation();
      }
    );
  }

  render() {
    return (
      <Container>
        <Wrapper>
          <Avatar style={{ opacity: this.state.fadeAnimValue }} />
          <TextBar style={{ opacity: this.state.fadeAnimValue }} />
          <Icon style={{ opacity: this.state.fadeAnimValue }} />
        </Wrapper>
      </Container>
    );
  }
}
