/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { FlatList, View, Dimensions, StyleSheet } from 'react-native';

import {
  ViewContainer,
  RepoListItem,
  LoadingRepositoryListItem,
  SearchBar,
} from 'components';
import { colors } from 'config';

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

export class RepositoryList extends Component {
  props: {
    // The actions
    loadRepositories: Function,
    loadSearchResults: Function,

    // Entity repositories
    repositories: Array,
    repositoriesPagination: Object,

    // Search repositories
    searchResults: Array,
    searchResultsPagination: Object,

    authUser: Object,
    navigation: Object,
  };

  state: {
    searchMode: boolean,
    searchFocus: boolean,
  };

  constructor() {
    super();

    this.state = {
      searchMode: false,
      searchFocus: false,
    };

    this.search = this.search.bind(this);
    this.getList = this.getList.bind(this);
  }

  componentWillMount() {
    this.props.loadRepositories();
  }

  getList = () => {
    const { searchResults, repositories } = this.props;
    const { searchMode } = this.state;

    return searchMode ? searchResults : repositories;
  };

  loadMore = () => {
    const { loadRepositories, loadSearchResults, navigation } = this.props;

    if (navigation.state.params.searchedKeyword) {
      loadSearchResults(navigation.state.params.searchedKeyword, true);
    } else {
      loadRepositories(true);
    }
  };

  search(keyword) {
    if (keyword !== '') {
      this.setState({
        searchMode: true,
      });

      const { loadSearchResults } = this.props;

      loadSearchResults(keyword);
    }
  }

  keyExtractor = item => {
    return item.id;
  };

  render() {
    const {
      authUser,
      navigation,
      searchResultsPagination,
      repositoriesPagination,
    } = this.props;
    const repoCount = navigation.state.params.repoCount;
    const { searchMode, searchFocus } = this.state;
    const loading =
      (searchResultsPagination.isFetching &&
        !searchResultsPagination.pageCount) ||
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
                    this.setState({ searchMode: false })}
                  onSearchButtonPress={query => {
                    this.search(query);
                  }}
                  hideBackground
                />
              </View>
            </View>
          </View>

          {loading &&
            [...Array(searchMode ? repoCount : 10)].map(
              (item, index) => <LoadingRepositoryListItem key={index} /> // eslint-disable-line react/no-array-index-key
            )}

          {!loading &&
            <View style={styles.listContainer}>
              <FlatList
                data={this.getList()}
                keyExtractor={this.keyExtractor}
                onEndReached={this.loadMore}
                onEndReachedThreshold={0.5}
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
