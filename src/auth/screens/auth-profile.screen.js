import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

import {
  ViewContainer,
  UserProfile,
  SectionList,
  LoadingContainer,
  ParallaxScroll,
  UserListItem
} from "components";

import config from "config";
import Communications from "react-native-communications";

import { connect } from "react-redux";
import { getUser, getOrgs } from "auth";

const mapStateToProps = state => ({
  user: state.auth.user,
  orgs: state.auth.orgs,
  isPendingUser: state.auth.isPendingUser,
  isPendingOrgs: state.auth.isPendingOrgs
});

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUser()),
  getOrgs: () => dispatch(getOrgs())
});

class AuthProfile extends Component {
  props: {
    getUser: Function,
    getOrgs: Function,
    user: Object,
    orgs: Array,
    isPendingUser: boolean,
    isPendingOrgs: boolean,
    navigation: Object
  };

  componentDidMount() {
    this.props.getUser();
    this.props.getOrgs();
  }

  getUserBlog(url) {
    const prefix = "http";
    return url.substr(0, prefix.length) === prefix ? url : `http://${url}`;
  }

  render() {
    const { user, orgs, isPendingUser, isPendingOrgs, navigation } = this.props;

    return (
      <ViewContainer barColor="light">

        {(isPendingUser || isPendingOrgs || !user) &&
          <LoadingContainer
            animating={isPendingUser || isPendingOrgs || !user}
            center
          />}

        {!isPendingUser &&
          !isPendingOrgs &&
          user &&
          <ParallaxScroll
            renderContent={() => (
              <UserProfile
                type="user"
                initialUser={user}
                user={user}
                navigation={navigation}
              />
            )}
            stickyTitle={user.login}
          >

            {(user.email || user.blog) &&
              <SectionList title="LINKS">
                {user.email &&
                  <ListItem
                    title="Email"
                    titleStyle={styles.listTitle}
                    leftIcon={{
                      name: "mail",
                      color: config.colors.grey,
                      type: "octicon"
                    }}
                    subtitle={user.email}
                    subtitleStyle={styles.listSubTitle}
                    onPress={() =>
                      Communications.email([user.email], null, null, "Hi!", "")}
                    underlayColor={config.colors.greyLight}
                  />}

                {user.blog &&
                  <ListItem
                    title="Website"
                    titleStyle={styles.listTitle}
                    leftIcon={{
                      name: "link",
                      color: config.colors.grey,
                      type: "octicon"
                    }}
                    subtitle={user.blog}
                    subtitleStyle={styles.listSubTitle}
                    onPress={() =>
                      Communications.web(this.getUserBlog(user.blog))}
                    underlayColor={config.colors.greyLight}
                  />}
              </SectionList>}

            <SectionList
              title="ORGANIZATIONS"
              noItems={orgs.length === 0}
              noItemsMessage={"No organizations"}
            >
              {orgs.map((item, i) => (
                <UserListItem key={i} user={item} navigation={navigation} />
              ))}
            </SectionList>
          </ParallaxScroll>}
      </ViewContainer>
    );
  }
}

const styles = StyleSheet.create({
  listTitle: {
    color: config.colors.black,
    fontFamily: "AvenirNext-Medium"
  },
  listSubTitle: {
    color: config.colors.greyDark,
    fontFamily: "AvenirNext-Medium"
  }
});

export const AuthProfileScreen = connect(mapStateToProps, mapDispatchToProps)(
  AuthProfile
);
