import React, { Component } from 'react';
import styled from 'styled-components';

import { fonts, normalize } from 'config';
import { emojifyText, getFontColorByBackground } from 'utils';

const InlineLabelText = styled.Text`
  font-size: ${normalize(10)};
  ${fonts.fontPrimarySemiBold};
  padding-left: 5;
  padding-right: 5;
  margin: 2px;
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
        {emojifyText(name)}
      </InlineLabelText>
    );
  }
}
