import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';

import {
  ViewContainer,
  RepositoryListItem,
  UserListItem,
  LoadingContainer,
  SearchBar,
} from 'components';
import { colors, fonts, normalize } from 'config';
import { translate } from 'utils';
import { searchRepos, searchUsers } from '../index';

const mapStateToProps = state => ({
  users: state.search.users,
  repos: state.search.repos,
  language: state.auth.language,
  isPendingSearchUsers: state.search.isPendingSearchUsers,
  isPendingSearchRepos: state.search.isPendingSearchRepos,
});

const mapDispatchToProps = dispatch => ({
  searchReposByDispatch: query => dispatch(searchRepos(query)),
  searchUsersByDispatch: query => dispatch(searchUsers(query)),
});

const styles = StyleSheet.create({
  searchBarWrapper: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 20 : 5,
  },
  searchContainer: {
    width: Dimensions.get('window').width,
    backgroundColor: colors.white,
    flex: 1,
    height: 55,
    justifyContent: 'center',
  },
  list: {
    marginTop: 0,
  },
  buttonGroupContainer: {
    height: 30,
    ...Platform.select({
      ios: {
        marginTop: 0,
        marginBottom: 10,
      },
      android: {
        marginTop: 5,
        marginBottom: 12,
      },
    }),
  },
  buttonGroupText: {
    ...fonts.fontPrimaryBold,
  },
  buttonGroupTextSelected: {
    color: colors.black,
  },
  loadingIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchTitle: {
    fontSize: normalize(18),
    textAlign: 'center',
    ...fonts.fontPrimary,
  },
  searchCancelButton: {
    color: colors.black,
  },
  listContainer: {
    borderTopColor: colors.greyLight,
    borderTopWidth: 1,
    marginBottom: 105,
  },
  noBorderTopWidth: {
    borderTopWidth: 0,
  },
});

class Search extends Component {
  props: {
    searchReposByDispatch: Function,
    searchUsersByDispatch: Function,
    users: Array,
    repos: Array,
    language: string,
    isPendingSearchUsers: boolean,
    isPendingSearchRepos: boolean,
    navigation: Object,
  };

  state: {
    query: string,
    searchType: number,
    searchStart: boolean,
    searchFocus: boolean,
  };

  constructor() {
    super();

    this.state = {
      query: '',
      searchType: 0,
      searchStart: false,
      searchFocus: false,
    };

    this.switchQueryType = this.switchQueryType.bind(this);
    this.search = this.search.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  search(query, selectedType = null) {
    const { searchReposByDispatch, searchUsersByDispatch } = this.props;

    const selectedSearchType =
      selectedType !== null ? selectedType : this.state.searchType;

    if (query !== '') {
      this.setState({
        searchStart: true,
        query,
      });

      if (selectedSearchType === 0) {
        searchReposByDispatch(query);
      } else {
        searchUsersByDispatch(query);
      }
    }
  }

  switchQueryType(selectedType) {
    if (this.state.searchType !== selectedType) {
      this.setState({
        searchType: selectedType,
      });

      this.search(this.state.query, selectedType);
    }
  }

  keyExtractor = item => {
    return item.id;
  };

  renderItem = ({ item }) => {
    if (this.state.searchType === 0) {
      return (
        <RepositoryListItem
          repository={item}
          navigation={this.props.navigation}
        />
      );
    }

    return <UserListItem user={item} navigation={this.props.navigation} />;
  };

  render() {
    const {
      users,
      repos,
      language,
      isPendingSearchUsers,
      isPendingSearchRepos,
    } = this.props;
    const { query, searchType, searchStart } = this.state;
    const noReposFound =
      searchStart &&
      !isPendingSearchRepos &&
      repos.length === 0 &&
      searchType === 0;

    const noUsersFound =
      searchStart &&
      !isPendingSearchUsers &&
      users.length === 0 &&
      searchType === 1;

    const isPending = isPendingSearchUsers || isPendingSearchRepos;
    const noResults = !noUsersFound && !noReposFound;

    return (
      <ViewContainer>
        <View>
          <View style={styles.searchBarWrapper}>
            <View style={styles.searchContainer}>
              <SearchBar
                textColor={colors.primaryDark}
                textFieldBackgroundColor={colors.greyLight}
                showsCancelButton={this.state.searchFocus}
                onFocus={() => this.setState({ searchFocus: true })}
                onCancelButtonPress={() =>
                  this.setState({ searchStart: false, query: '' })}
                onSearchButtonPress={text => {
                  this.search(text);
                }}
                hideBackground
              />
            </View>
          </View>

          <ButtonGroup
            onPress={this.switchQueryType}
            selectedIndex={this.state.searchType}
            buttons={[
              translate('search.main.repositoryButton', language),
              translate('search.main.userButton', language),
            ]}
            textStyle={styles.buttonGroupText}
            selectedTextStyle={styles.buttonGroupTextSelected}
            containerStyle={styles.buttonGroupContainer}
          />
        </View>

        {isPendingSearchRepos &&
          searchType === 0 &&
          <LoadingContainer
            animating={isPendingSearchRepos && searchType === 0}
            text={translate('search.main.searchingMessage', language, {
              query,
            })}
            style={styles.marginSpacing}
          />}

        {isPendingSearchUsers &&
          searchType === 1 &&
          <LoadingContainer
            animating={isPendingSearchUsers && searchType === 1}
            text={translate('search.main.searchingMessage', language, {
              query,
            })}
            style={styles.marginSpacing}
          />}

        {searchStart &&
          noResults &&
          <View
            style={[styles.listContainer, isPending && styles.noBorderTopWidth]}
          >
            <FlatList
              data={searchType === 0 ? repos : users}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
          </View>}

        {!searchStart &&
          <View style={styles.textContainer}>
            <Text style={styles.searchTitle}>
              {translate('search.main.searchMessage', language, {
                type: searchType === 0 ? 'repository' : 'user',
              })}
            </Text>
          </View>}

        {searchStart &&
          !isPendingSearchRepos &&
          repos.length === 0 &&
          searchType === 0 &&
          <View style={styles.textContainer}>
            <Text style={styles.searchTitle}>No repositories found :(</Text>
          </View>}

        {searchStart &&
          !isPendingSearchUsers &&
          users.length === 0 &&
          searchType === 1 &&
          <View style={styles.textContainer}>
            <Text style={styles.searchTitle}>No users found :(</Text>
          </View>}
      </ViewContainer>
    );
  }
}

export const SearchScreen = connect(mapStateToProps, mapDispatchToProps)(
  Search
);
