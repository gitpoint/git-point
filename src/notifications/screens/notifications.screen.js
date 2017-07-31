/* eslint-disable no-nested-ternary */
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

import {
  ViewContainer,
  LoadingContainer,
  NotificationListItem,
} from 'components';
import { colors, fonts, normalize } from 'config';
import { translate } from 'utils';
import { getIssueFromUrl } from 'issue';
import {
  getUnreadNotifications,
  getParticipatingNotifications,
  getAllNotifications,
  markAsRead,
  markRepoAsRead,
} from '../index';

const mapStateToProps = state => ({
  unread: state.notifications.unread,
  participating: state.notifications.participating,
  all: state.notifications.all,
  issue: state.issue.issue,
  language: state.auth.language,
  isPendingUnread: state.notifications.isPendingUnread,
  isPendingParticipating: state.notifications.isPendingParticipating,
  isPendingAll: state.notifications.isPendingAll,
});

const mapDispatchToProps = dispatch => ({
  getUnreadNotificationsByDispatch: () => dispatch(getUnreadNotifications()),
  getParticipatingNotificationsByDispatch: () =>
    dispatch(getParticipatingNotifications()),
  getAllNotificationsByDispatch: () => dispatch(getAllNotifications()),
  markAsReadByDispatch: notificationID => dispatch(markAsRead(notificationID)),
  markRepoAsReadByDispatch: repoFullName =>
    dispatch(markRepoAsRead(repoFullName)),
  getIssueFromUrlByDispatch: url => dispatch(getIssueFromUrl(url)),
});

const styles = StyleSheet.create({
  buttonGroupWrapper: {
    backgroundColor: colors.greyLight,
    paddingTop: Platform.OS === 'ios' ? 28 : 15,
  },
  buttonGroupContainer: {
    height: 30,
  },
  buttonGroupText: {
    ...fonts.fontPrimaryBold,
  },
  buttonGroupTextSelected: {
    color: colors.black,
  },
  repositoryContainer: {
    padding: 0,
    marginVertical: 25,
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
    paddingHorizontal: 10,
  },
  noneTitle: {
    fontSize: normalize(16),
    textAlign: 'center',
    ...fonts.fontPrimary,
  },
});

class Notifications extends Component {
  props: {
    getUnreadNotificationsByDispatch: Function,
    getParticipatingNotificationsByDispatch: Function,
    getAllNotificationsByDispatch: Function,
    markAsReadByDispatch: Function,
    markRepoAsReadByDispatch: Function,
    unread: Array,
    participating: Array,
    all: Array,
    language: string,
    isPendingUnread: boolean,
    isPendingParticipating: boolean,
    isPendingAll: boolean,
    navigation: Object,
  };

  constructor() {
    super();

    this.state = {
      type: 0,
    };

    this.switchType = this.switchType.bind(this);
    this.notifications = this.notifications.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.props.getUnreadNotificationsByDispatch();
    this.props.getParticipatingNotificationsByDispatch();
    this.props.getAllNotificationsByDispatch();
  }

  getImage(repoName) {
    const notificationForRepo = this.notifications().find(
      notification => notification.repository.full_name === repoName
    );

    return notificationForRepo.repository.owner.avatar_url;
  }

  getNotifications() {
    const {
      getUnreadNotificationsByDispatch,
      getParticipatingNotificationsByDispatch,
      getAllNotificationsByDispatch,
    } = this.props;
    const { type } = this.state;

    switch (type) {
      case 0:
        return getUnreadNotificationsByDispatch;
      case 1:
        return getParticipatingNotificationsByDispatch;
      case 2:
        return getAllNotificationsByDispatch;
      default:
        return null;
    }
  }

  navigateToRepo = fullName => {
    const { navigation } = this.props;

    navigation.navigate('Repository', {
      repositoryUrl: `https://api.github.com/repos/${fullName}`,
    });
  };

  navigateToThread(notification) {
    const { markAsReadByDispatch, navigation } = this.props;

    markAsReadByDispatch(notification.id);
    navigation.navigate('Issue', {
      issueURL: notification.subject.url.replace('pulls', 'issues'),
      isPR: notification.subject.type === 'PullRequest',
    });
  }

  switchType(selectedType) {
    const { unread, participating, all } = this.props;

    if (this.state.type !== selectedType) {
      this.setState({
        type: selectedType,
      });
    }

    if (selectedType === 0 && unread.length === 0) {
      this.props.getUnreadNotificationsByDispatch();
    } else if (selectedType === 1 && participating.length === 0) {
      this.props.getParticipatingNotificationsByDispatch();
    } else if (selectedType === 2 && all.length === 0) {
      this.props.getAllNotificationsByDispatch();
    }

    if (this.notifications().length > 0) {
      this.notificationsList.scrollToOffset({
        x: 0,
        y: 0,
        animated: false,
      });
    }
  }

  notifications() {
    const { unread, participating, all } = this.props;
    const { type } = this.state;

    switch (type) {
      case 0:
        return unread;
      case 1:
        return participating;
      case 2:
        return all;
      default:
        return null;
    }
  }

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
      case 0:
        return unread && isPendingUnread;
      case 1:
        return participating && isPendingParticipating;
      case 2:
        return all && isPendingAll;
      default:
        return null;
    }
  }

  keyExtractor = (item, index) => {
    return index;
  };

  renderItem = ({ item }) => {
    const { markAsReadByDispatch, markRepoAsReadByDispatch } = this.props;
    const notifications = this.notifications().filter(
      notification => notification.repository.full_name === item
    );

    return (
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
            onPress={() => markRepoAsReadByDispatch(item)}
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
              iconAction={notificationID =>
                markAsReadByDispatch(notificationID)}
              navigationAction={notify => this.navigateToThread(notify)}
              navigation={this.props.navigation}
            />
          )}
        </ScrollView>
      </Card>
    );
  };

  render() {
    const { type } = this.state;
    const { language } = this.props;

    const repositories = [
      ...new Set(
        this.notifications().map(
          notification => notification.repository.full_name
        )
      ),
    ];

    const sortedRepos = repositories.sort((a, b) => {
      return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
    });

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

          {this.isLoading() &&
            this.notifications().length === 0 &&
            <LoadingContainer
              animating={this.isLoading() && this.notifications().length === 0}
              text={translate('notifications.main.retrievingMessage', language)}
              style={styles.marginSpacing}
            />}

          {!this.isLoading() &&
            this.notifications().length === 0 &&
            <View style={styles.textContainer}>
              <Text style={styles.noneTitle}>
                {translate('notifications.main.noneMessage', language)}
              </Text>
            </View>}

          {this.notifications().length > 0 &&
            <FlatList
              ref={ref => {
                this.notificationsList = ref;
              }}
              removeClippedSubviews={false}
              onRefresh={this.getNotifications()}
              refreshing={this.isLoading()}
              data={sortedRepos}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />}
        </View>
      </ViewContainer>
    );
  }
}

export const NotificationsScreen = connect(mapStateToProps, mapDispatchToProps)(
  Notifications
);
