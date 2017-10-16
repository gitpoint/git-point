import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RepositoryList } from 'components';
import { client } from 'api/rest';

const getQueryString = (keyword, orgId) =>
  `q=${keyword}+user:${orgId}+fork:true&per_page=8`;

class OrganizationRepositoryList extends Component {
  props: {
    searchRepos: Function,
    getOrgRepos: Function,
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
      getOrgRepos,
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
        loadRepositories={(loadMore = false) =>
          getOrgRepos(orgId, { loadMore })}
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
    pagination: { ORGS_GET_REPOS, SEARCH_GET_REPOS },
    entities: { orgs, repos },
  } = state;

  const repositoriesPagination = ORGS_GET_REPOS[orgId] || { ids: [] };
  const repositories = repositoriesPagination.ids.map(id => repos[id]);

  const searchedKeyword = ownProps.navigation.state.params.searchedKeyword;
  const queryString = getQueryString(searchedKeyword, orgId);

  const searchedResultsPagination =
    searchedKeyword && SEARCH_GET_REPOS[queryString]
      ? SEARCH_GET_REPOS[queryString]
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

export const OrganizationRepositoryListScreen = connect(mapStateToProps, {
  getOrgRepos: client.orgs.getRepos,
  searchRepos: client.search.getRepos,
})(OrganizationRepositoryList);