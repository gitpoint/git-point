import React, { Component, PropTypes } from "react";
import { FlatList, View } from "react-native";
import SearchBar from "react-native-search-bar";

import ViewContainer from "../components/ViewContainer";
import UserListItem from "../components/UserListItem";
import LoadingUserListItem from "../components/LoadingUserListItem";

import { connect } from "react-redux";
import { getFollowers } from "../actions/user";

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

export default connect(mapStateToProps, mapDispatchToProps)(FollowerList);
