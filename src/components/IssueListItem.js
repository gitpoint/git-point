import React, {PropTypes} from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import {ListItem} from 'react-native-elements';

import IssueStateBadge from './IssueStateBadge';
import LabelButton from './LabelButton';

import colors from '../config/colors';
import moment from 'moment';

const IssueListItem = (
  {
    type,
    issue,
    navigation,
  }
) => (
  <TouchableHighlight
    onPress={() => navigation.navigate('Issue', {issue: issue})}
    underlayColor={colors.greyLight}>
    <View style={styles.container}>
      <ListItem
        containerStyle={styles.listItemContainer}
        title={issue.title}
        subtitle={moment(issue.created_at).fromNow()}
        leftIcon={{name: type === 'issue' ? 'issue-opened' : 'git-pull-request', size: 36, color: colors.grey, type: 'octicon'}}
        hideChevron
        titleStyle={styles.title}
      />
      <IssueStateBadge style={styles.badge} issue={issue} />
    </View>
  </TouchableHighlight>
);

// const renderSubtitle = issue => (
//   <View>
//     <Text style={styles.subtitle}>
//       <Text style={styles.subtitleText}>Opened by {issue.user.login}</Text>
//       {'  '}
//       <Text style={styles.subtitleDate}>
//         {moment(issue.created_at).fromNow()}
//       </Text>
//     </Text>
//     <View style={styles.labelButtonGroup}>
//       {renderLabelButtons(issue.labels)}
//     </View>
//   </View>
// );
//
// const renderLabelButtons = labels => {
//   return labels
//     .slice(0, 3)
//     .map((label, i) => <LabelButton key={i} label={label} />);
// };

IssueListItem.propTypes = {
  type: PropTypes.string,
  issue: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyLight,
  },
  listItemContainer: {
    flex: 1,
    borderBottomWidth: 0,
  },
  title: {
    color: colors.primarydark,
    fontFamily: 'AvenirNext-DemiBold',
  },
  subtitle: {
    marginLeft: 10,
  },
  subtitleText: {
    color: colors.primaryDark,
    fontFamily: 'AvenirNext-Regular',
  },
  subtitleDate: {
    color: colors.greyDark,
    fontFamily: 'AvenirNext-Regular',
  },
  labelButtonGroup: {
    marginLeft: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 5,
  },
  badge: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  }
});

export default IssueListItem;
