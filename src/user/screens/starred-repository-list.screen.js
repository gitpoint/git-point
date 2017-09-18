import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { colors } from 'config';

import { getStarredRepositories, addStarredRepositories } from 'user';

import {
  ViewContainer,
  RepositoryListItem,
  LoadingRepositoryListItem,
  SearchBar,
} from 'components';

import { fetchUrl, USER_ENDPOINT } from 'api';

const mapStateToProps = state => ({
  user: state.user.user,
  isPendingStarredRepositories: state.user.isPendingStarredRepositories,
  starredRepositories: state.user.starredRepositories,
});

const mapDispatchToProps = dispatch => ({
  getStarredRepositories: (user, type) =>
    dispatch(getStarredRepositories(user, type)),
  addStarredRepositories: (user, page, type) =>
    dispatch(addStarredRepositories(user, page, type)),
});

const styles = {
  listContainer: {
    backgroundColor: colors.white,
  },
};

class StarredRepositoryList extends Component {
  props: {
    user: Object,
    starredRepositories: Array,
    navigation: Object,
  };

  constructor() {
    super();
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const user = this.props.navigation.state.params.user;
    const { starredRepositories } = this.props;
    this.props.getStarredRepositories(user);
  }

  getMoreStarredRepositories = () => {
    const user = this.props.navigation.state.params.user;
    const {
      isPendingStarredRepositories,
      addStarredRepositories,
      starredRepositories,
    } = this.props;

    if (!isPendingStarredRepositories) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => addStarredRepositories(user, this.state.page)
      );
    }
  };

  render() {
    const {
      starredRepositories,
      navigation,
      addStarredRepositories,
    } = this.props;

    return (
      <ViewContainer>
        <FlatList
          data={starredRepositories}
          onEndReachedThreshold={0.5}
          onEndReached={this.getMoreStarredRepositories}
          renderItem={({ item }) =>
            <RepositoryListItem repository={item} navigation={navigation} />}
        />
      </ViewContainer>
    );
  }
}

export const StarredRepositoryListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(StarredRepositoryList);
