import React, {PropTypes} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

import colors from '../config/colors';

const emojiTypes = {
  '+1': '👍',
  '-1': '👎',
  'laugh': '😄',
  'hooray': '🎉',
  'confused': '😕',
  'heart': '❤️',
}

const Reaction = (
  {
    type,
    commentType,
    count,
    active,
    locked,
    createdReactionID,
    commentID,
    triggerReaction
  },
) => {
  let Component = locked ? View : TouchableOpacity;

  const addOrRemoveReaction = (type, commentType, commentID, active, createdReactionID) => {
    if (!locked) {
      return triggerReaction(type, commentType, commentID, active, createdReactionID);
    }
  }

  return (
    <Component
      style={[styles.container, active && styles.containerActive, locked && styles.containerLocked]}
      onPress={() => addOrRemoveReaction(type, commentType, commentID, active, createdReactionID)}>
      <Text style={styles.reaction}>{emojiTypes[type]}</Text>
      <Text style={active ? styles.countActive : styles.count}>
        {count}
      </Text>
    </Component>
  )
};

Reaction.propTypes = {
  type: PropTypes.string,
  commentType: PropTypes.string,
  count: PropTypes.number,
  active: PropTypes.bool,
  locked: PropTypes.bool,
  createdReactionID: PropTypes.number,
  commentID: PropTypes.number,
  triggerReaction: PropTypes.func,
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
  containerActive: {
    borderColor: 'rgba(79,176,252,.4)',
    backgroundColor: 'rgba(79,176,252,.08)',
  },
  containerLocked: {
    backgroundColor: colors.greyVeryLight,
  },
  reaction: {
    fontSize: 13,
  },
  count: {
    color: colors.greyDark,
    paddingLeft: 5,
    paddingTop: 5,
    fontSize: 13,
    fontFamily: 'AvenirNext-Medium',
  },
  countActive: {
    color: '#4fb0fc',
    paddingLeft: 5,
    paddingTop: 5,
    fontSize: 13,
    fontFamily: 'AvenirNext-DemiBold',
  },
});

export default Reaction;
