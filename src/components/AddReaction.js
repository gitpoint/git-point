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
      size={16} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  plus: {
    color: colors.grey,
    paddingRight: 3,
    fontSize: 13,
    fontFamily: 'AvenirNext-Medium',
  },
});

export default AddReaction;
