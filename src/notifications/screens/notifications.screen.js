/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { ButtonGroup, Card, Icon } from 'react-native-elements';

import { GitHub } from 'api/rest/providers/github';
import { createDispatchProxy, createCountProxy } from 'api/rest/proxies';

import { v3 } from 'api';
import {
  Button,
  ViewContainer,
  LoadingContainer,
  NotificationListItem,
} from 'components';
import { colors, fonts, normalize } from 'config';
import { translate, getPaginationFromState } from 'utils';
/* import {
  markAsRead,
  markRepoAsRead,
  markAllNotificationsAsRead,
} from '../index'; */

const mapStateToProps = state => {
  const { entities: { orgs, repos, users, notifications } } = state;

  const unreadPagination = getPaginationFromState(
    state,
    'ACTIVITY_GET_NOTIFICATIONS',
    'false-false',
    {
      ids: [],
      isFetching: true,
    }
  );
  const unread = unreadPagination.ids.map(id => notifications[id]);

  const participatingPagination = getPaginationFromState(
    state,
    'ACTIVITY_GET_NOTIFICATIONS',
    'true-false',
    {
      ids: [],
      isFetching: true,
    }
  );
  const participating = participatingPagination.ids.map(
    id => notifications[id]
  );

  const allPagination = getPaginationFromState(
    state,
    'ACTIVITY_GET_NOTIFICATIONS',
    'false-true',
    {
      ids: [],
      isFetching: true,
    }
  );
  const all = allPagination.ids.map(id => notifications[id]);

  return {
    unread,
    unreadPagination,
    participating,
    participatingPagination,
    all,
    allPagination,
    issue: state.issue.issue, // ?
    language: state.auth.language,
    repos,
    users,
    orgs,
    // TODO: Remove me
    isPendingMarkAllNotificationsAsRead:
      state.notifications.isPendingMarkAllNotificationsAsRead,
  };
};

