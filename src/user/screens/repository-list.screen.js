import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Dimensions, StyleSheet } from 'react-native';
import SearchBar from 'react-native-search-bar';

import {
  ViewContainer,
  RepositoryListItem,
  LoadingRepositoryListItem,
} from 'components';
import { colors } from 'config';
import { getRepositories, searchUserRepos } from 'user';

const mapStateToProps = state => ({
  user: state.user.user,
  repositories: state.user.repositories,
  searchedUserRepos: state.user.searchedUserRepos,
  isPendingRepositories: state.user.isPendingRepositories,
  isPendingSearchUserRepos: state.user.isPendingSearchUserRepos,
});

const mapDispatchToProps = dispatch => ({
  getRepositoriesByDispatch: (user, type) =>
    dispatch(getRepositories(user, type)),
  searchUserReposByDispatch: (user, type) =>
    dispatch(searchUserRepos(user, type)),
});

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
  listContainer: {
    marginBottom: 90,
  },
});

class RepositoryList extends Component {
  props: {
    getRepositoriesByDispatch: Function,
    searchUserReposByDispatch: Function,
    user: Object,
    repositories: Array,
    searchedUserRepos: Array,
    isPendingRepositories: boolean,
    isPendingSearchUserRepos: boolean,
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

  componentDidMount() {
    const user = this.props.navigation.state.params.user;

    this.props.getRepositoriesByDispatch(user);
  }

  getList = () => {
    const { searchedUserRepos, repositories } = this.props;
    const { searchStart } = this.state;

    return searchStart ? searchedUserRepos : repositories;
  };

  search(query) {
    const { searchUserReposByDispatch } = this.props;
    const user = this.props.navigation.state.params.user;

    if (query !== '') {
      this.setState({
        searchStart: true,
        query,
      });

      searchUserReposByDispatch(query, user);
    }
  }

  keyExtractor = item => {
    return item.id;
  };

  render() {
    const {
      isPendingRepositories,
      isPendingSearchUserRepos,
      navigation,
    } = this.props;
    const repoCount = navigation.state.params.repoCount;
    const { searchStart, searchFocus } = this.state;
    const loading =
      (isPendingRepositories && !searchStart) ||
      (isPendingSearchUserRepos && searchStart);

    return (
      <ViewContainer>
        <View>
          <View style={styles.header}>
            <View style={styles.searchBarWrapper}>
              <View style={styles.searchContainer}>
                <SearchBar
                  ref={ref => {
                    this.searchBar = ref;
                  }}
                  textColor={colors.primaryDark}
                  textFieldBackgroundColor={colors.greyLight}
                  showsCancelButton={searchFocus}
                  onFocus={() => this.setState({ searchFocus: true })}
                  onCancelButtonPress={() => {
                    this.setState({ searchStart: false, query: '' });
                    this.searchBar.unFocus();
                  }}
                  onSearchButtonPress={text => {
                    this.search(text);
                    this.searchBar.unFocus();
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
                renderItem={({ item }) =>
                  <RepositoryListItem
                    repository={item}
                    navigation={navigation}
                  />}
              />
            </View>}
        </View>
      </ViewContainer>
    );
  }
}

export const RepositoryListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryList);
