/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';

import { LoadingUserListItem, UserListItem } from 'components';

import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    past: '%s',
    s: '%ds',
    m: '%dm',
    mm: '%dm',
    h: '%dh',
    hh: '%dh',
    d: '%dd',
    dd: '%dd',
    M: '%dmo',
    MM: '%dmo',
    y: '%dy',
    yy: '%dy'
  }
});

import { connect } from 'react-redux';
import { getUserEvents } from '../auth.action';

import { ViewContainer } from 'components';
import { emojifyText } from 'utils';

import { colors, normalize } from 'config';

const mapStateToProps = state => ({
  user: state.auth.user,
  userEvents: state.auth.events,
  isPendingEvents: state.auth.isPendingEvents
});

const mapDispatchToProps = dispatch => ({
  getUserEvents: user => dispatch(getUserEvents(user))
});

class Events extends Component {
  componentDidMount() {
    if (this.props.user.login) {
      this.getUserEvents(this.props.user);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.login && !this.props.user.login) {
      this.getUserEvents(nextProps.user);
    }
  }

  getUserEvents = (user = this.props.user) => {
    this.props.getUserEvents(user.login);
  };

  getAction(userEvent) {
    const eventType = userEvent.type;

    switch (eventType) {
      case 'CommitCommentEvent':
        return 'commented on commit';
      case 'CreateEvent':
        return `created ${userEvent.payload.ref_type}`;
      case 'DeleteEvent':
        return `deleted ${userEvent.payload.ref_type}`;
      case 'ForkEvent':
        return 'forked';
      case 'GollumEvent':
        return `${userEvent.payload.pages[0].action}`;
      case 'IssueCommentEvent': {
        const type = userEvent.payload.issue.pull_request
          ? 'pull request'
          : 'issue';

        if (userEvent.payload.action === 'created') {
          return `commented on ${type}`;
        } else if (userEvent.payload.action === 'edited') {
          return `edited their comment on ${type}`;
        } else if (userEvent.payload.action === 'deleted') {
          return `removed their comment on ${type}`;
        }
      }
      case 'IssuesEvent':
        return `${userEvent.payload.action} issue`;
      case 'MemberEvent':
        return `${userEvent.payload.action} user`;
      case 'PublicEvent':
        return 'open sourced';
      case 'PullRequestEvent':
        return `${userEvent.payload.action} pull request`;
      case 'PullRequestReviewEvent':
        return `${userEvent.payload.action} pull request review`;
      case 'PullRequestReviewCommentEvent': {
        if (userEvent.payload.action === 'created') {
          return 'commented on pull request';
        } else if (userEvent.payload.action === 'edited') {
          return 'edited their comment on pull request'; //haven't witnessed
        } else if (userEvent.payload.action === 'deleted') {
          return 'removed their comment on pull request'; //haven't witnessed
        }
      }
      case 'PushEvent':
        return 'pushed to';
      case 'ReleaseEvent':
        return `${userEvent.payload.action} release`;
      case 'RepositoryEvent':
        return userEvent.payload.action;
      case 'WatchEvent':
        return 'starred';
    }
  }

