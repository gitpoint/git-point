import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment/min/moment-with-locales.min';

import { StateBadge } from 'components';
import { colors, fonts, normalize } from 'config';

type Props = {
  type: string,
  issue: Object,
  navigation: Object,
  language: string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyLight,
  },
  closedIssue: {
    backgroundColor: colors.greyVeryLight,
    opacity: 0.6,
  },
  listItemContainer: {
    flex: 1,
    borderBottomWidth: 0,
  },
  title: {
    color: colors.primaryDark,
    ...fonts.fontPrimary,
  },
  subtitleView: {
    flexDirection: 'row',
    marginTop: 2,
  },
  desc: {
    flex: 1,
    fontSize: normalize(12),
    color: colors.greyBlue,
  },
  comments: {
    paddingHorizontal: 5,
    fontSize: normalize(12),
    backgroundColor: colors.greyLight,
    borderRadius: 5,
    overflow: 'hidden',
  },
  badge: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export const IssueListItem = ({ type, issue, navigation, language }: Props) =>
  <TouchableHighlight
    style={issue.state === 'closed' && styles.closedIssue}
    onPress={() =>
      navigation.navigate('Issue', {
        issue,
        isPR: !!issue.pull_request,
        language,
      })}
    underlayColor={colors.greyLight}
  >
    <View style={styles.container}>
      <ListItem
        containerStyle={styles.listItemContainer}
        title={issue.title}
        subtitle={
          <View style={styles.subtitleView}>
            <Text style={styles.desc} numberOfLines={1}>
              {`#${issue.number} - ${moment(issue.created_at).fromNow()} - ${issue.user.login}`}
            </Text>
            {!!issue.comments && <Text style={styles.comments}>{issue.comments}</Text>}
          </View>
        }
        leftIcon={{
          name: type === 'issue' ? 'issue-opened' : 'git-pull-request',
          size: 36,
          color: colors.grey,
          type: 'octicon',
        }}
        hideChevron
        titleStyle={styles.title}
      />
      <StateBadge style={styles.badge} issue={issue} language={language} />
    </View>
  </TouchableHighlight>;
