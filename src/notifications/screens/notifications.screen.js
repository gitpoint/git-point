import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import { ButtonGroup, Card, Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image';

import { ViewContainer, LoadingContainer } from 'components';

import { NotificationListItem } from 'components';

import { colors, normalize } from 'config';

import { connect } from 'react-redux';
import {
  getUnreadNotifications,
  getParticipatingNotifications,
  getAllNotifications,
  markAsRead,
  markRepoAsRead
} from '../';

import { getIssueFromUrl } from 'issue';

const mapStateToProps = state => ({
  unread: state.notifications.unread,
  participating: state.notifications.participating,
  all: state.notifications.all,
  issue: state.issue.issue,
  isPendingUnread: state.notifications.isPendingUnread,
  isPendingParticipating: state.notifications.isPendingParticipating,
  isPendingAll: state.notifications.isPendingAll
});

const mapDispatchToProps = dispatch => ({
  getUnreadNotifications: () => dispatch(getUnreadNotifications()),
  getParticipatingNotifications: () =>
    dispatch(getParticipatingNotifications()),
  getAllNotifications: () => dispatch(getAllNotifications()),
  markAsRead: notificationID => dispatch(markAsRead(notificationID)),
  markRepoAsRead: repoFullName => dispatch(markRepoAsRead(repoFullName)),
  getIssueFromUrl: url => dispatch(getIssueFromUrl(url))
});

class Notifications extends Component {
  props: {
    getUnreadNotifications: Function,
    getParticipatingNotifications: Function,
    getAllNotifications: Function,
    getIssueFromUrl: Function,
    issue: Object,
    markAsRead: Function,
    markRepoAsRead: Function,
    unread: Array,
    participating: Array,
    all: Array,
    isPendingUnread: boolean,
    isPendingParticipating: boolean,
    isPendingAll: boolean,
    navigation: Object
  };

  constructor() {
    super();

    this.state = {
      type: 0
    };

    this.switchType = this.switchType.bind(this);
    this.notifications = this.notifications.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.props.getUnreadNotifications();
    this.props.getParticipatingNotifications();
    this.props.getAllNotifications();
  }

  switchType(selectedType) {
    const { unread, participating, all } = this.props;

    if (this.state.type !== selectedType) {
      this.setState({
        type: selectedType
      });
    }

    if (selectedType === 0 && unread.length === 0) {
      this.props.getUnreadNotifications();
    } else if (selectedType === 1 && participating.length === 0) {
      this.props.getParticipatingNotifications();
    } else if (selectedType === 2 && all.length === 0) {
      this.props.getAllNotifications();
    }

    this.refs.notificationsListRef.scrollToOffset({
      x: 0,
      y: 0,
      animated: false
    });
  }

  renderItem = ({ item }) => {
    const { markAsRead, markRepoAsRead } = this.props;
    const notifications = this.notifications().filter(
      notification => notification.repository.full_name === item
    );

    return (
      <Card containerStyle={styles.repositoryContainer}>

        <View style={styles.headerContainer}>
          <FastImage
            style={styles.repositoryOwnerAvatar}
            source={{
              uri: this.getImage(item),
              priority: FastImage.priority.high
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
          {notifications.map((notification, i) => (
            <NotificationListItem
              key={i}
              notification={notification}
              iconAction={notificationID => markAsRead(notificationID)}
              navigationAction={notification =>
                this.navigateToThread(notification)}
              navigation={this.props.navigation}
            />
          ))}
        </ScrollView>
      </Card>
    );
  };

  navigateToRepo = fullName => {
    const { navigation } = this.props;

    navigation.navigate('Repository', {
      repositoryUrl: `https://api.github.com/repos/${fullName}`
    });
  };
  navigateToThread(notification) {
    const { markAsRead, getIssueFromUrl, navigation } = this.props;

    markAsRead(notification.id);
    getIssueFromUrl(
      notification.subject.url.replace('pulls', 'issues')
    ).then(() => {
      navigation.navigate('Issue', {
        issue: this.props.issue
      });
    });
  }

  getImage(repoName) {
    const notificationForRepo = this.notifications().find(
      notification => notification.repository.full_name === repoName
    );

    return notificationForRepo.repository.owner.avatar_url;
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
    }
  }

  isLoading() {
    const {
      unread,
      participating,
      all,
      isPendingUnread,
      isPendingParticipating,
      isPendingAll
    } = this.props;
    const { type } = this.state;

    switch (type) {
      case 0:
        return unread && isPendingUnread;
      case 1:
        return participating && isPendingParticipating;
      case 2:
        return all && isPendingAll;
    }
  }

  getNotifications() {
    const {
      getUnreadNotifications,
      getParticipatingNotifications,
      getAllNotifications
    } = this.props;
    const { type } = this.state;

    switch (type) {
      case 0:
        return getUnreadNotifications;
      case 1:
        return getParticipatingNotifications;
      case 2:
        return getAllNotifications;
    }
  }

  render() {
    const { type } = this.state;
    const repositories = [
      ...new Set(
        this.notifications().map(
          notification => notification.repository.full_name
        )
      )
    ];

    const sortedRepos = repositories.sort((a, b) => {
      return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
    });

    return (
      <ViewContainer>
        {this.isLoading() &&
          this.notifications().length === 0 &&
          <LoadingContainer
            animating={this.isLoading() && this.notifications().length === 0}
            text={`Retrieving ${type === 0 ? 'unread' : type === 1 ? 'pending' : 'all'} notifications`}
            style={styles.marginSpacing}
          />}

        <View style={styles.marginBottom}>
          <View style={styles.buttonGroupWrapper}>
            <ButtonGroup
              onPress={this.switchType}
              selectedIndex={this.state.type}
              buttons={['Unread', 'Participating', 'All']}
              textStyle={styles.buttonGroupText}
              selectedTextStyle={styles.buttonGroupTextSelected}
              containerStyle={styles.buttonGroupContainer}
            />
          </View>
          <FlatList
            ref="notificationsListRef"
            removeClippedSubviews={false}
            onRefresh={this.getNotifications()}
            refreshing={this.isLoading()}
            data={sortedRepos}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </View>
      </ViewContainer>
    );
  }

  keyExtractor = (item, index) => {
    return index;
  };
}

const styles = StyleSheet.create({
  buttonGroupWrapper: {
    backgroundColor: colors.greyLight,
    paddingTop: 28
  },
  buttonGroupContainer: {
    height: 30
  },
  buttonGroupText: {
    fontFamily: 'AvenirNext-Bold'
  },
  buttonGroupTextSelected: {
    color: colors.black
  },
  repositoryContainer: {
    padding: 0,
    marginVertical: 25
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingVertical: 8,
    backgroundColor: colors.greyLight
  },
  repositoryOwnerAvatar: {
    borderRadius: 13,
    width: 26,
    height: 26
  },
  repositoryTitle: {
    color: colors.primarydark,
    fontFamily: 'AvenirNext-DemiBold',
    marginLeft: 10,
    flex: 1
  },
  notificationTitle: {
    color: colors.black,
    fontSize: normalize(12),
    fontFamily: 'AvenirNext-Regular'
  },
  markAsReadIconRepo: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  marginBottom: {
    marginBottom: 70,
    backgroundColor: 'transparent'
  }
});

export const NotificationsScreen = connect(mapStateToProps, mapDispatchToProps)(
  Notifications
);
