import React, { Component, PropTypes } from "react";
import { FlatList, View } from "react-native";

import {ViewContainer, UserListItem, LoadingUserListItem} from "@components";

import { connect } from "react-redux";
import { getFollowers } from "@user";

const mapStateToProps = state => ({
  user: state.user.user,
  followers: state.user.followers,
  isPendingFollowers: state.user.isPendingFollowers
});

const mapDispatchToProps = dispatch => ({
  getFollowers: (user, type) => dispatch(getFollowers(user, type))
});

class FollowerList extends Component {
  componentDidMount() {
    const user = this.props.navigation.state.params.user;
    this.props.getFollowers(user);
  }

  render() {
    const { followers, isPendingFollowers, navigation } = this.props;
    const followerCount = navigation.state.params.followerCount;

    return (
      <ViewContainer>

        {isPendingFollowers &&
          [...Array(followerCount)].map((item, i) => (
            <LoadingUserListItem key={i} />
          ))}

        {!isPendingFollowers &&
          <View>

            <FlatList
              data={followers}
              keyExtractor={this.keyExtractor}
              renderItem={({ item }) => (
                <UserListItem user={item} navigation={navigation} showFullName />
              )}
            />
          </View>}
      </ViewContainer>
    );
  }

  keyExtractor = item => {
    return item.id;
  };
}

FollowerList.propTypes = {
  getFollowers: PropTypes.func,
  followers: PropTypes.array,
  isPendingFollowers: PropTypes.bool,
  navigation: PropTypes.object
};

export const FollowerListScren = connect(mapStateToProps, mapDispatchToProps)(FollowerList);
