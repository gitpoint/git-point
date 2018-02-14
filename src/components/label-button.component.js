import React, { Component } from 'react';
import styled from 'styled-components/native';

import { fonts } from 'config';
import { getFontColorByBackground } from 'utils';

const LabelButtonSmall = styled.Button`
  padding: 5px;
  padding-top: 3;
  padding-bottom: 3;
  border-radius: 3;
  margin-left: 0;
  margin-right: 10;
  min-width: 70;
`;

const LabelButtonLarge = styled.Button`
  padding-top: 5;
  padding-bottom: 5;
  padding-left: 10;
  padding-right: 10;
  margin-left: 0;
  border-radius: 3;
`;

export class LabelButton extends Component {
  props: {
    label: Object,
    largeWithTag: boolean,
  };

  render() {
    const { label, largeWithTag } = this.props;
    const icon = {
      name: 'tag',
      type: 'octicon',
      color: getFontColorByBackground(label.color),
    };
    let button = null;

    if (largeWithTag) {
      button = (
        <LabelButtonLarge
          title={label.name}
          textStyle={fonts.fontPrimarySemiBold}
          fontSize="13"
          color={getFontColorByBackground(label.color)}
          backgroundColor={`#${label.color}`}
          icon={icon}
        />
      );
    } else {
      button = (
        <LabelButtonSmall
          title={label.name}
          textStyle={fonts.fontPrimarySemiBold}
          fontSize="12"
          color={getFontColorByBackground(label.color)}
          backgroundColor={`#${label.color}`}
        />
      );
    }

    return { button };
  }
}
