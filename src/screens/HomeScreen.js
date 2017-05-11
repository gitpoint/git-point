/* eslint react/prop-types: 0 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  FlatList,
  Dimensions
} from 'react-native';

import LoadingUserListItem from '../components/LoadingUserListItem';
import UserListItem from '../components/UserListItem';

import moment from 'moment';

moment.updateLocale('en', {
    relativeTime : {
        past:   "%s",
        s:  "%ds",
        m:  "%dm",
        mm: "%dm",
        h:  "%dh",
        hh: "%dh",
        d:  "%dd",
        dd: "%dd",
        M:  "%dmo",
        MM: "%dmo",
        y:  "%dy",
        yy: "%dy"
    }
});

import {connect} from 'react-redux';
import {getUserEvents} from '../actions/userEvents';

import {ListItem} from 'react-native-elements';

import ViewContainer from '../components/ViewContainer';
import colors from '../config/colors';

const mapStateToProps = state => ({
  user: state.authUser.user,
  userEvents: state.userEvents.userEvents,
  isPending: state.userEvents.isPending,
});

const mapDispatchToProps = dispatch => ({
  getUserEvents: () => dispatch(getUserEvents('housseindjirdeh')),
});

class Home extends Component {
  componentWillMount() {
    this.getUserEvents();
  }

  getUserEvents = () => this.props.getUserEvents();

  getAction(userEvent) {
    const eventType = userEvent.type;

    switch (eventType) {
      case 'CommitCommentEvent':
        return 'commented on commit'; //may need rechecking (on commit for repository?)
      case 'CreateEvent':
        return `created ${userEvent.payload.ref_type}`;
      case 'DeleteEvent':
        return `deleted ${userEvent.payload.ref_type}`;
      case 'ForkEvent':
        return 'forked';
      case 'GollumEvent':
        return `${userEvent.payload.pages[0].action}`; // TODO: need to specify for multiple pages
      case 'IssueCommentEvent': {
        if (userEvent.payload.action === 'created') {
          return 'commented on issue';
        } else if (userEvent.payload.action === 'edited') {
          return 'edited their comment on issue'; //haven't witnessed
        } else if (userEvent.payload.action === 'deleted') {
          return 'removed their comment on issue'; //haven't witnessed
        }
      }
      case 'IssuesEvent':
        return `${userEvent.payload.action} issue`;
      case 'MemberEvent':
        return `${userEvent.payload.action} user`;
      // case 'OrgBlockEvent': return userEvent.payload.action;
      // case 'ProjectCardEvent': return `${userEvent.payload.action} project card`;
      // case 'ProjectColumnEvent': return userEvent.payload.action;
      // case 'ProjectEvent': return userEvent.payload.action;
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
            <Text style={styles.linkDescription}>{userEvent.payload.ref}</Text>
          );
        } else if (userEvent.payload.ref_type === 'repository') {
          return (
            <Text style={styles.linkDescription}>{userEvent.repo.name}</Text>
          );
        }
      }
      case 'DeleteEvent':
        return `${userEvent.payload.ref}`; //can only be branch or tag
      case 'ForkEvent':
        return (
          <Text style={styles.linkDescription}>{userEvent.repo.name}</Text>
        );
      case 'GollumEvent':
        return (
          <Text>
            the{' '}
            <Text style={styles.linkDescription}>{userEvent.repo.name}</Text>
            {' '}wiki
          </Text>
        ); // TODO: need to specify for multiple pages
      case 'IssueCommentEvent':
        return (
          <Text style={styles.linkDescription}>
            {userEvent.payload.issue.title}
          </Text>
        );
      case 'IssuesEvent':
        return (
          <Text style={styles.linkDescription}>
            {userEvent.payload.issue.title}
          </Text>
        );
      case 'MemberEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() =>
              this.props.navigation.navigate('Profile', {
                user: userEvent.payload.member,
              })}
          >
            {userEvent.payload.member.login}
          </Text>
        );
      case 'PublicEvent':
        return (
          <Text style={styles.linkDescription}>{userEvent.repo.name}</Text>
        );
      case 'PullRequestEvent':
        return (
          <Text style={styles.linkDescription}>
            {userEvent.repo.name}#{userEvent.payload.pull_request.number}
          </Text>
        );
      case 'PullRequestReviewEvent':
        return (
          <Text style={styles.linkDescription}>
            {userEvent.repo.name}#{userEvent.payload.pull_request.number}
          </Text>
        );
      case 'PullRequestReviewCommentEvent':
        return (
          <Text style={styles.linkDescription}>
            {userEvent.repo.name}#{userEvent.payload.pull_request.number}
          </Text>
        );
      case 'PushEvent':
        return (
          <Text style={styles.linkDescription}>{userEvent.payload.ref}</Text>
        );
      case 'ReleaseEvent':
        return `${userEvent.payload.release.id}`;
      case 'RepositoryEvent':
        return (
          <Text
            style={styles.linkDescription && userEvent.action !== 'deleted'}
          >
            {userEvent.repo.name}
          </Text>
        );
      case 'WatchEvent':
        return (
          <Text
            style={styles.linkDescription}
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
            <Text style={styles.linkDescription}>{userEvent.repo.name}</Text>
          );
        }
      }
      case 'DeleteEvent':
        return (
          <Text style={styles.linkDescription}>{userEvent.repo.name}</Text>
        );
      case 'ForkEvent':
        return (
          <Text
            style={styles.linkDescription}
            onPress={() =>
              this.props.navigation.navigate('Repository', {
                repository: userEvent.payload.forkee,
              })}
          >
            {userEvent.payload.forkee.full_name}
          </Text>
        );
      case 'IssueCommentEvent':
        return (
          <Text style={styles.linkDescription}>{userEvent.repo.name}</Text>
        );
      case 'IssuesEvent':
        return (
          <Text style={styles.linkDescription}>{userEvent.repo.name}</Text>
        );
      case 'PushEvent':
        return (
          <Text style={styles.linkDescription}>{userEvent.repo.name}</Text>
        );
    }
  }

  renderDescription(userEvent) {
    return (
      <Text style={styles.descriptionContainer}>
        <Text
          style={styles.linkDescription}
          onPress={() => this.props.navigation.navigate('Profile', {
            user: userEvent.actor,
          })}
        >
          {userEvent.actor.login}{' '}
        </Text>
        <Text>
          {this.getAction(userEvent)}{' '}
        </Text>
        {this.getItem(userEvent)}{this.getAction(userEvent) && ' '}
        {this.getConnector(userEvent)}{this.getItem(userEvent) && ' '}
        {this.getSecondItem(userEvent)}{this.getItem(userEvent) && this.getConnector(userEvent) && ' '}
        <Text style={styles.date}>{moment(userEvent.created_at).fromNow()}</Text>
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
    const { isPending, userEvents, navigation } = this.props;

    return (
      <ViewContainer
        barColor="dark">

        { isPending && userEvents.length === 0 &&
            [...Array(10)].map((item, i) => (
              <LoadingUserListItem key={i}/>
            ))
        }

        { userEvents.length > 0 &&
          <FlatList
            removeClippedSubviews={false}
            data={userEvents}
            onRefresh={this.getUserEvents}
            refreshing={isPending}
            keyExtractor={this.keyExtractor}
            renderItem={({item}) => (
              <UserListItem
                user={item.actor}
                title={this.renderDescription(item)}
                titleStyle={{fontSize: 14}}
                navigation={navigation}
                onlyImageNavigate
                icon={this.getIcon(item)}                
              />
            )}
          />
        }
      </ViewContainer>
    );
  }

  // <ListItem
  //               roundAvatar
  //               avatar={{uri: item.actor.avatar_url}}
  //               containerStyle={{width: window.width}}
  //               title={this.renderDescription(item)}
  //               rightIcon={{name: this.getIcon(item), type: 'octicon'}}
  //             />
  keyExtractor = (item) => {
    return item.id;
  }
}

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: colors.greyLight,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
    },
    elevation: 4,
  },
  appBar: {
    height: APPBAR_HEIGHT,
  },
  appBarTitle: {
    flex: 1,
    fontSize: Platform.OS === 'ios' ? 17 : 18,
    fontWeight: Platform.OS === 'ios' ? '600' : '500',
    color: colors.primaryDark,
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    marginHorizontal: 16,
    fontFamily: 'AvenirNext-Bold',
  },
  loadingContainer: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionContainer: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    color: colors.primaryDark,
    fontFamily: 'AvenirNext-Regular',
  },
  linkDescription: {
    fontFamily: 'AvenirNext-DemiBold',
  },
  date: {
    color: colors.greyDark,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
