import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import { colors, fonts, normalize } from 'config';
import { t, relativeTimeToNow } from 'utils';

type Props = {
  type: string,
  issue: Object,
  navigation: Object,
  locale: string,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    ...fonts.fontPrimarySemiBold,
  },
  subtitle: {
    marginTop: 2,
    marginRight: -30,
    fontSize: normalize(12),
    fontWeight: '400',
    color: colors.greyBlue,
  },
  commentsContainer: {
    flexDirection: 'row',
    paddingTop: 13,
  },
  comments: {
    paddingLeft: 5,
    fontSize: normalize(12),
    color: colors.greyBlue,
  },
});

const getIconName = (type, issue) => {
  if (type === 'issue') {
    return issue.state === 'closed' ? 'issue-closed' : 'issue-opened';
  }

  return 'git-pull-request';
};

const getIconColor = issue => {
  if (issue.state === 'open') {
    return colors.green;
  } else if (issue.state === 'merged') {
    return colors.purple;
  }

  return colors.red;
};

export const IssueListItem = ({ type, issue, navigation, locale }: Props) => (
  <TouchableHighlight
    style={issue.state === 'closed' && styles.closedIssue}
    onPress={() =>
      navigation.navigate('Issue', {
        issue,
        isPR: !!issue.pull_request,
        locale,
      })
    }
    underlayColor={colors.greyLight}
  >
    <View style={styles.container}>
      <ListItem
        containerStyle={styles.listItemContainer}
        title={issue.title}
        subtitle={
          issue.state === 'open'
            ? t('#{number} opened {time} ago by {user}', locale, {
                number: issue.number,
                user: issue.user.login,
                time: relativeTimeToNow(issue.created_at),
              })
            : t('#{number} by {user} was closed {time} ago', locale, {
                number: issue.number,
                user: issue.user.login,
                time: relativeTimeToNow(issue.closed_at),
              })
        }
        leftIcon={{
          name: getIconName(type, issue),
          size: 36,
          color: getIconColor(issue),
          type: 'octicon',
        }}
        hideChevron
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
      />
      <View style={styles.commentsContainer}>
        <Icon name="comment" type="octicon" size={18} color={colors.grey} />
        <Text style={styles.comments}>{issue.comments}</Text>
      </View>
    </View>
  </TouchableHighlight>
);
