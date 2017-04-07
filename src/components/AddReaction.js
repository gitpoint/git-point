import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Icon} from 'react-native-elements';

import colors from '../config/colors';

const AddReaction = () => (
  <View style={styles.container}>
    <Text style={styles.plus}>+</Text>
    <Icon
      name="smiley"
      type="octicon"
      color={colors.grey}
      size={13} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.greyLight,
    padding: 5,
  },
  plus: {
    color: colors.grey,
    paddingRight: 2,
    fontSize: 10,
    fontFamily: 'AvenirNext-Medium',
  },
});

export default AddReaction;
