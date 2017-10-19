import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

import { colors } from 'config';

type Props = {
  barColor: string,
  children?: React.Element<*>,
};

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background-color: ${colors.white};
`;

export const ViewContainer = ({ barColor, children }: Props) => (
  <Container>
    <StatusBar
      barStyle={barColor === 'light' ? 'light-content' : 'dark-content'}
    />
    {children}
  </Container>
);

ViewContainer.defaultProps = {
  children: null,
};
