import React, { Component } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';

import { colors } from 'config';
import { loadingAnimation } from 'utils';

const Container = styled.View`
  padding-top: 20;
  padding-right: 20;
  padding-bottom: 20;
  height: 100;
  border-bottom-color: #ededed;
  border-bottom-width: 1;
  background-color: transparent;
`;

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  margin-left: 10;
`;

const TextBarTitle = styled(Animated.View)`
  height: 7;
  width: 100;
  background-color: ${colors.greyDarkest};
  margin-bottom: 10;
`;

const TextBarLine1 = styled(Animated.View)`
  height: 7;
  width: 250;
  background-color: ${colors.grey};
  margin-bottom: 10;
`;

const TextBarLine2 = styled(Animated.View)`
  height: 7;
  width: 80;
  background-color: ${colors.grey};
`;

export class LoadingRepositoryListItem extends Component {
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
    return (
      <Container>
        <Wrapper>
          <TextBarTitle style={{ opacity: this.state.fadeAnimValue }} />
          <TextBarLine1 style={{ opacity: this.state.fadeAnimValue }} />
          <TextBarLine2 style={{ opacity: this.state.fadeAnimValue }} />
        </Wrapper>
      </Container>
    );
  }
}
