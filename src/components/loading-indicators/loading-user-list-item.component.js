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
`;

const Avatar = styled(Animated.View)`
  width: 34;
  height: 34;
  background-color: ${colors.greyDark};
  border-radius: 17;
  margin-right: 10;
`;

const TextBar = styled(Animated.View)`
  height: 7;
  width: 80;
  background-color: ${colors.greyDark};
`;

const LoadingUserListItemComponent = ({ opacity }: FadeAnimationProps) => (
  <Container>
    <Wrapper>
      <Avatar style={{ opacity }} />
      <TextBar style={{ opacity }} />
    </Wrapper>
  </Container>
);

export const LoadingUserListItem = withFadeAnimation(
  LoadingUserListItemComponent
);
