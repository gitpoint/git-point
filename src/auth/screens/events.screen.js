/* eslint react/prop-types: 0 */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatList, View } from 'react-native';
import { Trans } from '@lingui/react';

import { LoadingUserListItem, UserListItem, ViewContainer } from 'components';
import { colors, fonts, normalize } from 'config';
import { emojifyText, translate, relativeTimeToNow } from 'utils';
import { getUserEvents } from 'auth';
import { getNotificationsCount } from 'notifications';

const T = props => props.c;

const mapStateToProps = state => ({
  user: state.auth.user,
  userEvents: state.auth.events,
  locale: state.auth.locale,
  isPendingEvents: state.auth.isPendingEvents,
  accessToken: state.auth.accessToken,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserEvents,
      getNotificationsCount,
    },
    dispatch
  );

const DescriptionContainer = styled.Text`
  justify-content: center;
  flex: 1;
  margin-left: 10;
  color: ${colors.primaryDark};
  ${fonts.fontPrimaryLight};
`;

const LinkDescription = styled.Text`
  ${fonts.fontPrimarySemiBold};
`;

const LinkBranchDescription = styled.Text`
  background-color: ${colors.codeChunkBlue};
  color: ${colors.blue};
  ${fonts.fontCode};
  font-size: ${normalize(11)};
`;

const DeletedLinkBranchDescription = styled.Text`
  background-color: ${colors.greyVeryLight};
  color: ${colors.greyDarkest};
  ${fonts.fontCode};
  font-size: ${normalize(11)};
`;

const Datestamp = styled.Text`
  color: ${colors.greyDark};
`;

const SubtitleContainer = styled.View`
  padding-horizontal: 15;
  padding-bottom: 10;
  border-bottom-color: ${colors.greyLight};
  border-bottom-width: 1;
`;

const Subtitle = styled.Text`
  color: ${colors.greyDark};
  font-size: ${normalize(11)};
  margin-top: 1;
  ${fonts.fontPrimarySemiBold};
  margin-left: 39;
`;

const TextContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-horizontal: 15;
`;

const NoneTitle = styled.Text`
  font-size: ${normalize(14)};
  text-align: center;
  ${fonts.fontPrimary};
