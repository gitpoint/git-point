import React, { Component } from 'react';
import { colors, fonts, normalize } from 'config';
import { t } from 'utils';
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

type Props = {
  locale: string,
};

export class ErrorScreen extends Component {
  props: Props;
  render() {
    return (
      <ViewWrapper>
        <TextStyled>
          {t(
            'Oops! it seems that you are not connected to the internet!',
            this.props.locale
          )}
        </TextStyled>
      </ViewWrapper>
    );
  }
}
