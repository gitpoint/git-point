import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';

import { colors, fonts } from 'config';

type Props = {
  animating: boolean,
  text: string,
  center: boolean,
};

const Container = styled.View`
  background-color: ${colors.white};
  flex: 1;
  align-items: center;
  justify-content: ${props => (props.center ? 'center' : 'flex-start')};
`;

const Message = styled.Text`
  padding-top: 20;
  ${fonts.fontPrimary};
`;

export const LoadingContainer = ({ animating, text, center }: Props) => (
  <Container center={center}>
    <ActivityIndicator animating={animating} size="large" />
    {!!text && <Message>{text}</Message>}
  </Container>
);
