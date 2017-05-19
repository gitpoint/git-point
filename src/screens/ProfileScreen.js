import React, { Component, PropTypes } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { ListItem } from "react-native-elements";

import { withNavigationFocus } from '../hoc/withNavigationFocus';

import ViewContainer from "../components/ViewContainer";
import UserProfile from "../components/UserProfile";
import SectionList from "../components/SectionList";
import ParallaxScroll from "../components/ParallaxScroll";
import UserListItem from "../components/UserListItem";

import colors from "../config/colors";
import Communications from "react-native-communications";

import { connect } from "react-redux";
import { getUser, getOrgs } from "../actions/user";

const mapStateToProps = state => ({
  user: state.user.user,
  orgs: state.user.orgs,
  isPendingUser: state.user.isPendingUser,
  isPendingOrgs: state.user.isPendingOrgs
});

const mapDispatchToProps = dispatch => ({
  getUser: user => dispatch(getUser(user)),
  getOrgs: user => dispatch(getOrgs(user))
});

class Profile extends Component {
  componentDidMount() {
    this.loadScreen();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isFocused !== this.props.isFocused && newProps.isFocused && this.props.navigation.state.params.user.login !== this.props.user.login) {
      this.loadScreen();
    }
  }

  loadScreen() {
    this.props.getUser(this.props.navigation.state.params.user.login);
    this.props.getOrgs(this.props.navigation.state.params.user.login);
  }

  getUserBlog(url) {
    const prefix = 'http';
    return url.substr(0, prefix.length) === prefix ? url : `http://${url}`
  }

  render() {
    const { user, orgs, isPendingUser, isPendingOrgs, navigation } = this.props;
    const initialUser = navigation.state.params.user;
    const isPending = isPendingUser || isPendingOrgs;

    return (
      <ViewContainer barColor="light">

        <ParallaxScroll
          renderContent={() => (
            <UserProfile
              type="user"
              initialUser={initialUser}
              user={initialUser.login === user.login ? user : {}}
              navigation={navigation}
            />
          )}
          stickyTitle={user.login}
          navigateBack
          navigation={navigation}
        >

          {isPending &&
            <ActivityIndicator
              animating={isPending}
              style={{ height: 80 }}
              size="large"
            />}

          {!isPending && initialUser.login === user.login &&
            ((user.email !== null && user.email !== '') || (user.blog !== null && user.blog !== '')) &&
            <SectionList title="LINKS">
              {user.email !== null && user.email !== '' &&
                <ListItem
                  title="Email"
                  titleStyle={styles.listTitle}
                  leftIcon={{
                    name: "mail",
                    color: colors.grey,
                    type: "octicon"
                  }}
                  subtitle={user.email}
                  subtitleStyle={styles.listSubTitle}
                  onPress={() =>
                    Communications.email([user.email], null, null, "Hi!", "")}
                  underlayColor={colors.greyLight}
                />}

              {user.blog !== null && user.blog !== '' &&
                <ListItem
                  title="Website"
                  titleStyle={styles.listTitle}
                  leftIcon={{
                    name: "link",
                    color: colors.grey,
                    type: "octicon"
                  }}
                  subtitle={user.blog}
                  subtitleStyle={styles.listSubTitle}
                  onPress={() => Communications.web(this.getUserBlog(user.blog))}
                  underlayColor={colors.greyLight}
                />}
            </SectionList>}

          {!isPending && initialUser.login === user.login &&
            <SectionList 
              title="ORGANIZATIONS"
              noItems={orgs.length === 0}
              noItemsMessage={'No organizations'}>
              {orgs.map((item, i) => (
                <UserListItem key={i} user={item} navigation={navigation} />
              ))}
            </SectionList>}
          
        </ParallaxScroll>
      </ViewContainer>
    );
  }
}

Profile.propTypes = {
  getUser: PropTypes.func,
  getOrgs: PropTypes.func,
  user: PropTypes.object,
  orgs: PropTypes.array,
  isPendingUser: PropTypes.bool,
  isPendingOrgs: PropTypes.bool,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  listTitle: {
    color: colors.black,
    fontFamily: "AvenirNext-Medium"
  },
  listSubTitle: {
    color: colors.greyDark,
    fontFamily: "AvenirNext-Medium"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigationFocus(Profile, 'Profile'));
