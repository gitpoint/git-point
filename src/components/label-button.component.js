import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { colors, fonts, normalize } from 'config';

type Props = {
  label: Object,
  largeWithTag: boolean,
};

const getFontColorByBackground = bgColor => {
  const r = parseInt(bgColor.substr(0, 2), 16);
  const g = parseInt(bgColor.substr(2, 2), 16);
  const b = parseInt(bgColor.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? colors.black : colors.white;
};

const styles = StyleSheet.create({
  smallLabelButton: {
    padding: 5,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 3,
    marginLeft: 0,
    marginRight: 10,
    minWidth: 70,
  },
  largeLabelButton: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 0,
    borderRadius: 3,
  },
});

export class InlineLabel extends Component {
  props: {
    label: Object,
  };

  render() {
    const { color, name } = this.props.label;

    return (
      <Text
        style={{
          fontSize: normalize(10),
          fontWeight: 'bold',
          backgroundColor: `#${color}`,
          color: getFontColorByBackground(color),
          padding: 3,
          paddingLeft: 5,
          paddingRight: 5,
          margin: 2,
          borderWidth: 1,
          borderColor: `#${color}`,
          overflow: 'hidden',
          borderRadius: 2,
          minWidth: 50,
          textAlign: 'center',
        }}
      >
        {name}
      </Text>
    );
  }
}

export const LabelButton = ({ label, largeWithTag }: Props) =>
  <Button
    title={label.name}
    textStyle={fonts.fontPrimarySemiBold}
    fontSize={largeWithTag ? 13 : 12}
    color={getFontColorByBackground(label.color)}
    buttonStyle={
      largeWithTag ? styles.largeLabelButton : styles.smallLabelButton
    }
    backgroundColor={`#${label.color}`}
    icon={
      largeWithTag && {
        name: 'tag',
        type: 'octicon',
        color: getFontColorByBackground(label.color),
      }
    }
  />;
