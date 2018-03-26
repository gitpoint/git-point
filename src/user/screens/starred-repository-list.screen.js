import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, ActivityIndicator } from 'react-native';

import { RestClient } from 'api';
import {
  ViewContainer,
  RepositoryListItem,
  LoadingRepositoryListItem,
} from 'components';

const mapStateToProps = (state, ownProps) => {
  const {
    auth: { user },
    pagination: { ACTIVITY_GET_STARRED_REPOS_FOR_USER },
    entities: { repos },
  } = state;

  const userId = ownProps.navigation.state.params.user.login;

  const starredReposPagination = ACTIVITY_GET_STARRED_REPOS_FOR_USER[
    userId
  ] || {
    ids: [],
    isFetching: true,
  };
  const starredRepos = starredReposPagination.ids.map(id => repos[id]);

  return {
    user,
    starredReposPagination,
    starredRepos,
    userId,
  };
};

const mapDispatchToProps = {
  getStarredReposForUser: RestClient.activity.getStarredReposForUser,
};

class StarredRepositoryList extends Component {
  props: {
    userId: String,
    starredRepos: Array,
    starredReposPagination: Object,
    getStarredReposForUser: Function,
    navigation: Object,
  };

  componentWillMount() {
    const { getStarredReposForUser, userId } = this.props;

    getStarredReposForUser(userId);
  }

  renderFooter = () => {
    if (this.props.starredReposPagination.nextPageUrl === null) {
      return null;
    }

    return (
      <View
        style={{
          paddingVertical: 20,
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    const {
      starredReposPagination,
      starredRepos,
      userId,
      navigation,
    } = this.props;

    const repoCount = navigation.state.params.repoCount;
    const isPendingStarredRepositories =
      starredRepos.length === 0 && starredReposPagination.isFetching;

    return (
      <ViewContainer>
        {isPendingStarredRepositories &&
          [...Array(repoCount)].map(
            (item, index) => <LoadingRepositoryListItem key={index} /> // eslint-disable-line react/no-array-index-key
          )}
        {!isPendingStarredRepositories && (
          <FlatList
            data={starredRepos}
            onRefresh={() =>
              this.props.getStarredReposForUser(userId, {
                forceRefresh: true,
              })
            }
            refreshing={!starredRepos && starredReposPagination.isFetching}
            onEndReached={() =>
              this.props.getStarredReposForUser(userId, { loadMore: true })
            }
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
            renderItem={({ item }) => (
              <RepositoryListItem repository={item} navigation={navigation} />
            )}
          />
        )}
      </ViewContainer>
    );
  }
}

export const StarredRepositoryListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(StarredRepositoryList);
