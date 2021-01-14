import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import styled from 'styled-components';

import { colors, fonts, normalize } from 'config';
import { t, relativeTimeToNow } from 'utils';

type Props = {
  type: string,
  issue: Object,
  navigation: Object,
  locale: string,
};

const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding-right: 10;
  padding: 5px;
  border-bottom-width: 1;
  border-bottom-color: ${colors.greyLight};
`;

const CommentsContainer = styled.View`
  flex-direction: row;
  padding-top: 13;
`;

const Comments = styled.Text`
  padding-left: 5;
  font-size: ${normalize(12)}
  color: ${colors.greyBlue}
`;

const styles = StyleSheet.create({
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
    <Container>
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
      <CommentsContainer>
        <Icon name="comment" type="octicon" size={18} color={colors.grey} />
        <Comments>{issue.comments}</Comments>
      </CommentsContainer>
    </Container>
  </TouchableHighlight>
);
