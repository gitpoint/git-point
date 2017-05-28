import React, {PropTypes} from 'react';
import { Text, View, StyleSheet } from 'react-native'

import config from '@config';

export const IssueStateBadge = ({ issue }) => {
  return (
    <View style={[styles.badge, issue.state ===  'open' ? styles.openIssue : styles.closedIssue]}>
      <Text style={styles.text}>{issue.state === 'open' ? 'Open' : 'Closed'}</Text>
    </View>
  )
}

IssueStateBadge.propTypes = {
  issue: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  badge: {
    padding: 12,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 20,
  },
  openIssue: {
    backgroundColor: config.colors.green,
  },
  closedIssue: {
    backgroundColor: config.colors.red,
  },
  text: {
    fontSize: 14,
    fontFamily: 'AvenirNext-DemiBold',
    color: config.colors.white,
  }
})