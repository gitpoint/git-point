/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatList, View, Dimensions, StyleSheet } from 'react-native';

import {
  ViewContainer,
  RepositoryListItem,
  LoadingRepositoryListItem,
  SearchBar,
} from 'components';
import { colors } from 'config';
import { getRepositories, getMoreRepositories, searchUserRepos } from 'user';

const mapStateToProps = state => ({
  authUser: state.auth.user,
  user: state.user.user,
  repositories: state.user.repositories,
  searchedUserRepos: state.user.searchedUserRepos,
  isPendingRepositories: state.user.isPendingRepositories,
  isPendingSearchUserRepos: state.user.isPendingSearchUserRepos,
  page: state.user.page,
  hasMoreRepositories: state.user.hasMoreRepositories,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getRepositories,
      searchUserRepos,
      getMoreRepositories,
    },
    dispatch
  );

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

class RepositoryList extends Component {
  props: {
    getMoreRepositories: Function,
    getRepositories: Function,
    searchUserRepos: Function,
    authUser: Object,
    user: Object,
    repositories: Array,
    searchedUserRepos: Array,
    isPendingRepositories: boolean,
    isPendingSearchUserRepos: boolean,
    navigation: Object,
    page: number,
    hasMoreRepositories: boolean,
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

    this.props.getRepositories(user);
  }

  getList = () => {
    const { searchedUserRepos, repositories } = this.props;
    const { searchStart } = this.state;

    return searchStart ? searchedUserRepos : repositories;
  };

  search(query) {
    const { searchUserRepos } = this.props;
    const user = this.props.navigation.state.params.user;

    if (query !== '') {
      this.setState({
        searchStart: true,
        query,
      });

      searchUserRepos(query, user);
    }
  }

  keyExtractor = item => {
    return item.id;
  };

  render() {
    const {
      authUser,
      isPendingRepositories,
      isPendingSearchUserRepos,
      navigation,
      getMoreRepositoriesByDispatch,
      hasMoreRepositories,
      page,
    } = this.props;
    const repoCount = navigation.state.params.repoCount;
    const user = navigation.state.params.user;
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
                renderItem={({ item }) =>
                  <RepositoryListItem
                    repository={item}
                    showFullName={authUser.login !== item.owner.login}
                    navigation={navigation}
                  />}
                onEndReached={
                  !hasMoreRepositories
                    ? () => null
                    : () => getMoreRepositoriesByDispatch(user, page + 1)
                }
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