const styles = StyleSheet.create({
  buttonGroupWrapper: {
    backgroundColor: colors.greyLight,
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    paddingBottom: 10,
    marginBottom: 15,
  },
  buttonGroupContainer: {
    height: 30,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonGroupText: {
    ...fonts.fontPrimaryBold,
  },
  buttonGroupTextSelected: {
    color: colors.black,
  },
  repositoryContainer: {
    padding: 0,
    marginTop: 0,
    marginBottom: 25,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingVertical: 8,
    backgroundColor: colors.greyLight,
  },
  repositoryOwnerAvatar: {
    borderRadius: 13,
    width: 26,
    height: 26,
  },
  repositoryTitle: {
    color: colors.primaryDark,
    ...fonts.fontPrimarySemiBold,
    marginLeft: 10,
    flex: 1,
  },
  markAsReadIconRepo: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noneTitle: {
    paddingHorizontal: 15,
    fontSize: normalize(16),
    textAlign: 'center',
    ...fonts.fontPrimary,
  },
  markAllAsReadButtonContainer: {
    marginTop: 0,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  contentBlock: {
    flex: 1,
  },
});

const NotificationsType = {
  UNREAD: 0,
  PARTICIPATING: 1,
  ALL: 2,
};

class Notifications extends Component {
  props: {
    getNotifications: Function,
    getNotificationsCount: Function,
    markThreadAsRead: Function,
    markRepoAsRead: Function,
    markAllNotificationsAsRead: Function,
    // Arrays holding notifications
    unread: Array,
    participating: Array,
    all: Array,
    // Their paginations
    unreadPagination: Array,
    participatingPagination: Array,
    allPagination: Array,

    language: string,
    navigation: Object,
    repos: Array,
    users: Array,
    orgs: Array,

    // TODO: get rid of those
    isPendingMarkAllNotificationsAsRead: boolean,
  };

  constructor() {
    super();

    this.state = {
      type: 0,
      contentBlockHeight: null,
    };

    this.switchType = this.switchType.bind(this);
    this.notifications = this.notifications.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.getNotifications();
  }

  // TODO: clean me
  componentWillReceiveProps(nextProps) {
    const paginationName = this.getPaginationName();

    if (
      !nextProps.isPendingMarkAllNotificationsAsRead &&
      this.props.isPendingMarkAllNotificationsAsRead &&
      !this.isLoading()
    ) {
      this.getNotificationsForCurrentType()();
    }

    if (
      !nextProps[paginationName].isFetching &&
      this.props[paginationName].isFetching
    ) {
      this.props.getNotificationsCount(false, false);
    }
  }

  // OK
  getImage(repoName) {
    const { repos, users, orgs } = this.props;
    const notificationForRepo = this.notifications().find(
      notification => notification.repo === repoName
    );

    const repository = repos[notificationForRepo.repo];

    return repository.userOwner
      ? users[repository.userOwner].avatarUrl
      : orgs[repository.orgOwner].avatarUrl;
  }

  // OK
  getNotifications() {
    this.props.getNotifications(false, false); // unread
    this.props.getNotifications(true, false); // participating
    this.props.getNotifications(false, true); // all
  }

  // OK
  getNotificationsForCurrentType() {
    const { type } = this.state;
    const { getNotifications } = this.props;

    switch (type) {
      case NotificationsType.UNREAD:
        return () =>
          getNotifications(false, false, {
            forceRefresh: true,
          });
      case NotificationsType.PARTICIPATING:
        return () =>
          getNotifications(true, false, {
            forceRefresh: true,
          });
      case NotificationsType.ALL:
        return () =>
          getNotifications(false, true, {
            forceRefresh: true,
          });
      default:
        return null;
    }
  }

  // OK
  getSortedRepos = () => {
    const repositories = [
      ...new Set(this.notifications().map(notification => notification.repo)),
    ];

    return repositories.sort((a, b) => {
      return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
    });
  };

  // OK
  getPaginationName = () => {
    const { type } = this.state;

    switch (type) {
      case NotificationsType.UNREAD:
        return 'unreadPagination';
      case NotificationsType.PARTICIPATING:
        return 'participatingPagination';
      case NotificationsType.ALL:
        return 'allPagination';
      default:
        return null;
    }
  };

  // OK
  navigateToRepo = fullName => {
    const { navigation } = this.props;

    navigation.navigate('Repository', {
      repositoryUrl: `${v3.root}/repos/${fullName}`,
    });
  };

  // OK
  saveContentBlockHeight = e => {
    const { height } = e.nativeEvent.layout;

    this.setState({ contentBlockHeight: height });
  };

  // OK
  keyExtractor = (item, index) => {
    return index;
  };

  // TODO: clean me
  isLoading() {
    const {
      unread,
      unreadPagination,
      participating,
      participatingPagination,
      all,
      allPagination,
    } = this.props;
    const { type } = this.state;

    switch (type) {
      case NotificationsType.UNREAD:
        return unread && unreadPagination.isFetching;
      case NotificationsType.PARTICIPATING:
        return participating && participatingPagination.isFetching;
      case NotificationsType.ALL:
        return all && allPagination.isFetching;
      default:
        return false;
    }
  }

  // OK
  notifications() {
    const { unread, participating, all } = this.props;
    const { type } = this.state;

    switch (type) {
      case NotificationsType.UNREAD:
        return unread;
      case NotificationsType.PARTICIPATING:
        return participating;
      case NotificationsType.ALL:
        return all;
      default:
        return [];
    }
  }

  // OK
  switchType(selectedType) {
    const { unread, participating, all, getNotifications } = this.props;

    if (this.state.type !== selectedType) {
      this.setState({
        type: selectedType,
      });
    }

    if (selectedType === NotificationsType.UNREAD && unread.length === 0) {
      getNotifications(false, false);
    } else if (
      selectedType === NotificationsType.PARTICIPATING &&
      participating.length === 0
    ) {
      getNotifications(true, false);
    } else if (selectedType === NotificationsType.ALL && all.length === 0) {
      getNotifications(false, true);
    }

    if (this.notifications().length > 0) {
      this.notificationsList.scrollToOffset({
        x: 0,
        y: 0,
        animated: false,
      });
    }
  }

  // OK
  navigateToThread(notification) {
    const { markThreadAsRead, navigation } = this.props;

    markThreadAsRead(notification.id);
    navigation.navigate('Issue', {
      issueURL: notification.link.replace(/pulls\/(\d+)$/, 'issues/$1'),
      isPR: notification.type === 'PullRequest',
      language: this.props.language,
    });
  }

  // OK
  navigateToRepo = fullName => {
    const { navigation } = this.props;

    navigation.navigate('Repository', {
      repositoryUrl: `${v3.root}/repos/${fullName}`,
    });
  };

  // TODO: Implement & use new api calls
  renderItem = ({ item }) => {
    const {
      markThreadAsRead,
      markRepoAsRead,
      markAllNotificationsAsRead,
    } = this.props;
    const { type } = this.state;
    const notifications = this.notifications().filter(
      notification => notification.repo === item
    );
    const isFirstItem = this.getSortedRepos().indexOf(item) === 0;
    const isFirstTab = type === 0;

    return (
      <View>
        {isFirstItem &&
          isFirstTab &&
          <View style={styles.markAllAsReadButtonContainer}>
            <Button
              icon={{ name: 'check', type: 'octicon' }}
              onPress={() => markAllNotificationsAsRead()}
              title={translate('notifications.main.markAllAsRead')}
            />
          </View>}

        <Card containerStyle={styles.repositoryContainer}>
          <View style={styles.headerContainer}>
            <Image
              style={styles.repositoryOwnerAvatar}
              source={{
                uri: this.getImage(item),
              }}
            />

            <Text
              style={styles.repositoryTitle}
              onPress={() => this.navigateToRepo(item)}
            >
              {item}
            </Text>

            <TouchableOpacity
              style={styles.markAsReadIconRepo}
              onPress={() => markRepoAsRead(item)}
            >
              <Icon
                color={colors.greyDark}
                size={28}
                name="check"
                type="octicon"
              />
            </TouchableOpacity>
          </View>

          <ScrollView>
            {notifications.map(notification =>
              <NotificationListItem
                key={notification.id}
                notification={notification}
                iconAction={notificationID => markThreadAsRead(notificationID)}
                navigationAction={notify => this.navigateToThread(notify)}
                navigation={this.props.navigation}
              />
            )}
          </ScrollView>
        </Card>
      </View>
    );
  };

  render() {
    const { type, contentBlockHeight } = this.state;
    const { language } = this.props;
    const sortedRepos = this.getSortedRepos();

    const isRetrievingNotifications =
      this.isLoading() && this.notifications().length === 0;
    const isLoadingNewNotifications =
      this.isLoading() && this.notifications().length > 0;

    return (
      <ViewContainer>
        <View style={styles.container}>
          <View style={styles.buttonGroupWrapper}>
            <ButtonGroup
              onPress={this.switchType}
              selectedIndex={type}
              buttons={[
                translate('notifications.main.unreadButton', language),
                translate('notifications.main.participatingButton', language),
                translate('notifications.main.allButton', language),
              ]}
              textStyle={styles.buttonGroupText}
              selectedTextStyle={styles.buttonGroupTextSelected}
              containerStyle={styles.buttonGroupContainer}
            />
          </View>

          <View
            onLayout={this.saveContentBlockHeight}
            style={styles.contentBlock}
          >
            {isRetrievingNotifications &&
              <View
                style={[styles.textContainer, { height: contentBlockHeight }]}
              >
                <LoadingContainer
                  animating={isRetrievingNotifications}
                  text={translate(
                    'notifications.main.retrievingMessage',
                    language
                  )}
                  style={styles.marginSpacing}
                  center
                />
              </View>}

            {!isRetrievingNotifications &&
              <FlatList
                ref={ref => {
                  this.notificationsList = ref;
                }}
                removeClippedSubviews={false}
                onRefresh={this.getNotificationsForCurrentType()}
                refreshing={isLoadingNewNotifications}
                data={sortedRepos}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                ListEmptyComponent={
                  !isLoadingNewNotifications &&
                  <View
                    style={[
                      styles.textContainer,
                      { height: contentBlockHeight },
                    ]}
                  >
                    <Text style={styles.noneTitle}>
                      {translate('notifications.main.noneMessage', language)}
                    </Text>
                  </View>
                }
              />}
          </View>
        </View>
      </ViewContainer>
    );
  }
}

const client = createDispatchProxy(GitHub);
const countingClient = createCountProxy(GitHub);

export const NotificationsScreen = connect(mapStateToProps, {
  getNotifications: client.activity.getNotifications,
  markThreadAsRead: client.activity.markNotificationThreadAsRead,
  getNotificationsCount: countingClient.activity.getNotifications,
})(Notifications);
