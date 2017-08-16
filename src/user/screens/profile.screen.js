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
import { getUserInfo, changeFollowStatus } from '../user.action';

const mapStateToProps = state => ({
  auth: state.auth.user,
  user: state.user.user,
  followers: state.user.followers,
  orgs: state.user.orgs,
  language: state.auth.language,
  isFollowing: state.user.isFollowing,
  isPendingUser: state.user.isPendingUser,
  isPendingOrgs: state.user.isPendingOrgs,
  isPendingCheckFollowing: state.user.isPendingCheckFollowing,
});

const mapDispatchToProps = dispatch => ({
  getUserInfoByDispatch: user => dispatch(getUserInfo(user)),
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
    changeFollowStatusByDispatch: Function,
    auth: Object,
    user: Object,
    followers: Array,
    orgs: Array,
    language: string,
    isFollowing: boolean,
    isPendingUser: boolean,
    isPendingOrgs: boolean,
    isPendingCheckFollowing: boolean,
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
    this.props.getUserInfoByDispatch(
      this.props.navigation.state.params.user.login
    );
  }

  getUserInfo = () => {
    this.setState({ refreshing: true });

    this.props
      .getUserInfoByDispatch(this.props.navigation.state.params.user.login)
      .then(() => {
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

  isFollower = () => {
    const { auth, followers } = this.props;

    return followers.filter(follower => follower.login === auth).legth > 0;
  };

  render() {
    const {
      user,
      orgs,
      language,
      isFollowing,
      isPendingUser,
      isPendingOrgs,
      isPendingCheckFollowing,
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
              isFollowing={
                isPendingUser || isPendingCheckFollowing ? false : isFollowing
              }
              isFollower={this.isFollower}
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
