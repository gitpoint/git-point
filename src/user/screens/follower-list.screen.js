import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatList, View } from 'react-native';

import { ViewContainer, UserListItem, LoadingUserListItem } from 'components';
import { getFollowers } from 'user';

const mapStateToProps = state => ({
  user: state.user.user,
  followers: state.user.followers,
  isPendingFollowers: state.user.isPendingFollowers,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFollowers,
    },
    dispatch
  );

class FollowerList extends Component {
  props: {
    getFollowers: Function,
    followers: Array,
    isPendingFollowers: boolean,
    navigation: Object,
  };

  componentDidMount() {
    const user = this.props.navigation.state.params.user;

    this.props.getFollowers(user);
  }

  keyExtractor = item => {
    return item.id;
  };

  render() {
    const { followers, isPendingFollowers, navigation } = this.props;
    const followerCount = navigation.state.params.followerCount;

    return (
      <ViewContainer>
        {isPendingFollowers &&
          [...Array(followerCount)].map((item, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <LoadingUserListItem key={index} />;
          })}

        {!isPendingFollowers && (
          <View>
            <FlatList
              data={followers}
              keyExtractor={this.keyExtractor}
              renderItem={({ item }) => (
                <UserListItem
                  user={item}
                  navigation={navigation}
                  showFullName
                />
              )}
            />
          </View>
        )}
      </ViewContainer>
    );
  }
}

export const FollowerListScreen = connect(mapStateToProps, mapDispatchToProps)(
  FollowerList
);
