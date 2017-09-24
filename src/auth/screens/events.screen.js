/* eslint react/prop-types: 0 */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import moment from 'moment/min/moment-with-locales.min';

import { LoadingUserListItem, UserListItem, ViewContainer } from 'components';
import { colors, fonts, normalize } from 'config';
import { emojifyText, translate } from 'utils';
import { getUserEvents } from '../auth.action';

const mapStateToProps = state => ({
  user: state.auth.user,
  userEvents: state.auth.events,
  language: state.auth.language,
  isPendingEvents: state.auth.isPendingEvents,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserEvents,
    },
    dispatch
  );

const styles = StyleSheet.create({
  descriptionContainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    color: colors.primaryDark,
    ...fonts.fontPrimaryLight,
  },
  linkDescription: {
    ...fonts.fontPrimarySemiBold,
  },
  linkBranchDescription: {
    ...fonts.fontCode,
  },
  deletedLinkBranchDescription: {
    color: colors.greyDarkest,
    ...fonts.fontCode,
  },
  date: {
    color: colors.greyDark,
  },
  subtitleContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  subtitle: {
    color: colors.greyDark,
    fontSize: normalize(11),
    marginTop: 1,
    ...fonts.fontPrimarySemiBold,
    marginLeft: 39,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  noneTitle: {
    fontSize: normalize(14),
    textAlign: 'center',
    ...fonts.fontPrimary,
  },
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

  getAction = userEvent => {
    const { language } = this.props;
    const eventType = userEvent.type;
    /* eslint-disable prefer-const */
    let { action, ref_type: object } = userEvent.payload;

    switch (eventType) {
      case 'CommitCommentEvent':
        return translate('auth.events.commitCommentEvent', language);
      case 'CreateEvent':
        return translate('auth.events.createEvent', language, {
          object: translate(`auth.events.objects.${object}`, language),
        });
      case 'DeleteEvent':
        return translate('auth.events.deleteEvent', language, {
          object: translate(`auth.events.objects.${object}`, language),
        });
      case 'ForkEvent':
        return translate('auth.events.actions.forked', language);
      case 'GollumEvent':
        action = userEvent.payload.pages[0].action;

        return translate(`auth.events.actions.${action}`, language);
      case 'IssueCommentEvent': {
        const eventsByActions = {
          created: 'issueCommentEvent',
          edited: 'issueEditedEvent',
          deleted: 'issueRemovedEvent',
        };
        const event = eventsByActions[action];

        if (!event) {
          return null;
        }

        if (action === 'created') {
          action = 'commented';
        }

        const issueData = {
          type: userEvent.payload.issue.pull_request
            ? translate('auth.events.types.pullRequest', language)
            : translate('auth.events.types.issue', language),
          action: translate(`auth.events.actions.${action}`, language),
        };

        return translate(`auth.events.${event}`, language, issueData);
      }
      case 'IssuesEvent':
        return translate('auth.events.issuesEvent', language, {
          action: translate(`auth.events.actions.${action}`, language),
        });
      case 'MemberEvent':
        return translate(`auth.events.actions.${action}`, language);
      case 'PublicEvent':
        return translate('auth.events.publicEvent.action', language);
      case 'PullRequestEvent':
        return translate('auth.events.pullRequestEvent', language, {
          action: translate(`auth.events.actions.${action}`, language),
        });
      case 'PullRequestReviewEvent':
        return translate('auth.events.pullRequestReviewEvent', language, {
          payload: translate(`auth.events.actions.${action}`, language),
        });
      case 'PullRequestReviewCommentEvent': {
        if (action === 'created') {
          return translate(
            'auth.events.pullRequestReviewCommentEvent',
            language,
            {
              action: translate('auth.events.actions.commented', language),
            }
          );
        } else if (action === 'edited') {
          return translate(
            'auth.events.pullRequestReviewEditedEvent',
            language,
            {
              action: translate(`auth.events.actions.${action}`, language),
            }
          );
        } else if (action === 'deleted') {
          return translate(
            'auth.events.pullRequestReviewDeletedEvent',
            language,
            {
              action: translate(`auth.events.actions.${action}`, language),
            }
          );
        }

        return null;
      }
      case 'PushEvent':
        return translate('auth.events.actions.pushedTo', language);
      case 'ReleaseEvent':
        return translate('auth.events.releaseEvent', language, {
          action: translate(`auth.events.actions.${action}`, language),
        });
      case 'RepositoryEvent':
        return translate(`auth.events.actions.${action}`, language);
      case 'WatchEvent':
        return translate('auth.events.actions.starred', language);
      default:
        return null;
    }
  };

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
              onPress={() => this.navigateToRepository(userEvent)}
            >
              {userEvent.repo.name}
            </Text>
          );
        }

        return null;
      }
      case 'DeleteEvent':
        return (
          <Text style={styles.deletedLinkBranchDescription}>
            {userEvent.payload.ref}
          </Text>
        ); // can only be branch or tag
      case 'ForkEvent':
      case 'WatchEvent':
      case 'PublicEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() => this.navigateToRepository(userEvent)}
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
              onPress={() => this.navigateToRepository(userEvent)}
            >
              {userEvent.repo.name}
            </Text>{' '}
            wiki
          </Text>
        );
      case 'IssueCommentEvent':
      case 'IssuesEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() => this.navigateToIssue(userEvent)}
          >
            {userEvent.payload.issue.title}
          </Text>
        );
      case 'MemberEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() => this.navigateToProfile(userEvent)}
          >
            {userEvent.payload.member.login}
          </Text>
        );
      case 'PullRequestEvent':
      case 'PullRequestReviewEvent':
      case 'PullRequestReviewCommentEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() => this.navigateToIssue(userEvent)}
          >
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
                this.navigateToRepository(userEvent);
              }
            }}
          >
            {userEvent.repo.name}
          </Text>
        );
      default:
        return null;
    }
  }

  getConnector = userEvent => {
    const { language } = this.props;
    const eventType = userEvent.type;

    switch (eventType) {
      case 'CreateEvent': {
        if (
          userEvent.payload.ref_type === 'branch' ||
          userEvent.payload.ref_type === 'tag'
        ) {
          return 'at';
        }

        return null;
      }
      case 'ForkEvent':
      case 'MemberEvent':
        return translate('auth.events.toConnector', language);
      case 'DeleteEvent':
      case 'IssueCommentEvent':
      case 'IssuesEvent':
      case 'PushEvent':
      case 'PullRequestEvent':
      case 'PullRequestReviewCommentEvent':
        return translate('auth.events.atConnector', language);
      case 'PublicEvent':
        return translate('auth.events.publicEvent.connector', language);
      default:
        return null;
    }
  };

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
              onPress={() => this.navigateToRepository(userEvent)}
            >
              {userEvent.repo.name}
            </Text>
          );
        }

        return null;
      }
      case 'DeleteEvent':
      case 'IssueCommentEvent':
      case 'IssuesEvent':
      case 'PushEvent':
      case 'PullRequestEvent':
      case 'MemberEvent':
      case 'PullRequestReviewCommentEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() => this.navigateToRepository(userEvent)}
          >
            {userEvent.repo.name}
          </Text>
        );
      case 'ForkEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() => this.navigateToRepository(userEvent, true)}
          >
            {userEvent.payload.forkee.full_name}
          </Text>
        );
      default:
        return null;
    }
  }

  getIcon = userEvent => {
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
        }

        return 'issue-opened';
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
      default:
        return null;
    }
  };

  formatPullRequestObject = issue => ({
    ...issue,
    url: issue.issue_url,
    pull_request: {
      diff_url: issue.diff_url,
      html_url: issue.html_url,
      patch_url: issue.patch_url,
      url: issue.url,
    },
  });

  navigateToRepository = (userEvent, isForkEvent) => {
    this.props.navigation.navigate('Repository', {
      repository: !isForkEvent
        ? {
            ...userEvent.repo,
            name: userEvent.repo.name.substring(
              userEvent.repo.name.indexOf('/') + 1
            ),
          }
        : userEvent.payload.forkee,
    });
  };

  navigateToIssue = userEvent => {
    this.props.navigation.navigate('Issue', {
      issue:
        userEvent.payload.issue ||
        this.formatPullRequestObject(userEvent.payload.pull_request),
      isPR: !!userEvent.payload.pull_request,
      language: this.props.language,
    });
  };

  navigateToProfile = (userEvent, isActor) => {
    this.props.navigation.navigate('Profile', {
      user: !isActor ? userEvent.payload.member : userEvent.actor,
    });
  };

  keyExtractor = item => {
    return item.id;
  };

  renderDescription(userEvent) {
    return (
      <Text style={styles.descriptionContainer}>
        <Text
          style={styles.linkDescription}
          onPress={() => this.navigateToProfile(userEvent, true)}
        >
          {userEvent.actor.login}{' '}
        </Text>
        <Text>
          {this.getAction(userEvent)}{' '}
        </Text>
        {this.getItem(userEvent)}
        {this.getAction(userEvent) && ' '}
        {this.getConnector(userEvent)}
        {this.getItem(userEvent) && ' '}
        {this.getSecondItem(userEvent)}
        {this.getItem(userEvent) && this.getConnector(userEvent) && ' '}
        <Text style={styles.date}>
          {moment(userEvent.created_at).fromNow()}
        </Text>
      </Text>
    );
  }

  render() {
    const { isPendingEvents, userEvents, language, navigation } = this.props;
    const linebreaksPattern = /(\r\n|\n|\r)/gm;
    let content;

    if (isPendingEvents && !userEvents) {
      content = [...Array(15)].map((item, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <LoadingUserListItem key={index} />;
      });
    } else if (!isPendingEvents && userEvents && userEvents.length === 0) {
      content = (
        <View style={styles.textContainer}>
          <Text style={styles.noneTitle}>
            {translate('auth.events.welcomeMessage', language)}
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
          renderItem={({ item }) =>
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
                    {emojifyText(
                      item.payload.comment.body.replace(linebreaksPattern, ' ')
                    )}
                  </Text>
                </View>}
            </View>}
        />
      );
    }

    return (
      <ViewContainer>
        {content}
      </ViewContainer>
    );
  }
}

export const EventsScreen = connect(mapStateToProps, mapDispatchToProps)(
  Events
);
