import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components';

import { colors } from 'config';
import { FadeAnimationProps, withFadeAnimation } from 'utils';

const Container = styled.View`
  padding: 10px;
  border-bottom-width: 1;
  border-bottom-color: #ededed;
  background-color: transparent;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  height: 34;
`;

const TextBar = styled(Animated.View)`
  height: 7;
  width: 150;
  background-color: ${colors.greyDark};
`;

const LoadingListItemComponent = ({ opacity }: FadeAnimationProps) => (
  <Container>
    <Wrapper>
      <TextBar style={{ opacity }} />
    </Wrapper>
  </Container>
);

export const LoadingListItem = withFadeAnimation(LoadingListItemComponent);
