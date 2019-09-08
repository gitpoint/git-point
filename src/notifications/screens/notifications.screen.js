/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatList, View, ScrollView } from 'react-native';
import { ButtonGroup, Card, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import {
  Button,
  ViewContainer,
  LoadingContainer,
  NotificationListItem,
} from 'components';
import { colors, fonts, normalize, getHeaderForceInset } from 'config';
import { t } from 'utils';
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

const StyledSafeAreaView = styled(SafeAreaView).attrs({
  forceInset: getHeaderForceInset('Notifications'),
})`
  background-color: ${colors.greyLight};
`;

const ButtonGroupWrapper = styled.View`
  background-color: ${colors.greyLight};
  padding-top: 10;
  padding-bottom: 10;
  margin-bottom: 15;
`;

const StyledButtonGroup = styled(ButtonGroup).attrs({
  containerStyle: {
    height: 30,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 15,
    marginRight: 15,
  },
  textStyle: {
    ...fonts.fontPrimaryBold,
  },
  selectedTextStyle: {
    color: colors.black,
  },
})``;

const RepositoryContainer = styled(Card).attrs({
  containerStyle: {
    padding: 0,
    marginTop: 0,
    marginBottom: 25,
  },
})``;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 5;
  padding-vertical: 8;
  background-color: ${colors.greyLight};
`;

const RepositoryOwnerAvatar = styled.Image`
  border-radius: 13;
  width: 26;
  height: 26;
`;

const RepositoryTitle = styled.Text`
  color: ${colors.primaryDark};
  ${fonts.fontPrimarySemiBold};
  margin-left: 10;
  flex: 1;
`;
const MarkAsReadIconRepo = styled.TouchableOpacity`
  flex: 0.15;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
  background-color: transparent;
`;

const TextContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const NoneTitle = styled.Text`
  padding-horizontal: 15;
  font-size: ${normalize(16)};
  text-align: center;
  ${fonts.fontPrimary};
`;

const MarkAllAsReadButtonContainer = styled.View`
  margin-top: 0;
  margin-bottom: 20;
`;

const ContentBlock = styled.View`
  flex: 1;
`;

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

  constructor(props) {
    super(props);

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
    const updateTimeMap = {};

    this.notifications().forEach(notification => {
      const repoName = notification.repository.full_name;

      updateTimeMap[repoName] =
        updateTimeMap[repoName] || notification.update_time;
    });

    return Object.keys(updateTimeMap).sort((a, b) => {
      return new Date(a) - new Date(b);
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
      repoId: fullName,
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
      repoId: fullName,
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
            <MarkAllAsReadButtonContainer>
              <Button
                icon={{ name: 'check', type: 'octicon' }}
                onPress={() => markAllNotificationsAsRead()}
                title={t('Mark all as read')}
              />
            </MarkAllAsReadButtonContainer>
          )}

        <RepositoryContainer>
          <HeaderContainer>
            <RepositoryOwnerAvatar
              source={{
                uri: this.getImage(item),
              }}
            />

            <RepositoryTitle onPress={() => this.navigateToRepo(item)}>
              {item}
            </RepositoryTitle>

            <MarkAsReadIconRepo onPress={() => markRepoAsRead(item)}>
              <Icon
                color={colors.greyDark}
                size={28}
                name="check"
                type="octicon"
              />
            </MarkAsReadIconRepo>
          </HeaderContainer>

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
        </RepositoryContainer>
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
        <Container>
          <StyledSafeAreaView />

          <ButtonGroupWrapper>
            <StyledButtonGroup
              onPress={this.switchType}
              selectedIndex={type}
              buttons={[
                t('Unread', locale),
                t('Participating', locale),
                t('All', locale),
              ]}
            />
          </ButtonGroupWrapper>

          <ContentBlock onLayout={this.saveContentBlockHeight}>
            {isRetrievingNotifications && (
              <TextContainer height={contentBlockHeight}>
                <LoadingContainer
                  animating={isRetrievingNotifications}
                  text={t('Retrieving notifications', locale)}
                  center
                />
              </TextContainer>
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
                    <TextContainer height={contentBlockHeight}>
                      <NoneTitle>
                        {t(
                          "You don't have any notifications of this type",
                          locale
                        )}
                      </NoneTitle>
                    </TextContainer>
                  )
                }
              />
            )}
          </ContentBlock>
        </Container>
      </ViewContainer>
    );
  }
}

export const NotificationsScreen = connect(mapStateToProps, mapDispatchToProps)(
  Notifications
);
