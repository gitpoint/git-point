import React, { Component } from 'react';
import { colors, fonts, normalize } from 'config';
import { translate } from 'utils';
import styled from 'styled-components';

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

export class ErrorScreen extends Component {
  render() {
    return (
      <ViewWrapper>
        <TextStyled>{translate('auth.networkError')}</TextStyled>
      </ViewWrapper>
    );
  }
}