  getItem(userEvent) {
    const eventType = userEvent.type;

    switch (eventType) {
      case 'CreateEvent': {
        if (
          userEvent.payload.ref_type === 'branch' ||
          userEvent.payload.ref_type === 'tag'
        ) {
          return (
            <Text style={styles.linkBranchDescription}>
              {userEvent.payload.ref}
            </Text>
          );
        } else if (userEvent.payload.ref_type === 'repository') {
          return (
            <Text
              style={styles.linkDescription}
              onPress={() =>
                this.props.navigation.navigate('Repository', {
                  repository: {
                    ...userEvent.repo,
                    name: userEvent.repo.name.substring(
                      userEvent.repo.name.indexOf('/') + 1
                    )
                  }
                })}
            >
              {userEvent.repo.name}
            </Text>
          );
        }
      }
      case 'DeleteEvent':
        return (
          <Text style={styles.deletedLinkBranchDescription}>
            {userEvent.payload.ref}
          </Text>
        ); //can only be branch or tag
      case 'ForkEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() =>
              this.props.navigation.navigate('Repository', {
                repository: {
                  ...userEvent.repo,
                  name: userEvent.repo.name.substring(
                    userEvent.repo.name.indexOf('/') + 1
                  )
                }
              })}
          >
            {userEvent.repo.name}
          </Text>
        );
      case 'GollumEvent':
        return (
          <Text>
            the{' '}
            <Text
              style={styles.linkDescription}
              onPress={() =>
                this.props.navigation.navigate('Repository', {
                  repository: {
                    ...userEvent.repo,
                    name: userEvent.repo.name.substring(
                      userEvent.repo.name.indexOf('/') + 1
                    )
                  }
                })}
            >
              {userEvent.repo.name}
            </Text>
            {' '}wiki
          </Text>
        );
      case 'IssueCommentEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() =>
              this.props.navigation.navigate('Issue', {
                issue: userEvent.payload.issue
              })}
          >
            {userEvent.payload.issue.title}
          </Text>
        );
      case 'IssuesEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() =>
              this.props.navigation.navigate('Issue', {
                issue: userEvent.payload.issue
              })}
          >
            {userEvent.payload.issue.title}
          </Text>
        );
      case 'MemberEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() =>
              this.props.navigation.navigate('Profile', {
                user: userEvent.payload.member
              })}
          >
            {userEvent.payload.member.login}
          </Text>
        );
      case 'PublicEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() =>
              this.props.navigation.navigate('Repository', {
                repository: {
                  ...userEvent.repo,
                  name: userEvent.repo.name.substring(
                    userEvent.repo.name.indexOf('/') + 1
                  )
                }
              })}
          >
            {userEvent.repo.name}
          </Text>
        );
      case 'PullRequestEvent':
        return (
          <Text style={styles.linkDescription}>
            {userEvent.payload.pull_request.title}
          </Text>
        );
      case 'PullRequestReviewEvent':
        return (
          <Text style={styles.linkDescription}>
            {userEvent.payload.pull_request.title}
          </Text>
        );
      case 'PullRequestReviewCommentEvent':
        return (
          <Text style={styles.linkDescription}>
            {userEvent.payload.pull_request.title}
          </Text>
        );
      case 'PushEvent':
        return (
          <Text style={styles.linkDescription}>
            {userEvent.payload.ref.replace('refs/heads/', '')}
          </Text>
        );
      case 'ReleaseEvent':
        return `${userEvent.payload.release.id}`;
      case 'RepositoryEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() => {
              if (userEvent.action !== 'deleted') {
                this.props.navigation.navigate('Repository', {
                  repository: {
                    ...userEvent.repo,
                    name: userEvent.repo.name.substring(
                      userEvent.repo.name.indexOf('/') + 1
                    )
                  }
                });
              }
            }}
          >
            {userEvent.repo.name}
          </Text>
        );
      case 'WatchEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() =>
              this.props.navigation.navigate('Repository', {
                repository: {
                  ...userEvent.repo,
                  name: userEvent.repo.name.substring(
                    userEvent.repo.name.indexOf('/') + 1
                  )
                }
              })}
          >
            {userEvent.repo.name}
          </Text>
        );
    }
  }

  getConnector(userEvent) {
    const eventType = userEvent.type;

    switch (eventType) {
      case 'CreateEvent': {
        if (
          userEvent.payload.ref_type === 'branch' ||
          userEvent.payload.ref_type === 'tag'
        ) {
          return 'at';
        }
      }
      case 'DeleteEvent':
        return 'at';
      case 'ForkEvent':
        return 'to';
      case 'IssueCommentEvent':
        return 'at';
      case 'IssuesEvent':
        return 'at';
      case 'PushEvent':
        return 'at';
    }
  }

  getSecondItem(userEvent) {
    const eventType = userEvent.type;

    switch (eventType) {
      case 'CreateEvent': {
        if (
          userEvent.payload.ref_type === 'branch' ||
          userEvent.payload.ref_type === 'tag'
        ) {
          return (
            <Text
              style={styles.linkDescription}
              onPress={() =>
                this.props.navigation.navigate('Repository', {
                  repository: {
                    ...userEvent.repo,
                    name: userEvent.repo.name.substring(
                      userEvent.repo.name.indexOf('/') + 1
                    )
                  }
                })}
            >
              {userEvent.repo.name}
            </Text>
          );
        }
      }
      case 'DeleteEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() =>
              this.props.navigation.navigate('Repository', {
                repository: {
                  ...userEvent.repo,
                  name: userEvent.repo.name.substring(
                    userEvent.repo.name.indexOf('/') + 1
                  )
                }
              })}
          >
            {userEvent.repo.name}
          </Text>
        );
      case 'ForkEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() =>
              this.props.navigation.navigate('Repository', {
                repository: userEvent.payload.forkee
              })}
          >
            {userEvent.payload.forkee.full_name}
          </Text>
        );
      case 'IssueCommentEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() =>
              this.props.navigation.navigate('Repository', {
                repository: {
                  ...userEvent.repo,
                  name: userEvent.repo.name.substring(
                    userEvent.repo.name.indexOf('/') + 1
                  )
                }
              })}
          >
            {userEvent.repo.name}
          </Text>
        );
      case 'IssuesEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() =>
              this.props.navigation.navigate('Repository', {
                repository: {
                  ...userEvent.repo,
                  name: userEvent.repo.name.substring(
                    userEvent.repo.name.indexOf('/') + 1
                  )
                }
              })}
          >
            {userEvent.repo.name}
          </Text>
        );
      case 'PushEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() =>
              this.props.navigation.navigate('Repository', {
                repository: {
                  ...userEvent.repo,
                  name: userEvent.repo.name.substring(
                    userEvent.repo.name.indexOf('/') + 1
                  )
                }
              })}
          >
            {userEvent.repo.name}
          </Text>
        );
    }
  }

  renderDescription(userEvent) {
    return (
      <Text style={styles.descriptionContainer}>
        <Text
          style={styles.linkDescription}
          onPress={() =>
            this.props.navigation.navigate('Profile', {
              user: userEvent.actor
            })}
        >
          {userEvent.actor.login}{' '}
        </Text>
        <Text>
          {this.getAction(userEvent)}{' '}
        </Text>
        {this.getItem(userEvent)}{this.getAction(userEvent) && ' '}
        {this.getConnector(userEvent)}{this.getItem(userEvent) && ' '}
        {this.getSecondItem(userEvent)}
        {this.getItem(userEvent) && this.getConnector(userEvent) && ' '}
        <Text style={styles.date}>
          {moment(userEvent.created_at).fromNow()}
        </Text>
      </Text>
    );
  }

  getIcon(userEvent) {
    const eventType = userEvent.type;

    switch (eventType) {
      case 'CommitCommentEvent':
        return 'comment-discussion';
      case 'CreateEvent':
        return 'git-branch';
      case 'DeleteEvent':
        return 'trashcan';
      case 'ForkEvent':
        return 'repo-forked';
      case 'GollumEvent':
        return 'book';
      case 'IssueCommentEvent':
        return 'comment-discussion';
      case 'IssuesEvent':
        if (userEvent.action === 'reopened') {
          return 'issue-reopened';
        } else if (userEvent.action === 'closed') {
          return 'issue-closed';
        } else {
          return 'issue-opened';
        }
      case 'MemberEvent':
        return 'person';
      case 'PublicEvent':
        return 'globe';
      case 'PullRequestEvent':
        return 'git-pull-request';
      case 'PullRequestReviewEvent':
        return 'git-pull-request';
      case 'PullRequestReviewCommentEvent':
        return 'comment-discussion';
      case 'PushEvent':
        return 'git-commit';
      case 'ReleaseEvent':
        return 'tag';
      case 'RepositoryEvent':
        return 'repo';
      case 'WatchEvent':
        return 'star';
    }
  }

  render() {
    const { isPendingEvents, userEvents, navigation } = this.props;
    const linebreaksPattern = /(\r\n|\n|\r)/gm;
    let content;
    if (isPendingEvents && !userEvents) {
      content = [...Array(15)].map((item, i) => (
        <LoadingUserListItem key={i} />
      ));
    } else if (!isPendingEvents && userEvents && userEvents.length === 0) {
      content = (
        <View style={styles.textContainer}>
          <Text style={styles.noneTitle}>
            Welcome! This is your news feed - it'll help you keep up with recent activity on repositories you watch and people you follow.
          </Text>
        </View>
      );
    } else {
      content = (
        <FlatList
          removeClippedSubviews={false}
          data={userEvents}
          onRefresh={this.getUserEvents}
          refreshing={isPendingEvents}
          keyExtractor={this.keyExtractor}
          renderItem={({ item }) => (
            <View>
              <UserListItem
                user={item.actor}
                title={this.renderDescription(item)}
                titleStyle={{ fontSize: normalize(12) }}
                navigation={navigation}
                onlyImageNavigate
                noBorderBottom={
                  item.type === 'IssueCommentEvent' ||
                    item.type === 'PullRequestReviewCommentEvent'
                }
                icon={this.getIcon(item)}
              />

              {(item.type === 'IssueCommentEvent' ||
                item.type === 'PullRequestReviewCommentEvent') &&
                <View style={styles.subtitleContainer}>
                  <Text numberOfLines={3} style={styles.subtitle}>
                    {emojifyText(item.payload.comment.body.replace(linebreaksPattern, ' '))}
                  </Text>
                </View>}
            </View>
          )}
        />
      );
    }
    return (
      <ViewContainer>
        {content}
      </ViewContainer>
    );
  }

  keyExtractor = item => {
    return item.id;
  };
}

const styles = StyleSheet.create({
  descriptionContainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    color: colors.primaryDark,
    fontFamily: 'AvenirNext-Regular'
  },
  linkDescription: {
    fontFamily: 'AvenirNext-DemiBold'
  },
  linkBranchDescription: {
    fontFamily: 'Menlo'
  },
  deletedLinkBranchDescription: {
    color: colors.greyDarkest,
    fontFamily: 'Menlo'
  },
  date: {
    color: colors.greyDark
  },
  subtitleContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1
  },
  subtitle: {
    color: colors.greyDark,
    fontSize: normalize(11),
    marginTop: 1,
    fontWeight: '600'
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15
  },
  noneTitle: {
    fontSize: normalize(14),
    textAlign: 'center',
    fontFamily: 'AvenirNext-Medium'
  }
});

export const EventsScreen = connect(mapStateToProps, mapDispatchToProps)(
  Events
);