`;

class Events extends Component {
  componentDidMount() {
    this.getUserEvents();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.login && !this.props.user.login) {
      this.getUserEvents(nextProps);
    }
  }

  getUserEvents = ({ user, accessToken } = this.props) => {
    this.props.getUserEvents(user.login);
    this.props.getNotificationsCount(accessToken);
  };

  getAction = userEvent => {
    const { locale } = this.props;
    const eventType = userEvent.type;
    /* eslint-disable prefer-const */
    let { action, ref_type: object } = userEvent.payload;

    switch (eventType) {
      case 'DeleteEvent':
        return translate('auth.events.deleteEvent', locale, {
          object: translate(`auth.events.objects.${object}`, locale),
        });
      case 'IssuesEvent':
        return translate('auth.events.issuesEvent', locale, {
          action: translate(`auth.events.actions.${action}`, locale),
        });
      case 'PublicEvent':
        return translate('auth.events.publicEvent.action', locale);
      case 'PullRequestReviewEvent':
        return translate('auth.events.pullRequestReviewEvent', locale, {
          payload: translate(`auth.events.actions.${action}`, locale),
        });
      case 'PullRequestReviewCommentEvent': {
        if (action === 'created') {
          return translate(
            'auth.events.pullRequestReviewCommentEvent',
            locale,
            {
              action: translate('auth.events.actions.commented', locale),
            }
          );
        } else if (action === 'edited') {
          return translate('auth.events.pullRequestReviewEditedEvent', locale, {
            action: translate(`auth.events.actions.${action}`, locale),
          });
        } else if (action === 'deleted') {
          return translate(
            'auth.events.pullRequestReviewDeletedEvent',
            locale,
            {
              action: translate(`auth.events.actions.${action}`, locale),
            }
          );
        }

        return null;
      }
      case 'ReleaseEvent':
        return translate('auth.events.releaseEvent', locale, {
          action: translate(`auth.events.actions.${action}`, locale),
        });
      case 'RepositoryEvent':
        return translate(`auth.events.actions.${action}`, locale);
      default:
        return null;
    }
  };

  getItem(userEvent) {
    const eventType = userEvent.type;

    switch (eventType) {
      case 'DeleteEvent':
        return (
          <DeletedLinkBranchDescription>
            {' '}
            {userEvent.payload.ref}{' '}
          </DeletedLinkBranchDescription>
        ); // can only be branch or tag
      case 'PublicEvent':
        return (
          <LinkDescription onPress={() => this.navigateToRepository(userEvent)}>
            {userEvent.repo.name}
          </LinkDescription>
        );
      case 'IssuesEvent':
        return (
          <LinkDescription onPress={() => this.navigateToIssue(userEvent)}>
            {userEvent.payload.issue.title}
          </LinkDescription>
        );

      case 'PullRequestReviewEvent':
      case 'PullRequestReviewCommentEvent':
        return (
          <LinkDescription onPress={() => this.navigateToIssue(userEvent)}>
            {userEvent.payload.pull_request.title}
          </LinkDescription>
        );

      case 'ReleaseEvent':
        return `${userEvent.payload.release.id}`;
      case 'RepositoryEvent':
        return (
          <LinkDescription
            onPress={() => {
              if (userEvent.action !== 'deleted') {
                this.navigateToRepository(userEvent);
              }
            }}
          >
            {userEvent.repo.name}
          </LinkDescription>
        );
      default:
        return null;
    }
  }

  getConnector = userEvent => {
    const { locale } = this.props;
    const eventType = userEvent.type;

    switch (eventType) {
      case 'DeleteEvent':
      case 'IssuesEvent':
      case 'PullRequestReviewCommentEvent':
        return translate('auth.events.atConnector', locale);
      case 'PublicEvent':
        return translate('auth.events.publicEvent.connector', locale);
      default:
        return null;
    }
  };

  getSecondItem(userEvent) {
    const eventType = userEvent.type;

    switch (eventType) {
      case 'DeleteEvent':
      case 'IssueCommentEvent':
      case 'IssuesEvent':
      case 'PullRequestReviewCommentEvent':
        return (
          <LinkDescription onPress={() => this.navigateToRepository(userEvent)}>
            {userEvent.repo.name}
          </LinkDescription>
        );
      default:
        return null;
    }
  }

  getIssueLink(userEvent) {
    return (
      <LinkDescription onPress={() => this.navigateToIssue(userEvent)}>
        {userEvent.payload.issue.title}
      </LinkDescription>
    );
  }

  getPullRequestLink(userEvent) {
    return (
      <LinkDescription onPress={() => this.navigateToIssue(userEvent)}>
        {userEvent.payload.pull_request.title}
      </LinkDescription>
    );
  }

  getRepoLink(userEvent) {
    return (
      <LinkDescription onPress={() => this.navigateToRepository(userEvent)}>
        {userEvent.repo.name}
      </LinkDescription>
    );
  }

  getActorLink(userEvent) {
    return (
      <LinkDescription onPress={() => this.navigateToProfile(userEvent, true)}>
        {userEvent.actor.login}
      </LinkDescription>
    );
  }

  getDescription(userEvent) {
    const handler = `handle${userEvent.type}`;

    if (typeof this[handler] === 'function') {
      return this[handler](userEvent);
    }

    return <Trans>Unknown event type: {userEvent.type}</Trans>;
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

  handleCommitCommentEvent(userEvent) {
    const actor = this.getActorLink(userEvent);

    return (
      <Trans>
        <T c={actor} /> commented on commit
      </Trans>
    );
  }

  handleCreateEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);
    const ref = userEvent.payload.ref && (
      <LinkBranchDescription>{userEvent.payload.ref}</LinkBranchDescription>
    );

    switch (userEvent.payload.ref_type) {
      case 'branch':
        return (
          <Trans>
            <T c={actor} /> created branch <T c={ref} /> at <T c={repo} />
          </Trans>
        );
      case 'tag':
        return (
          <Trans>
            <T c={actor} /> created tag <T c={ref} /> at <T c={repo} />
          </Trans>
        );
      default:
        return (
          <Trans>
            <T c={actor} /> created repository <T c={repo} />
          </Trans>
        );
    }
  }

  handleDeleteEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);
    const ref = userEvent.payload.ref && (
      <DeletedLinkBranchDescription>
        {userEvent.payload.ref}
      </DeletedLinkBranchDescription>
    );

    switch (userEvent.payload.ref_type) {
      case 'branch':
        return (
          <Trans>
            <T c={actor} /> deleted branch <T c={ref} /> at <T c={repo} />
          </Trans>
        );
      case 'tag':
        return (
          <Trans>
            <T c={actor} /> deleted tag <T c={ref} /> at <T c={repo} />
          </Trans>
        );
      default:
        return null;
    }
  }

  handleForkEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);
    const fork = (
      <LinkDescription
        onPress={() => this.navigateToRepository(userEvent, true)}
      >
        {userEvent.payload.forkee.full_name}
      </LinkDescription>
    );

    return (
      <Trans>
        <T c={actor} /> forked <T c={repo} /> at <T c={fork} />
      </Trans>
    );
  }

  handleGollumEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);
    const page = userEvent.payload.pages[0];

    switch (page.action) {
      case 'created':
        return (
          <Trans>
            <T c={actor} /> created the <T c={repo} /> wiki
          </Trans>
        );

      case 'edited':
        return (
          <Trans>
            <T c={actor} /> edited the <T c={repo} /> wiki
          </Trans>
        );

      default:
        return null;
    }
  }

  handleIssueCommentEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);
    const issue = this.getIssueLink(userEvent);

    switch (userEvent.payload.action) {
      case 'edited':
        return (
          <Trans>
            <T c={actor} /> edit a comment on <T c={issue} /> at <T c={repo} />
          </Trans>
        );
      case 'deleted':
        return (
          <Trans>
            <T c={actor} /> deleted a comment on <T c={issue} /> at{' '}
            <T c={repo} />
          </Trans>
        );

      default:
        if (userEvent.payload.issue.pull_request) {
          return (
            <Trans>
              <T c={actor} /> commented on pull request <T c={issue} /> at{' '}
              <T c={repo} />
            </Trans>
          );
        }

        return (
          <Trans>
            <T c={actor} /> commented on issue <T c={issue} /> at <T c={repo} />
          </Trans>
        );
    }
  }

  handleMemberEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);
    const member = userEvent.payload.member && (
      <LinkDescription onPress={() => this.navigateToProfile(userEvent)}>
        {userEvent.payload.member.login}
      </LinkDescription>
    );

    switch (userEvent.payload.action) {
      case 'edited':
        return (
          <Trans>
            <T c={actor} /> edited <T c={member} /> permissions in{' '}
            <T c={repo} />
          </Trans>
        );

      case 'deleted':
        return (
          <Trans>
            <T c={actor} /> removed <T c={member} /> from <T c={repo} />
          </Trans>
        );

      default:
        return (
          <Trans>
            <T c={actor} /> added <T c={member} /> to <T c={repo} />
          </Trans>
        );
    }
  }

  handlePullRequestEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);
    const pr = this.getPullRequestLink(userEvent);

    switch (userEvent.payload.action) {
      case 'opened':
        return (
          <Trans>
            <T c={actor} /> opened pull request <T c={pr} /> in <T c={repo} />
          </Trans>
        );
      case 'reopened':
        return (
          <Trans>
            <T c={actor} /> reopened pull request <T c={pr} /> in <T c={repo} />
          </Trans>
        );
      case 'closed':
        if (userEvent.payload.pull_request.merged) {
          return (
            <Trans>
              <T c={actor} /> merged pull request <T c={pr} /> in <T c={repo} />
            </Trans>
          );
        }

        return (
          <Trans>
            <T c={actor} /> closed pull request <T c={pr} /> in <T c={repo} />
          </Trans>
        );

      default:
        return null;
    }
  }

  handlePushEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);

    return (
      <Trans>
        <T c={actor} /> pushed to{' '}
        <LinkBranchDescription>
          {' '}
          {userEvent.payload.ref.replace('refs/heads/', '')}{' '}
        </LinkBranchDescription>{' '}
        in <T c={repo} />
      </Trans>
    );
  }

  handleWatchEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);

    return (
      <Trans>
        <T c={actor} /> starred <T c={repo} />
      </Trans>
    );
  }

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
      locale: this.props.locale,
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
      <DescriptionContainer>
        {this.getDescription(userEvent)}
        <Datestamp>{relativeTimeToNow(userEvent.created_at)}</Datestamp>
      </DescriptionContainer>
    );
  }

  render() {
    const { isPendingEvents, userEvents, locale, navigation } = this.props;
    const linebreaksPattern = /(\r\n|\n|\r)/gm;
    let content;

    if (isPendingEvents && !userEvents) {
      content = [...Array(15)].map((item, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <LoadingUserListItem key={index} />;
      });
    } else if (!isPendingEvents && userEvents && userEvents.length === 0) {
      content = (
        <TextContainer>
          <NoneTitle>
            {translate('auth.events.welcomeMessage', locale)}
          </NoneTitle>
        </TextContainer>
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
                item.type === 'PullRequestReviewCommentEvent') && (
                <SubtitleContainer>
                  <Subtitle numberOfLines={3}>
                    {emojifyText(
                      item.payload.comment.body.replace(linebreaksPattern, ' ')
                    )}
                  </Subtitle>
                </SubtitleContainer>
              )}
            </View>
          )}
          extraData={this.props.locale}
        />
      );
    }

    return <ViewContainer>{content}</ViewContainer>;
  }
}

export const EventsScreen = connect(mapStateToProps, mapDispatchToProps)(
  Events
);
