import React, { Component, PropTypes } from "react";
import { StyleSheet, FlatList, View, ScrollView, Text, TouchableOpacity } from "react-native";
import { ButtonGroup, Card, Icon } from "react-native-elements";
import FastImage from 'react-native-fast-image'

import ViewContainer from "../components/ViewContainer";
import LoadingContainer from "../components/LoadingContainer";
import NotificationListItem from "../components/NotificationListItem";

import colors from "../config/colors";

import { connect } from "react-redux";
import {
  getUnreadNotifications,
  getParticipatingNotifications,
  getAllNotifications
} from "../actions/notifications";

const mapStateToProps = state => ({
  unread: state.notifications.unread,
  participating: state.notifications.participating,
  all: state.notifications.all,
  isPendingUnread: state.notifications.isPendingUnread,
  isPendingParticipating: state.notifications.isPendingParticipating,
  isPendingAll: state.notifications.isPendingAll
});

const mapDispatchToProps = dispatch => ({
  getUnreadNotifications: () => dispatch(getUnreadNotifications()),
  getParticipatingNotifications: () =>
    dispatch(getParticipatingNotifications()),
  getAllNotifications: () => dispatch(getAllNotifications())
});

class Notifications extends Component {
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

    this.refs.notificationsListRef.scrollToOffset({x: 0, y: 0, animated: false});
  }

  renderItem = ({ item }) => {
    const notifications = this.notifications().filter(
      notification => notification.repository.full_name === item
    );

    return (
      <Card
        containerStyle={styles.repositoryContainer}
      > 

        <View style={styles.headerContainer}>
          <FastImage
            style={styles.repositoryOwnerAvatar}
            source={{
              uri: this.getImage(item),
              priority: FastImage.priority.high,
            }}
          />

          <Text style={styles.repositoryTitle}>{item}</Text>
          
          <TouchableOpacity style={styles.markAsReadIconRepo}>
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
            <NotificationListItem key={i} notification={notification} navigation={this.props.navigation} />
          ))}
        </ScrollView>
      </Card>
    );
  };

  getImage(repoName) {
    const notificationForRepo = this.notifications().find((notification) => notification.repository.full_name === repoName);

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
    const { getUnreadNotifications, getParticipatingNotifications, getAllNotifications } = this.props;
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

    return (
      <ViewContainer>
        {this.isLoading() && this.notifications().length === 0 &&
          <LoadingContainer
            animating={this.isLoading() && this.notifications().length === 0}
            text={`Retrieving ${type === 0 ? "unread" : type === 1 ? "pending" : "all"} notifications`}
            style={styles.marginSpacing}
          />
        }

        <View style={styles.marginBottom}>
          <View style={styles.buttonGroupWrapper}>
            <ButtonGroup
              onPress={this.switchType}
              selectedIndex={this.state.type}
              buttons={["Unread", "Participating", "All"]}
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
            data={repositories}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            disableVirtualization={true}
          />
        </View>
      </ViewContainer>
    );
  }

  keyExtractor = (item, index) => {
    return index;
  };
}

Notifications.propTypes = {
  getUnreadNotifications: PropTypes.func,
  getParticipatingNotifications: PropTypes.func,
  getAllNotifications: PropTypes.func,
  unread: PropTypes.array,
  participating: PropTypes.array,
  all: PropTypes.array,
  isPendingUnread: PropTypes.bool,
  isPendingParticipating: PropTypes.bool,
  isPendingAll: PropTypes.bool,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  buttonGroupWrapper: {
    backgroundColor: colors.greyLight,
    paddingTop: 28,
  },
  buttonGroupContainer: {
    height: 30,
  },
  buttonGroupText: {
    fontFamily: "AvenirNext-Bold"
  },
  buttonGroupTextSelected: {
    color: colors.black
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
    color: colors.primarydark,
    fontFamily: "AvenirNext-DemiBold",
    marginLeft: 10,
    flex: 1,
  },
  notificationTitle: {
    color: colors.black,
    fontSize: 14,    
    fontFamily: 'AvenirNext-Regular',
  },
  markAsReadIconRepo: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginBottom: {
    marginBottom: 85,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
