import React, {Component, PropTypes} from 'react';
import {FlatList, View} from 'react-native';
import SearchBar from 'react-native-search-bar';

import ViewContainer from '../components/ViewContainer';
import UserListItem from '../components/UserListItem';
import LoadingUserListItem from '../components/LoadingUserListItem';

import {connect} from 'react-redux';
import {getFollowing} from '../actions/user';

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

export default connect(mapStateToProps, mapDispatchToProps)(FollowingList);
