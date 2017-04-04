import React, {PropTypes} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import Emoji from 'react-native-emoji';

import colors from '../config/colors';

const Reaction = (
  {
    emoji,
    count,
  },
) => (
  <TouchableOpacity style={styles.container}>
    <Text style={styles.reaction}><Emoji name={emoji} /></Text>
    <Text style={styles.count}>
      {count}
    </Text>
  </TouchableOpacity>
);

Reaction.propTypes = {
  emoji: PropTypes.string,
  count: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  reaction: {
    fontSize: 15,
  },
  count: {
    color: colors.primaryDark,
    paddingLeft: 3,
    paddingTop: 5,
    fontSize: 13,
    fontFamily: 'AvenirNext-Medium',
  },
});

export default Reaction;
