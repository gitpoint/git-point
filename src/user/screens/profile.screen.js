import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  View,
  RefreshControl,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';

import {
  ViewContainer,
  UserProfile,
  SectionList,
  ParallaxScroll,
  UserListItem,
  EntityInfo,
} from 'components';
import { emojifyText, translate } from 'utils';
import { colors, fonts } from 'config';
import { getUserInfo, getStarCount, getIsFollowing, getIsFollower, changeFollowStatus } from '../user.action';

const mapStateToProps = state => ({
  auth: state.auth.user,
  user: state.user.user,
  orgs: state.user.orgs,
  starCount: state.user.starCount,
  language: state.auth.language,
  isFollowing: state.user.isFollowing,
  isFollower: state.user.isFollower,
  isPendingUser: state.user.isPendingUser,
  isPendingOrgs: state.user.isPendingOrgs,
  isPendingStarCount: state.user.isPendingStarCount,
  isPendingCheckFollowing: state.user.isPendingCheckFollowing,
  isPendingCheckFollower: state.user.isPendingCheckFollower,
});

const mapDispatchToProps = dispatch => ({
  getUserInfoByDispatch: user => dispatch(getUserInfo(user)),
  getUserStarCountByDispatch: user => dispatch(getStarCount(user)),
  getIsFollowingByDispatch: (user, auth) => dispatch(getIsFollowing(user, auth)),
  getIsFollowerByDispatch: (user, auth) => dispatch(getIsFollower(user, auth)),
  changeFollowStatusByDispatch: (user, isFollowing) =>
    dispatch(changeFollowStatus(user, isFollowing)),
});

const styles = StyleSheet.create({
  listTitle: {
    color: colors.black,
    ...fonts.fontPrimary,
  },
  listSubTitle: {
    color: colors.greyDark,
    ...fonts.fontPrimary,
  },
});

class Profile extends Component {
  props: {
    getUserInfoByDispatch: Function,
    getUserStarCountByDispatch: Function,
    getIsFollowingByDispatch: Function,
    getIsFollowerByDispatch: Function,
    changeFollowStatusByDispatch: Function,
    auth: Object,
    user: Object,
    orgs: Array,
    starCount: string,
    language: string,
    isFollowing: boolean,
    isFollower: boolean,
    isPendingUser: boolean,
    isPendingOrgs: boolean,
    isPendingStarCount: boolean,
    isPendingCheckFollowing: boolean,
    isPendingCheckFollower: boolean,
    navigation: Object,
  };

  state: {
    refreshing: boolean,
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    const user = this.props.navigation.state.params.user;
    const auth = this.props.auth;

    this.props.getUserInfoByDispatch(user.login);
    this.props.getUserStarCountByDispatch(user.login);
    this.props.getIsFollowingByDispatch(user.login, auth.login);
    this.props.getIsFollowerByDispatch(user.login, auth.login);
  }

  getUserInfo = () => {
    this.setState({ refreshing: true });

    const user = this.props.navigation.state.params.user;
    const auth = this.props.auth;

    Promise.all([
      this.props.getUserInfoByDispatch(user.login),
      this.props.getUserStarCountByDispatch(user.login),
      this.props.getIsFollowingByDispatch(user.login, auth.login),
      this.props.getIsFollowerByDispatch(user.login, auth.login),
    ]).then(() => {
      this.setState({ refreshing: false });
    });
  };

  showMenuActionSheet = () => {
    this.ActionSheet.show();
  };

  handlePress = index => {
    const { user, isFollowing, changeFollowStatusByDispatch } = this.props;

    if (index === 0) {
      changeFollowStatusByDispatch(user.login, isFollowing);
    }
  };

  render() {
    const {
      user,
      orgs,
      starCount,
      language,
      isFollowing,
      isFollower,
      isPendingUser,
      isPendingOrgs,
      isPendingStarCount,
      isPendingCheckFollowing,
      isPendingCheckFollower,
      navigation,
    } = this.props;
    const { refreshing } = this.state;
    const initialUser = navigation.state.params.user;
    const isPending = isPendingUser || isPendingOrgs;
    const userActions = [
      isFollowing
        ? translate('user.profile.unfollow', language)
        : translate('user.profile.follow', language),
    ];

    return (
      <ViewContainer>
        <ParallaxScroll
          renderContent={() =>
            <UserProfile
              type="user"
              initialUser={initialUser}
              starCount={
                isPendingStarCount ? '' : starCount
              }
              isFollowing={
                isPendingUser || isPendingCheckFollowing ? false : isFollowing
              }
              isFollower={
                isPendingUser || isPendingCheckFollower ? false : isFollower
              }
              user={initialUser.login === user.login ? user : {}}
              language={language}
              navigation={navigation}
            />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.getUserInfo}
            />
          }
          stickyTitle={user.login}
          showMenu={
            !isPendingUser &&
            !isPendingCheckFollowing &&
            initialUser.login === user.login
          }
          menuAction={() => this.showMenuActionSheet()}
          navigateBack
          navigation={navigation}
        >
          {isPending &&
            <ActivityIndicator
              animating={isPending}
              style={{ height: Dimensions.get('window').height / 3 }}
              size="large"
            />}

          {!isPending &&
            initialUser.login === user.login &&
            <View>
              {!!user.bio &&
                user.bio !== '' &&
                <SectionList title={translate('common.bio', language)}>
                  <ListItem
                    subtitle={emojifyText(user.bio)}
                    subtitleStyle={styles.listSubTitle}
                    hideChevron
                  />
                </SectionList>}

              <EntityInfo entity={user} orgs={orgs} navigation={navigation} />

              <SectionList
                title={translate('common.orgs', language)}
                noItems={orgs.length === 0}
                noItemsMessage={translate('common.noOrgsMessage', language)}
              >
                {orgs.map(item =>
                  <UserListItem
                    key={item.id}
                    user={item}
                    navigation={navigation}
                  />
                )}
              </SectionList>
            </View>}
        </ParallaxScroll>

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={translate('user.profile.userActions', language)}
          options={[...userActions, translate('common.cancel', language)]}
          cancelButtonIndex={1}
          onPress={this.handlePress}
        />
      </ViewContainer>
    );
  }
}

export const ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(
  Profile
);
