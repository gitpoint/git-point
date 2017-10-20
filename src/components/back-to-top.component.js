import React, { Component } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

import { colors } from 'config';

const Container = styled(Animated.View)`
  position: absolute;
  right: 20;
  width: 40;
  height: 40;
  borderRadius: 40;
  backgroundColor: ${colors.greyDark};
  alignItems: center;
  justifyContent: center;
`;

export class BackToTop extends Component {
  props: {
    offsetY: number,
    opacity: number,
    bottom: number,
    distance: number,
    onPress: Function,
  };

  constructor(props) {
    super(props);

    this.state = {
      animatedOpacity: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { offsetY, distance, opacity } = this.props;
    const { offsetY: nextOffsetY } = nextProps;
    const { animatedOpacity } = this.state;

    if (offsetY !== nextOffsetY) {
      Animated.timing(animatedOpacity, {
        toValue: nextOffsetY > distance ? opacity : 0,
        duration: 200,
      }).start();
    }
  }

  render() {
    const { onPress, bottom } = this.props;
    const extraStyles = {
      bottom,
      opacity: this.state.animatedOpacity,
    };

    return (
      <Container style={extraStyles}>
        <TouchableOpacity onPress={() => onPress()}>
          <Icon color={colors.white} size={32} name="expand-less" />
        </TouchableOpacity>
      </Container>
    );
  }
}

BackToTop.defaultProps = {
  offsetY: null,
  opacity: 1,
  bottom: 10,
  distance: 200,
  onPress: undefined,
};
