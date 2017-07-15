import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';

import { ViewContainer, UserListItem, LoadingUserListItem } from 'components';
import { getFollowing } from 'user';

const mapStateToProps = state => ({
  user: state.user.user,
  following: state.user.following,
  isPendingFollowing: state.user.isPendingFollowing,
});

const mapDispatchToProps = dispatch => ({
  getFollowing: (user, type) => dispatch(getFollowing(user, type)),
});

class FollowingList extends Component {
  props: {
    getFollowing: Function,
    following: Array,
    isPendingFollowing: boolean,
    navigation: Object,
  };

  componentDidMount() {
    const user = this.props.navigation.state.params.user;

    this.props.getFollowing(user);
  }

  keyExtractor = item => {
    return item.id;
  };

  render() {
    const { following, isPendingFollowing, navigation } = this.props;
    const followingCount = navigation.state.params.followingCount;

    return (
      <ViewContainer>
        {isPendingFollowing &&
          [...Array(followingCount)].map((item, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <LoadingUserListItem key={index} />;
          })}

        {!isPendingFollowing &&
          <View>
            <FlatList
              data={following}
              keyExtractor={this.keyExtractor}
              renderItem={({ item }) =>
                <UserListItem user={item} navigation={navigation} />}
            />
          </View>}
      </ViewContainer>
    );
  }
}

export const FollowingListScreen = connect(mapStateToProps, mapDispatchToProps)(
  FollowingList
);
