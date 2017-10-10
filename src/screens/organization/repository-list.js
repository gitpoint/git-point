/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Dimensions, StyleSheet } from 'react-native';

import {
  ViewContainer,
  RepoListItem,
  LoadingRepositoryListItem,
  SearchBar,
} from 'components';
import { colors } from 'config';

import { getRepos } from 'api/rest/providers/github/endpoints/orgs';
import { searchRepos } from 'api/rest/providers/github/endpoints/search';

const loadData = ({ orgId, getRepos }) => {
  getRepos(orgId);
};

// TODO: clean up searchStart & query usage

const styles = StyleSheet.create({
  header: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  searchBarWrapper: {
    flexDirection: 'row',
  },
  searchContainer: {
    width: Dimensions.get('window').width,
    backgroundColor: colors.white,
    flex: 1,
  },
  searchCancelButton: {
    color: colors.black,
  },
  listContainer: {
    marginBottom: 90,
  },
});

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

  state: {
    query: string,
    searchStart: boolean,
    searchFocus: boolean,
  };

  constructor() {
    super();

    this.state = {
      query: '',
      searchStart: false,
      searchFocus: false,
    };

    this.search = this.search.bind(this);
    this.getList = this.getList.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orgId !== this.props.orgId) {
      loadData(nextProps);
    }
  }

  getList = () => {
    const { searchedResults, repositories } = this.props;
    const { searchStart } = this.state;

    return searchStart ? searchedResults : repositories;
  };

  loadMore = () => {
    const { orgId, getRepos, searchRepos, navigation } = this.props;

    if (navigation.state.params.searchedKeyword) {
      searchRepos(navigation.state.params.searchedKeyword, true);
    } else {
      getRepos(orgId, { loadMore: true });
    }
  };

  search(query) {
    if (query !== '') {
      const searchedKeyword = `q=${query}+user:${this.props.navigation.state
        .params.orgId}+fork:true`;

      this.setState({
        searchStart: true,
        query,
      });

      const { searchRepos, navigation } = this.props;

      navigation.setParams({ searchedKeyword });
      searchRepos(searchedKeyword);
    }
  }

  keyExtractor = item => {
    return item.id;
  };

  render() {
    const {
      authUser,
      navigation,
      searchedResultsPagination,
      repositoriesPagination,
    } = this.props;
    const repoCount = navigation.state.params.repoCount;
    const { searchStart, searchFocus } = this.state;
    const loading =
      (searchedResultsPagination.isFetching &&
        !searchedResultsPagination.pageCount) ||
      (repositoriesPagination.isFetching && !repositoriesPagination.pageCount);

    return (
      <ViewContainer>
        <View>
          <View style={styles.header}>
            <View style={styles.searchBarWrapper}>
              <View style={styles.searchContainer}>
                <SearchBar
                  textColor={colors.primaryDark}
                  textFieldBackgroundColor={colors.greyLight}
                  showsCancelButton={searchFocus}
                  onFocus={() => this.setState({ searchFocus: true })}
                  onCancelButtonPress={() =>
                    this.setState({ searchStart: false, query: '' })}
                  onSearchButtonPress={query => {
                    this.search(query);
                  }}
                  hideBackground
                />
              </View>
            </View>
          </View>

          {loading &&
            [...Array(searchStart ? repoCount : 10)].map(
              (item, index) => <LoadingRepositoryListItem key={index} /> // eslint-disable-line react/no-array-index-key
            )}

          {!loading &&
            <View style={styles.listContainer}>
              <FlatList
                removeClippedSubviews={false}
                data={this.getList()}
                keyExtractor={this.keyExtractor}
                onEndReached={this.loadMore}
                onEndReachedThreshold={0.4}
                renderItem={({ item }) =>
                  <RepoListItem
                    repository={item}
                    showFullName={true || authUser.login !== item.owner.login}
                    navigation={navigation}
                  />}
              />
            </View>}
        </View>
      </ViewContainer>
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
  const searchedResultsPagination = searchedKeyword
    ? reposBySearch[searchedKeyword]
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
