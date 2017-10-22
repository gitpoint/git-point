import React, { Component } from 'react';
import styled from 'styled-components/native';

import { fonts, normalize } from 'config';
import { getFontColorByBackground } from 'utils';

const InlineLabelText = styled.Text`
  font-size: ${normalize(10)};
  ${{ ...fonts.fontPrimarySemiBold }};
  padding-horizontal: 5;
  margin-top: 2;
  margin-left: 2;
  margin-right: 2;
  margin-bottom: 2;
  border-width: 1;
  overflow: hidden;
  border-radius: 3;
  min-width: 50;
  text-align: center;
  ${({ backgroundColor }) => `background-color: #${backgroundColor};`};
  ${({ color }) => `color: ${getFontColorByBackground(color)};`};
  ${({ borderColor }) => `border-color: #${borderColor};`};
`;

export class InlineLabel extends Component {
  props: {
    label: Object,
  };

  render() {
    const { color, name } = this.props.label;

    return (
      <InlineLabelText
        backgroundColor={color}
        color={color}
        borderColor={color}
      >
        {name}
      </InlineLabelText>
    );
  }
}
