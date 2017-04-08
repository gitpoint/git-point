import React, {PropTypes} from 'react';
import { Text, View, StyleSheet } from 'react-native'

import colors from '../config/colors';

const IssueStateBadge = ({ issue }) => {
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
    backgroundColor: colors.green,
  },
  closedIssue: {
    backgroundColor: colors.red,
  },
  text: {
    fontSize: 14,
    fontFamily: 'AvenirNext-DemiBold',
    color: colors.white,
  }
})

export default IssueStateBadge
