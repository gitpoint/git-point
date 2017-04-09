import React, {PropTypes} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

import colors from '../config/colors';

const LabelButton = (
  {
    label,
  },
) => (
  <Button
    title={label.name}
    fontFamily="AvenirNext-DemiBold"
    fontSize={12}
    color={
      label.name === 'bug' ||
        label.name === 'help wanted' ||
        label.name === 'question'
        ? colors.white
        : colors.primarydark
    }
    buttonStyle={styles.labelButton}
    backgroundColor={`#${label.color}`}
  />
);

LabelButton.propTypes = {
  label: PropTypes.object,
};

const styles = StyleSheet.create({
  labelButton: {
    padding: 5,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 3,
    marginLeft: 0,
    marginRight: 10,
    minWidth: 70,
  },
});

export default LabelButton;
