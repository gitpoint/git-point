/* eslint react/prop-types: 0 */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';

import { LoadingUserListItem, UserListItem, ViewContainer } from 'components';
import { colors, fonts, normalize } from 'config';
import { emojifyText, t, relativeTimeToNow } from 'utils';
import { getNotificationsCount } from 'notifications';
import { RestClient } from 'api';

const mapStateToProps = state => {
  const {
    auth: { user, locale },
    pagination: { ACTIVITY_GET_EVENTS_RECEIVED },
    entities: { events },
  } = state;

  const userEventsPagination = ACTIVITY_GET_EVENTS_RECEIVED[user.login] || {
    ids: [],
  };
  const userEvents = userEventsPagination.ids.map(id => events[id]);

  return {
    user,
    userEventsPagination,
    userEvents,
    locale,
  };
};

const mapDispatchToProps = {
  getUserEvents: RestClient.activity.getEventsReceived,
  getNotificationsCount,
};

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
    this.props.getUserEvents(user.login, { forceRefresh: true });
    this.props.getNotificationsCount(accessToken);
  };

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

    return <Text>Unknown event type: {userEvent.type}</Text>;
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
      case 'WatchEvent':
        return 'star';
      default:
        return null;
    }
  };

  handleCommitCommentEvent(userEvent) {
    const actor = this.getActorLink(userEvent);

    return t('{actor} commented on commit', this.props.locale, {
      actor,
    });
  }

  handleCreateEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);
    const ref = userEvent.payload.ref && (
      <LinkBranchDescription>{userEvent.payload.ref}</LinkBranchDescription>
    );

    switch (userEvent.payload.ref_type) {
      case 'branch':
        return t('{actor} created branch {ref} at {repo}', this.props.locale, {
          actor,
          ref,
          repo,
        });
      case 'tag':
        return t('{actor} created tag {ref} at {repo}', this.props.locale, {
          actor,
          ref,
          repo,
        });
      case 'repository':
        return t('{actor} created repository {repo}', this.props.locale, {
          actor,
          repo,
        });

      default:
        return null;
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
        return t('{actor} deleted branch {ref} at {repo}', this.props.locale, {
          actor,
          ref,
          repo,
        });
      case 'tag':
        return t('{actor} deleted tag {ref} at {repo}', this.props.locale, {
          actor,
          ref,
          repo,
        });
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

    return t('{actor} forked {repo} at {fork}', this.props.locale, {
      actor,
      repo,
      fork,
    });
  }

  handleGollumEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);
    const page = userEvent.payload.pages[0];

    switch (page.action) {
      case 'created':
        return t('{actor} created the {repo} wiki', this.props.locale, {
          actor,
          repo,
        });

      case 'edited':
        return t('{actor} edited the {repo} wiki', this.props.locale, {
          actor,
          repo,
        });

      default:
        return null;
    }
  }

  handleIssueCommentEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);
    const issue = this.getIssueLink(userEvent);

    switch (userEvent.payload.action) {
      case 'created':
        if (userEvent.payload.issue.pull_request) {
          return t(
            '{actor} commented on pull request {issue} at {repo}',
            this.props.locale,
            {
              actor,
              issue,
              repo,
            }
          );
        }

        return t(
          '{actor} commented on issue {issue} at {repo}',
          this.props.locale,
          {
            actor,
            issue,
            repo,
          }
        );

      default:
        return null;
    }
  }

  handleIssuesEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);
    const issue = this.getIssueLink(userEvent);

    switch (userEvent.payload.action) {
      case 'opened':
        return t('{actor} opened issue {issue} at {repo}', this.props.locale, {
          actor,
          issue,
          repo,
        });

      case 'reopened':
        return t(
          '{actor} reopened issue {issue} at {repo}',
          this.props.locale,
          {
            actor,
            issue,
            repo,
          }
        );

      case 'closed':
        return t('{actor} closed issue {issue} at {repo}', this.props.locale, {
          actor,
          issue,
          repo,
        });

      default:
        return null;
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
        return t('{actor} edited {member} at {repo}', this.props.locale, {
          actor,
          member,
          repo,
        });

      case 'deleted':
        return t('{actor} removed {member} at {repo}', this.props.locale, {
          actor,
          member,
          repo,
        });

      case 'added':
        return t('{actor} added {member} at {repo}', this.props.locale, {
          actor,
          member,
          repo,
        });

      default:
        return null;
    }
  }

  handlePublicEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);

    return t('{actor} made {repo} public', this.props.locale, {
      actor,
      repo,
    });
  }

  handlePullRequestEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);
    const pr = this.getPullRequestLink(userEvent);

    switch (userEvent.payload.action) {
      case 'opened':
        return t(
          '{actor} opened pull request {pr} at {repo}',
          this.props.locale,
          {
            actor,
            pr,
            repo,
          }
        );

      case 'reopened':
        return t(
          '{actor} reopened pull request {pr} at {repo}',
          this.props.locale,
          {
            actor,
            pr,
            repo,
          }
        );
      case 'closed':
        if (userEvent.payload.pull_request.merged) {
          return t(
            '{actor} merged pull request {pr} at {repo}',
            this.props.locale,
            {
              actor,
              pr,
              repo,
            }
          );
        }

        return t(
          '{actor} closed pull request {pr} at {repo}',
          this.props.locale,
          {
            actor,
            pr,
            repo,
          }
        );

      default:
        return null;
    }
  }

  handlePullRequestReviewCommentEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);
    const pr = this.getPullRequestLink(userEvent);

    switch (userEvent.payload.action) {
      case 'created':
        return t(
          '{actor} commented on pull request {pr} at {repo}',
          this.props.locale,
          {
            actor,
            pr,
            repo,
          }
        );

      default:
        return null;
    }
  }

  handlePushEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);
    const ref = (
      <LinkBranchDescription>
        {userEvent.payload.ref.replace('refs/heads/', '')}
      </LinkBranchDescription>
    );

    return t('{actor} pushed to {ref} at {repo}', this.props.locale, {
      actor,
      ref,
      repo,
    });
  }

  handleRelease(userEvent) {
    const actor = this.getActorLink(userEvent);
    const id = userEvent.payload.release.id;

    switch (userEvent.payload.action) {
      case 'published':
        return t('{actor} published release {id}', this.props.locale, {
          actor,
          id,
        });

      default:
        return null;
    }
  }

  handleWatchEvent(userEvent) {
    const actor = this.getActorLink(userEvent);
    const repo = this.getRepoLink(userEvent);

    return t('{actor} starred {repo}', this.props.locale, {
      actor,
      repo,
    });
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
        {this.getDescription(userEvent)}{' '}
        <Datestamp>{relativeTimeToNow(userEvent.created_at)}</Datestamp>
      </DescriptionContainer>
    );
  }

  renderFooter = () => {
    if (this.props.userEventsPagination.nextPageUrl === null) {
      return null;
    }

    return (
      <View
        style={{
          paddingVertical: 20,
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    const {
      user,
      userEventsPagination,
      userEvents,
      locale,
      navigation,
    } = this.props;
    const linebreaksPattern = /(\r\n|\n|\r)/gm;
    let content;

    if (userEventsPagination.isFetching && !userEvents) {
      content = [...Array(15)].map((item, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <LoadingUserListItem key={index} />;
      });
    } else if (
      !userEventsPagination.isFetching &&
      userEvents &&
      userEvents.length === 0
    ) {
      content = (
        <TextContainer>
          <NoneTitle>{t('auth.events.welcomeMessage', locale)}</NoneTitle>
        </TextContainer>
      );
    } else {
      content = (
        <FlatList
          removeClippedSubviews={false}
          data={userEvents}
          onRefresh={this.getUserEvents}
          refreshing={!userEvents && userEventsPagination.isFetching}
          onEndReached={() =>
            this.props.getUserEvents(user.login, { loadMore: true })
          }
          onEndReachedThreshold={0.5}
          ListFooterComponent={this.renderFooter}
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
