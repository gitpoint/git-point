import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { fonts } from 'config';
import { getFontColorByBackground } from 'utils';

type Props = {
  label: Object,
  largeWithTag: boolean,
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

export const LabelButton = ({ label, largeWithTag }: Props) => (
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
  />
);
