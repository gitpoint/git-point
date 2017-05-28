import React, {Component, PropTypes} from 'react';
import {FlatList, View} from 'react-native';

import {ViewContainer, UserListItem, LoadingUserListItem} from "@components"

import {connect} from 'react-redux';
import {getFollowing} from '@user';

const mapStateToProps = state => ({
  user: state.user.user,
  following: state.user.following,
  isPendingFollowing: state.user.isPendingFollowing,
});

const mapDispatchToProps = dispatch => ({
  getFollowing: (user, type) => dispatch(getFollowing(user, type)),
});

class FollowingList extends Component {
  componentDidMount() {
    const user = this.props.navigation.state.params.user;
    this.props.getFollowing(user);
  }

  render() {
    const {following, isPendingFollowing, navigation} = this.props;
    const followingCount = navigation.state.params.followingCount;

    return (
      <ViewContainer>

        {isPendingFollowing &&
          [...Array(followingCount)].map((item, i) => (
            <LoadingUserListItem key={i} />
          ))}

        {!isPendingFollowing &&
        <View>
          

          <FlatList
            data={following}
            keyExtractor={this.keyExtractor}
            renderItem={({item}) => (<UserListItem user={item} navigation={navigation} />)}
          />
          </View>}
      </ViewContainer>
    );
  }

  keyExtractor = item => {
    return item.id;
  };
}

FollowingList.propTypes = {
  getFollowing: PropTypes.func,
  following: PropTypes.array,
  isPendingFollowing: PropTypes.bool,
  navigation: PropTypes.object,
};

export const FollowingListScreen = connect(mapStateToProps, mapDispatchToProps)(FollowingList);
