import React, { Component } from 'react';
import { FlatList, View, Dimensions, StyleSheet } from 'react-native';
import SearchBar from 'react-native-search-box';

import {
  ViewContainer,
  RepositoryListItem,
  LoadingRepositoryListItem
} from 'components';

import { colors } from 'config';

import { connect } from 'react-redux';
import { getRepositories, searchUserRepos } from 'user';

const mapStateToProps = state => ({
  user: state.user.user,
  repositories: state.user.repositories,
  searchedUserRepos: state.user.searchedUserRepos,
  isPendingRepositories: state.user.isPendingRepositories,
  isPendingSearchUserRepos: state.user.isPendingSearchUserRepos
});

const mapDispatchToProps = dispatch => ({
  getRepositories: (user, type) => dispatch(getRepositories(user, type)),
  searchUserRepos: (user, type) => dispatch(searchUserRepos(user, type))
});

class RepositoryList extends Component {
  state: {
    query: string,
    searchStart: boolean,
    searchFocus: boolean
  };

  props: {
    getRepositories: Function,
    searchUserRepos: Function,
    user: Object,
    repositories: Array,
    searchedUserRepos: Array,
    isPendingRepositories: boolean,
    isPendingSearchUserRepos: boolean,
    navigation: Object
  };

  constructor() {
    super();

    this.state = {
      query: '',
      searchStart: false,
      searchFocus: false
    };

    this.search = this.search.bind(this);
    this.getList = this.getList.bind(this);
  }

  componentDidMount() {
    const user = this.props.navigation.state.params.user;
    this.props.getRepositories(user);
  }

  search(query) {
    const { searchUserRepos, navigation } = this.props;
    const user = this.props.navigation.state.params.user;

    if (query !== '') {
      this.setState({
        query: query,
        searchStart: true
      });

      searchUserRepos(query, user);
    }
  }

  getList = () => {
    const { searchedUserRepos, repositories } = this.props;
    const { searchStart } = this.state;

    return searchStart ? searchedUserRepos : repositories;
  };

  render() {
    const {
      isPendingRepositories,
      isPendingSearchUserRepos,
      navigation
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
                  ref="searchBar"
                  inputStyle={colors.primaryDark}
                  backgroundColor={colors.greyLight}
                  onFocus={() => this.setState({ searchFocus: true })}
                  onCancel={() => {
                    this.setState({ searchStart: false, query: '' });
                    this.refs.searchBar.unFocus();
                  }}
                  onSearch={query => {
                    this.search(query);
                    this.refs.searchBar.unFocus();
                  }}
                />
              </View>
            </View>
          </View>

          {loading &&
            [...Array(searchStart ? repoCount : 10)].map((item, i) => (
              <LoadingRepositoryListItem key={i} />
            ))}

          {!loading &&
            <View style={styles.listContainer}>
              <FlatList
                removeClippedSubviews={false}
                data={this.getList()}
                keyExtractor={this.keyExtractor}
                renderItem={({ item }) => (
                  <RepositoryListItem
                    repository={item}
                    navigation={navigation}
                  />
                )}
              />
            </View>}
        </View>
      </ViewContainer>
    );
  }

  keyExtractor = item => {
    return item.id;
  };
}

const styles = StyleSheet.create({
  header: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1
  },
  searchBarWrapper: {
    flexDirection: 'row'
  },
  searchContainer: {
    width: Dimensions.get('window').width,
    backgroundColor: colors.white,
    flex: 1
  },
  listContainer: {
    marginBottom: 90
  }
});

export const RepositoryListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryList);
