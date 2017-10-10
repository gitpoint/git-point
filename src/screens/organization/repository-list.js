/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RepositoryList } from 'components';

import { getRepos } from 'api/rest/providers/github/endpoints/orgs';
import { searchRepos } from 'api/rest/providers/github/endpoints/search';

const getQueryString = (keyword, orgId) =>
  `q=${keyword}+user:${orgId}+fork:true&per_page=8`;

class OrgRepositoryList extends Component {
  props: {
    searchRepos: Function,
    getRepos: Function,
    orgId: String,

    searchedResults: Array,
    repositories: Array,

    repositoriesPagination: Object,
    searchedResultsPagination: Object,

    authUser: Object,

    navigation: Object,
  };

  render() {
    const {
      orgId,
      authUser,
      navigation,
      getRepos,
      searchRepos,
      repositories,
      repositoriesPagination,
      searchedResults,
      searchedResultsPagination,
    } = this.props;

    return (
      <RepositoryList
        authUser={authUser}
        navigation={navigation}
        loadRepositories={(loadMore = false) => getRepos(orgId, { loadMore })}
        loadSearchResults={(keyword, loadMore = false) => {
          navigation.setParams({ searchedKeyword: keyword });

          return searchRepos(getQueryString(keyword, orgId), { loadMore });
        }}
        repositories={repositories}
        repositoriesPagination={repositoriesPagination}
        searchResults={searchedResults}
        searchResultsPagination={searchedResultsPagination}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const orgId = ownProps.navigation.state.params.orgId;

  const {
    auth: { user },
    pagination: { reposByOrg, reposBySearch },
    entities: { orgs, repos },
  } = state;

  const repositoriesPagination = reposByOrg[orgId] || { ids: [] };
  const repositories = repositoriesPagination.ids.map(id => repos[id]);

  const searchedKeyword = ownProps.navigation.state.params.searchedKeyword;
  const queryString = getQueryString(searchedKeyword, orgId);

  const searchedResultsPagination =
    searchedKeyword && reposBySearch[queryString]
      ? reposBySearch[queryString]
      : { ids: [] };
  const searchedResults = searchedResultsPagination.ids.map(id => repos[id]);

  return {
    orgId,
    authUser: user,
    repositories,
    repositoriesPagination,
    searchedResults,
    searchedResultsPagination,
    org: orgs[orgId],
  };
};

export const OrgRepositoryListScreen = connect(mapStateToProps, {
  getRepos,
  searchRepos,
})(OrgRepositoryList);
