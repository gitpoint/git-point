import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ActivityIndicator, Dimensions, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';
import Communications from 'react-native-communications';

import {
  ViewContainer,
  UserProfile,
  SectionList,
  ParallaxScroll,
  UserListItem,
} from 'components';
import { colors, fonts } from 'config';
import { getUserInfo, changeFollowStatus } from '../user.action';

const mapStateToProps = state => ({
  user: state.user.user,
  orgs: state.user.orgs,
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
    user: Object,
    orgs: Array,
    isFollowing: boolean,
    isPendingUser: boolean,
    isPendingOrgs: boolean,
    isPendingCheckFollowing: boolean,
    navigation: Object,
  };

  componentDidMount() {
    this.props.getUserInfoByDispatch(
      this.props.navigation.state.params.user.login
    );
  }

  getUserBlog = url => {
    const prefix = 'http';

    return url.substr(0, prefix.length) === prefix ? url : `http://${url}`;
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
      isFollowing,
      isPendingUser,
      isPendingOrgs,
      isPendingCheckFollowing,
      navigation,
    } = this.props;

    const initialUser = navigation.state.params.user;
    const isPending = isPendingUser || isPendingOrgs;
    const userActions = [isFollowing ? 'Unfollow' : 'Follow'];

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
              user={initialUser.login === user.login ? user : {}}
              navigation={navigation}
            />}
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
              {user.bio &&
                user.bio !== '' &&
                <SectionList title="BIO">
                  <ListItem
                    subtitle={user.bio}
                    subtitleStyle={styles.listSubTitle}
                    hideChevron
                  />
                </SectionList>}

              <SectionList
                title="EMAIL"
                noItems={!user.email || user.email === ''}
                noItemsMessage={'No email associated with account'}
              >
                <ListItem
                  title="Email"
                  titleStyle={styles.listTitle}
                  leftIcon={{
                    name: 'mail',
                    color: colors.grey,
                    type: 'octicon',
                  }}
                  subtitle={user.email}
                  subtitleStyle={styles.listSubTitle}
                  onPress={() =>
                    Communications.email([user.email], null, null, 'Hi!', '')}
                  underlayColor={colors.greyLight}
                />
              </SectionList>

              <SectionList
                title="WEBSITE"
                noItems={!user.blog || user.blog === ''}
                noItemsMessage={'No website associated with account'}
              >
                <ListItem
                  title={'Website'}
                  titleStyle={styles.listTitle}
                  leftIcon={{
                    name: 'link',
                    color: colors.grey,
                    type: 'octicon',
                  }}
                  subtitle={user.blog}
                  subtitleStyle={styles.listSubTitle}
                  onPress={() =>
                    Communications.web(this.getUserBlog(user.blog))}
                  underlayColor={colors.greyLight}
                />
              </SectionList>

              <SectionList
                title="ORGANIZATIONS"
                noItems={orgs.length === 0}
                noItemsMessage={'No organizations'}
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
          title="User Actions"
          options={[...userActions, 'Cancel']}
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
