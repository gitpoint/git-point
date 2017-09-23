import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';

import { ViewContainer, UserListItem, LoadingUserListItem } from 'components';
import { loadFollowers } from '../user.action';

const mapStateToProps = (state, ownProps) => {
  const login = ownProps.navigation.state.params.user.login.toLowerCase();

  const { entities: { users }, pagination: { followersByUser } } = state;

  const followersPagination = followersByUser[login] || { ids: [] };
  const followers = followersPagination.ids.map(id => users[id]);

  return {
    login,
    followers,
    followersPagination,
    user: users[login],
  };
};

const loadData = ({ login, getFollowers }) => {
  getFollowers(login);
};

class FollowerList extends Component {
  props: {
    getFollowers: Function,
    login: String,
    followers: Array,
    isPendingFollowers: boolean,
    navigation: Object,
  };

  componentWillMount() {
    loadData(this.props);
  }

  componentDidMount() {
    loadData(this.props);
  }

  keyExtractor = item => {
    return item.id;
  };

  render() {
    const {
      login,
      getFollowers,
      followers,
      isPendingFollowers,
      navigation,
    } = this.props;
    const followerCount = navigation.state.params.followerCount;

    return (
      <ViewContainer>
        {isPendingFollowers &&
          [...Array(followerCount)].map((item, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <LoadingUserListItem key={index} />;
          })}

        {!isPendingFollowers &&
          <View>
            <FlatList
              data={followers}
              keyExtractor={this.keyExtractor}
              renderItem={({ item }) =>
                <UserListItem
                  user={item}
                  navigation={navigation}
                  showFullName
                />}
              onEndReachedThreshold={0.5}
              onEndReached={() => getFollowers(login, true)}
            />
          </View>}
      </ViewContainer>
    );
  }
}

export const FollowerListScreen = connect(mapStateToProps, {
  getFollowers: loadFollowers,
})(FollowerList);
