import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getStarredRepositories, getMoreStarredRepositories } from 'user';

import { ViewContainer, RepositoryListItem } from 'components';

const mapStateToProps = state => ({
  user: state.user.user,
  isPendingStarredRepositories: state.user.isPendingStarredRepositories,
  starredRepositories: state.user.starredRepositories,
});

const mapDispatchToProps = dispatch => ({
  getStarredRepositories: (user, type) =>
    dispatch(getStarredRepositories(user, type)),
  getMoreStarredRepositories: (user, page, type) =>
    dispatch(getMoreStarredRepositories(user, page, type)),
});

class StarredRepositoryList extends Component {
  props: {
    user: Object,
    starredRepositories: Array,
    navigation: Object,
    isPendingStarredRepositories: boolean,
    getStarredRepositories: Function,
    getMoreStarredRepositories: Function,
  };

  constructor() {
    super();
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const user = this.props.navigation.state.params.user;

    this.props.getStarredRepositories(user);
  }

  getMoreRepositories = () => {
    const user = this.props.navigation.state.params.user;
    const { isPendingStarredRepositories } = this.props;

    if (!isPendingStarredRepositories) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.props.getMoreStarredRepositories(user, this.state.page);
        }
      );
    }
  };

  render() {
    const { starredRepositories, navigation } = this.props;

    return (
      <ViewContainer>
        <FlatList
          data={starredRepositories}
          onEndReachedThreshold={0.5}
          onEndReached={this.getMoreRepositories}
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
