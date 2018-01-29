import React from 'react';
import styled from 'styled-components';

import { colors, fonts, normalize } from 'config';

type Props = {
  color: string,
  backgroundColor: string,
  text: string,
  largeText: boolean,
};

const BadgeContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 18;
  width: 18;
  height: 18;
  border-color: ${colors.alabaster};
  border-width: 1;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const BadgeText = styled.Text`
  ${fonts.fontPrimaryBold};
  background-color: transparent;
  color: ${({ color }) => color || color.black};
  font-size: ${({ largeText }) => (largeText ? normalize(9.5) : normalize(7))};
`;

export const Badge = ({ color, backgroundColor, text, largeText }: Props) => (
  <BadgeContainer backgroundColor={backgroundColor}>
    <BadgeText largeText={largeText} color={color}>
      {text}
    </BadgeText>
  </BadgeContainer>
);
