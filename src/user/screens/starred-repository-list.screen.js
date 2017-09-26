import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getStarredRepositories, getMoreStarredRepositories } from 'user';

import {
  ViewContainer,
  RepositoryListItem,
  ScrollableRepositoryList,
  LoadingRepositoryListItem,
} from 'components';

const mapStateToProps = state => ({
  user: state.user.user,
  starredRepositories: state.user.starredRepositories,
  isPendingStarredRepositories: state.user.isPendingStarredRepositories,
  isPendingMoreStarredRepositories: state.user.isPendingMoreStarredRepositories,
  starredRepositoriesLastPage: state.user.starredRepositoriesLastPage,
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
    isPendingMoreStarredRepositories: boolean,
    getStarredRepositories: Function,
    getMoreStarredRepositories: Function,
    nelson: string,
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

  /*
  <FlatList
          data={starredRepositories}
          onEndReachedThreshold={0.5}
          onEndReached={this.getMoreRepositories}
          renderItem={({ item }) =>
            <RepositoryListItem repository={item} navigation={navigation} />}
        />

  */

  getMoreRepositories = () => {
    const user = this.props.navigation.state.params.user;
    const { isPendingStarredRepositories } = this.props;
    console.log('CALLL');
    console.log(isPendingStarredRepositories);
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
    const {
      starredRepositories,
      navigation,
      isPendingStarredRepositories,
      isPendingMoreStarredRepositories,
    } = this.props;
    console.log(this.props);
    console.log('RENDER STARRED REPOS');
    console.log(`isPendingRepositories ${isPendingStarredRepositories}`);
    console.log(
      `isPendingMORERepositories ${isPendingMoreStarredRepositories}`
    );
    return (
      <ViewContainer>
        {isPendingStarredRepositories &&
          [...Array(starredRepositories.length)].map((item, index) =>
            <LoadingRepositoryListItem key={index} />
          )}
        {!isPendingStarredRepositories &&
          <ScrollableRepositoryList
            getMoreRepositories={this.getMoreRepositories.bind(this)}
            repositories={starredRepositories}
            navigation={navigation}
            isLoadingMoreRepositories={isPendingMoreStarredRepositories}
          />}
      </ViewContainer>
    );
  }
}

export const StarredRepositoryListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(StarredRepositoryList);
