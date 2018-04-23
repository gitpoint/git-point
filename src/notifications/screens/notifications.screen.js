/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

import { v3 } from 'api';
import {
  Button,
  ViewContainer,
  LoadingContainer,
  NotificationListItem,
} from 'components';
import { colors, fonts, normalize } from 'config';
import { translate } from 'utils';
import {
  getUnreadNotifications,
  getParticipatingNotifications,
  getAllNotifications,
  markAsRead,
  markRepoAsRead,
  getNotificationsCount,
  markAllNotificationsAsRead,
} from '../index';

const mapStateToProps = state => ({
  unread: state.notifications.unread,
  participating: state.notifications.participating,
  all: state.notifications.all,
  issue: state.issue.issue,
  locale: state.auth.locale,
  isPendingUnread: state.notifications.isPendingUnread,
  isPendingParticipating: state.notifications.isPendingParticipating,
  isPendingAll: state.notifications.isPendingAll,
  isPendingMarkAllNotificationsAsRead:
    state.notifications.isPendingMarkAllNotificationsAsRead,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUnreadNotifications,
      getParticipatingNotifications,
      getAllNotifications,
      markAsRead,
      markRepoAsRead,
      getNotificationsCount,
      markAllNotificationsAsRead,
    },
    dispatch
  );

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
    getUnreadNotifications: Function,
    getParticipatingNotifications: Function,
    getAllNotifications: Function,
    markAsRead: Function,
    markRepoAsRead: Function,
    getNotificationsCount: Function,
    markAllNotificationsAsRead: Function,
    unread: Array,
    participating: Array,
    all: Array,
    locale: string,
    isPendingUnread: boolean,
    isPendingParticipating: boolean,
    isPendingAll: boolean,
    isPendingMarkAllNotificationsAsRead: boolean,
    navigation: Object,
  };

  constructor() {
    super();

    this.state = {
      type: NotificationsType.UNREAD,
      contentBlockHeight: null,
    };

    this.switchType = this.switchType.bind(this);
    this.notifications = this.notifications.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.getNotifications();
  }

  componentWillReceiveProps(nextProps) {
    const pendingType = this.getPendingType();

    if (
      !nextProps.isPendingMarkAllNotificationsAsRead &&
      this.props.isPendingMarkAllNotificationsAsRead &&
      !this.isLoading()
    ) {
      this.getNotificationsForCurrentType()();
    }

    if (!nextProps[pendingType] && this.props[pendingType]) {
      this.props.getNotificationsCount();
    }
  }

  getImage(repoName) {
    const notificationForRepo = this.notifications().find(
      notification => notification.repository.full_name === repoName
    );

    return notificationForRepo.repository.owner.avatar_url;
  }

  getNotifications() {
    this.props.getUnreadNotifications();
    this.props.getParticipatingNotifications();
    this.props.getAllNotifications();
    this.props.getNotificationsCount();
  }

  getNotificationsForCurrentType() {
    const {
      getUnreadNotifications,
      getParticipatingNotifications,
      getAllNotifications,
    } = this.props;
    const { type } = this.state;

    switch (type) {
      case NotificationsType.UNREAD:
        return getUnreadNotifications;
      case NotificationsType.PARTICIPATING:
        return getParticipatingNotifications;
      case NotificationsType.ALL:
        return getAllNotifications;
      default:
        return null;
    }
  }

  getSortedRepos = () => {
    const repositories = [
      ...new Set(
        this.notifications().map(
          notification => notification.repository.full_name
        )
      ),
    ];

    return repositories.sort((a, b) => {
      return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
    });
  };

  getPendingType = () => {
    const { type } = this.state;

    switch (type) {
      case NotificationsType.UNREAD:
        return 'isPendingUnread';
      case NotificationsType.PARTICIPATING:
        return 'isPendingParticipating';
      case NotificationsType.ALL:
        return 'isPendingAll';
      default:
        return null;
    }
  };

  navigateToRepo = fullName => {
    const { navigation } = this.props;

    navigation.navigate('Repository', {
      repositoryUrl: `${v3.root}/repos/${fullName}`,
    });
  };

  saveContentBlockHeight = e => {
    const { height } = e.nativeEvent.layout;

    this.setState({ contentBlockHeight: height });
  };

  keyExtractor = (item, index) => {
    return index;
  };

  isLoading() {
    const {
      unread,
      participating,
      all,
      isPendingUnread,
      isPendingParticipating,
      isPendingAll,
    } = this.props;
    const { type } = this.state;

    switch (type) {
      case NotificationsType.UNREAD:
        return unread && isPendingUnread;
      case NotificationsType.PARTICIPATING:
        return participating && isPendingParticipating;
      case NotificationsType.ALL:
        return all && isPendingAll;
      default:
        return false;
    }
  }

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

  switchType(selectedType) {
    const { unread, participating, all } = this.props;

    if (this.state.type !== selectedType) {
      this.setState({
        type: selectedType,
      });
    }

    if (selectedType === NotificationsType.UNREAD && unread.length === 0) {
      this.props.getUnreadNotifications();
    } else if (
      selectedType === NotificationsType.PARTICIPATING &&
      participating.length === 0
    ) {
      this.props.getParticipatingNotifications();
    } else if (selectedType === NotificationsType.ALL && all.length === 0) {
      this.props.getAllNotifications();
    }

    if (this.notifications().length > 0) {
      this.notificationsList.scrollToOffset({
        x: 0,
        y: 0,
        animated: false,
      });
    }
  }

  navigateToThread(notification) {
    const { markAsRead, navigation } = this.props;

    markAsRead(notification.id);
    navigation.navigate('Issue', {
      issueURL: notification.subject.url.replace(/pulls\/(\d+)$/, 'issues/$1'),
      isPR: notification.subject.type === 'PullRequest',
      locale: this.props.locale,
    });
  }

  navigateToRepo = fullName => {
    const { navigation } = this.props;

    navigation.navigate('Repository', {
      repositoryUrl: `${v3.root}/repos/${fullName}`,
    });
  };

  renderItem = ({ item }) => {
    const {
      markAsRead,
      markRepoAsRead,
      markAllNotificationsAsRead,
    } = this.props;
    const { type } = this.state;
    const notifications = this.notifications().filter(
      notification => notification.repository.full_name === item
    );
    const isFirstItem = this.getSortedRepos().indexOf(item) === 0;
    const isFirstTab = type === 0;

    return (
      <View>
        {isFirstItem &&
          isFirstTab && (
            <View style={styles.markAllAsReadButtonContainer}>
              <Button
                icon={{ name: 'check', type: 'octicon' }}
                onPress={() => markAllNotificationsAsRead()}
                title={translate('notifications.main.markAllAsRead')}
              />
            </View>
          )}

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
            {notifications.map(notification => (
              <NotificationListItem
                key={notification.id}
                notification={notification}
                iconAction={notificationID => markAsRead(notificationID)}
                navigationAction={notify => this.navigateToThread(notify)}
                navigation={this.props.navigation}
              />
            ))}
          </ScrollView>
        </Card>
      </View>
    );
  };

  render() {
    const { type, contentBlockHeight } = this.state;
    const { locale } = this.props;
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
                translate('notifications.main.unreadButton', locale),
                translate('notifications.main.participatingButton', locale),
                translate('notifications.main.allButton', locale),
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
            {isRetrievingNotifications && (
              <View
                style={[styles.textContainer, { height: contentBlockHeight }]}
              >
                <LoadingContainer
                  animating={isRetrievingNotifications}
                  text={translate(
                    'notifications.main.retrievingMessage',
                    locale
                  )}
                  style={styles.marginSpacing}
                  center
                />
              </View>
            )}

            {!isRetrievingNotifications && (
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
                  !isLoadingNewNotifications && (
                    <View
                      style={[
                        styles.textContainer,
                        { height: contentBlockHeight },
                      ]}
                    >
                      <Text style={styles.noneTitle}>
                        {translate('notifications.main.noneMessage', locale)}
                      </Text>
                    </View>
                  )
                }
              />
            )}
          </View>
        </View>
      </ViewContainer>
    );
  }
}

export const NotificationsScreen = connect(mapStateToProps, mapDispatchToProps)(
  Notifications
);
