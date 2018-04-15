import React, { Component } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';
import { colors } from 'config';
import { infiniteAnimation } from 'utils';

const Container = styled.View`
  padding: 10px 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: #ededed;
  background-color: transparent;
`;

const Wrapper = styled.View`
  flex-direction: row;
  margin-left: 10px;
  align-items: center;
`;

const Avatar = styled(Animated.View)`
  width: 34px;
  height: 34px;
  background-color: ${colors.greyDark};
  border-radius: 17px;
  margin-right: 10px;
`;

const Icon = styled(Animated.View)`
  width: 16px;
  height: 16px;
  background-color: ${colors.greyDark};
  margin-left: 10px;
  margin-right: 5px;
  border-radius: 8px;
`;

const TextBar = styled(Animated.View)`
  height: 7px;
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
