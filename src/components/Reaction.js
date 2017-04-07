import React, {PropTypes} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import colors from '../config/colors';

const emojiTypes = {
  '+1': '👍',
  '-1': '👎',
  'smile': '😄',
  'tada': '🎉',
  'confused': '😕',
  'heart': '❤️',
}

const Reaction = (
  {
    emoji,
    count,
  },
) => (
  <TouchableOpacity style={styles.container}>
    <Text style={styles.reaction}>{emojiTypes[emoji]}</Text>
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
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.greyLight,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 2,
    marginRight: 7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  reaction: {
    fontSize: 13,
  },
  count: {
    color: colors.primaryDark,
    paddingLeft: 5,
    paddingTop: 5,
    fontSize: 13,
    fontFamily: 'AvenirNext-Medium',
  },
});

export default Reaction;
