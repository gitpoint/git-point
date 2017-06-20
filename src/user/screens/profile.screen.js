import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  ActionSheetIOS,
  Dimensions
} from 'react-native';
import { ListItem } from 'react-native-elements';

import {
  ViewContainer,
  UserProfile,
  SectionList,
  ParallaxScroll,
  UserListItem
} from 'components';

import { colors } from 'config';
import Communications from 'react-native-communications';

import { connect } from 'react-redux';
import { getUserInfo, changeFollowStatus } from '../user.action';

const mapStateToProps = state => ({
  user: state.user.user,
  orgs: state.user.orgs,
  isFollowing: state.user.isFollowing,
  isPendingUser: state.user.isPendingUser,
  isPendingOrgs: state.user.isPendingOrgs,
  isPendingCheckFollowing: state.user.isPendingCheckFollowing
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: user => dispatch(getUserInfo(user)),
  changeFollowStatus: (user, isFollowing) =>
    dispatch(changeFollowStatus(user, isFollowing))
});

class Profile extends Component {
  props: {
    getUserInfo: Function,
    changeFollowStatus: Function,
    user: Object,
    orgs: Array,
    isFollowing: boolean,
    isPendingUser: boolean,
    isPendingOrgs: boolean,
    isPendingCheckFollowing: boolean,
    navigation: Object
  };

  componentDidMount() {
    this.props.getUserInfo(this.props.navigation.state.params.user.login);
  }

  getUserBlog(url) {
    const prefix = 'http';
    return url.substr(0, prefix.length) === prefix ? url : `http://${url}`;
  }

  showMenuActionSheet() {
    const { user, isFollowing, changeFollowStatus } = this.props;
    const userActions = [isFollowing ? 'Unfollow' : 'Follow'];
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'User Actions',
        options: [...userActions, 'Cancel'],
        cancelButtonIndex: 1
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          changeFollowStatus(user.login, isFollowing);
        }
      }
    );
  }

  render() {
    const {
      user,
      orgs,
      isFollowing,
      isPendingUser,
      isPendingOrgs,
      isPendingCheckFollowing,
      navigation
    } = this.props;
    const initialUser = navigation.state.params.user;
    const isPending = isPendingUser || isPendingOrgs;

    return (
      <ViewContainer barColor="light">

        <ParallaxScroll
          renderContent={() => (
            <UserProfile
              type="user"
              initialUser={initialUser}
              isFollowing={
                isPendingUser || isPendingCheckFollowing ? false : isFollowing
              }
              user={initialUser.login === user.login ? user : {}}
              navigation={navigation}
            />
          )}
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
            ((user.email !== null && user.email !== '') ||
              (user.blog !== null && user.blog !== '')) &&
            <SectionList title="LINKS">
              {user.email !== null &&
                user.email !== '' &&
                <ListItem
                  title="Email"
                  titleStyle={styles.listTitle}
                  leftIcon={{
                    name: 'mail',
                    color: colors.grey,
                    type: 'octicon'
                  }}
                  subtitle={user.email}
                  subtitleStyle={styles.listSubTitle}
                  onPress={() =>
                    Communications.email([user.email], null, null, 'Hi!', '')}
                  underlayColor={colors.greyLight}
                />}

              {user.blog !== null &&
                user.blog !== '' &&
                <ListItem
                  title="Website"
                  titleStyle={styles.listTitle}
                  leftIcon={{
                    name: 'link',
                    color: colors.grey,
                    type: 'octicon'
                  }}
                  subtitle={user.blog}
                  subtitleStyle={styles.listSubTitle}
                  onPress={() =>
                    Communications.web(this.getUserBlog(user.blog))}
                  underlayColor={colors.greyLight}
                />}
            </SectionList>}

          {!isPending &&
            initialUser.login === user.login &&
            <SectionList
              title="ORGANIZATIONS"
              noItems={orgs.length === 0}
              noItemsMessage={'No organizations'}
            >
              {orgs.map((item, i) => (
                <UserListItem key={i} user={item} navigation={navigation} />
              ))}
            </SectionList>}

        </ParallaxScroll>
      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  listTitle: {
    color: colors.black,
    fontFamily: 'AvenirNext-Medium'
  },
  listSubTitle: {
    color: colors.greyDark,
    fontFamily: 'AvenirNext-Medium'
  }
});

export const ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(
  Profile
);
