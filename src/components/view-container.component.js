import React from 'react';
import styled from 'styled-components';

import { colors } from 'config';

type Props = {
  children?: React.Element<*>,
};

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background-color: ${colors.white};
`;

export const ViewContainer = ({ children }: Props) => (
  <Container>{children}</Container>
);

ViewContainer.defaultProps = {
  children: null,
};
