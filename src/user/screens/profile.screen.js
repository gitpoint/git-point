/* eslint-disable no-shadow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ActivityIndicator,
  Dimensions,
  View,
  RefreshControl,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';
import { SafeAreaView } from 'react-navigation';

import {
  ViewContainer,
  UserProfile,
  SectionList,
  ParallaxScroll,
  UserListItem,
  EntityInfo,
} from 'components';
import { emojifyText, t, openURLInView } from 'utils';
import { colors, fonts, getHeaderForceInset } from 'config';
import {
  getUserInfo,
  getStarCount,
  getIsFollowing,
  getIsFollower,
  changeFollowStatus,
} from '../user.action';

const mapStateToProps = state => ({
  auth: state.auth.user,
  user: state.user.user,
  orgs: state.user.orgs,
  starCount: state.user.starCount,
  locale: state.auth.locale,
  isFollowing: state.user.isFollowing,
  isFollower: state.user.isFollower,
  isPendingUser: state.user.isPendingUser,
  isPendingOrgs: state.user.isPendingOrgs,
  isPendingStarCount: state.user.isPendingStarCount,
  isPendingCheckFollowing: state.user.isPendingCheckFollowing,
  isPendingCheckFollower: state.user.isPendingCheckFollower,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUserInfo,
      getStarCount,
      getIsFollowing,
      getIsFollower,
      changeFollowStatus,
    },
    dispatch
  );

const StyledSafeAreaView = styled(SafeAreaView).attrs({
  forceInset: getHeaderForceInset('Profile'),
})`
  background-color: ${colors.primaryDark};
`;

const BioListItem = styled(ListItem).attrs({
  containerStyle: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  titleStyle: {
    color: colors.greyDark,
    ...fonts.fontPrimary,
  },
})``;

class Profile extends Component {
  props: {
    getUserInfo: Function,
    getStarCount: Function,
    getIsFollowing: Function,
    getIsFollower: Function,
    changeFollowStatus: Function,
    auth: Object,
    user: Object,
    orgs: Array,
    starCount: string,
    locale: string,
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
    this.getUserInfo();
  }

  getUserInfo = () => {
    this.setState({ refreshing: true });

    const user = this.props.navigation.state.params.user;
    const auth = this.props.auth;

    Promise.all([
      this.props.getUserInfo(user.login),
      this.props.getStarCount(user.login),
      this.props.getIsFollowing(user.login, auth.login),
      this.props.getIsFollower(user.login, auth.login),
    ]).then(() => {
      this.setState({ refreshing: false });
    });
  };

  showMenuActionSheet = () => {
    this.ActionSheet.show();
  };

  handlePress = index => {
    const { user, isFollowing, changeFollowStatus } = this.props;

    if (index === 0) {
      changeFollowStatus(user.login, isFollowing);
    } else if (index === 1) {
      openURLInView(user.html_url);
    }
  };

  render() {
    const {
      user,
      orgs,
      starCount,
      locale,
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
    const isPending =
      isPendingUser ||
      isPendingOrgs ||
      isPendingStarCount ||
      isPendingCheckFollowing ||
      isPendingCheckFollower;
    const userActions = [
      isFollowing ? t('Unfollow', locale) : t('Follow', locale),
      t('Open in Browser', locale),
    ];

    return (
      <ViewContainer>
        <StyledSafeAreaView />

        <ParallaxScroll
          renderContent={() => (
            <UserProfile
              type="user"
              initialUser={initialUser}
              starCount={!isPending ? starCount : ''}
              isFollowing={!isPending ? isFollowing : false}
              isFollower={!isPending ? isFollower : false}
              user={!isPending ? user : {}}
              locale={locale}
              navigation={navigation}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || isPending}
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
          {isPending && (
            <ActivityIndicator
              animating={isPending}
              style={{ height: Dimensions.get('window').height / 3 }}
              size="large"
            />
          )}

          {!isPending &&
            initialUser.login === user.login && (
              <View>
                {!!user.bio &&
                  user.bio !== '' && (
                    <SectionList title={t('BIO', locale)}>
                      <BioListItem
                        titleNumberOfLines={0}
                        title={emojifyText(user.bio)}
                        hideChevron
                      />
                    </SectionList>
                  )}

                <EntityInfo
                  entity={user}
                  orgs={orgs}
                  navigation={navigation}
                  locale={locale}
                />

                <SectionList
                  title={t('ORGANIZATIONS', locale)}
                  noItems={orgs.length === 0}
                  noItemsMessage={t('No organizations', locale)}
                >
                  {orgs.map(item => (
                    <UserListItem
                      key={item.id}
                      user={item}
                      navigation={navigation}
                    />
                  ))}
                </SectionList>
              </View>
            )}
        </ParallaxScroll>

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={t('User Actions', locale)}
          options={[...userActions, t('Cancel', locale)]}
          cancelButtonIndex={2}
          onPress={this.handlePress}
        />
      </ViewContainer>
    );
  }
}

export const ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(
  Profile
);
