import React from 'react';
import { colors, fonts, normalize } from 'config';
import styled from 'styled-components';
import { Trans } from '@lingui/react';

const ViewWrapper = styled.View`
  align-items: center;
  align-content: center;
  height: 100%;
  justify-content: center;
`;

const TextStyled = styled.Text`
  color: ${colors.white};
  ${fonts.fontPrimaryBold};
  font-size: ${normalize(20)};
  text-align: center;
  width: 80%;
`;

export const ErrorScreen = () => {
  return (
    <ViewWrapper>
      <TextStyled>
        <Trans>
          Oops! it seems that you are not connected to the internet!
        </Trans>
      </TextStyled>
    </ViewWrapper>
  );
};
