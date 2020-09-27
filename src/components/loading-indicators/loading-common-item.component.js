import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';

import { colors } from 'config';

const Container = styled.View`
  height: 44;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
`;

export const LoadingCommonItem = () => (
  <Container>
    <ActivityIndicator animating size="small" />
  </Container>
);
