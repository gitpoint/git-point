import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

import { normalize } from 'config';
import { getFontColorByBackground } from 'utils';

const styles = StyleSheet.create({
  inlineLabel: {
    fontSize: normalize(10),
    fontWeight: 'bold',
    padding: 3,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 2,
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 2,
    minWidth: 50,
    textAlign: 'center',
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
        style={[
          styles.inlineLabel,
          {
            backgroundColor: `#${color}`,
            color: getFontColorByBackground(color),
            borderColor: `#${color}`,
          },
        ]}
      >
        {name}
      </Text>
    );
  }
}
