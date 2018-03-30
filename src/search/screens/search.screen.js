/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ActivityIndicator,
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
import styled from 'styled-components';
import { colors, fonts, normalize } from 'config';
import { isIphoneX, translate } from 'utils';
import { RestClient } from 'api';

const mapStateToProps = (state, ownProps) => {
  const {
    auth: { locale },
    pagination: { SEARCH_REPOS, SEARCH_USERS },
    entities: { repos, users },
  } = state;

  const searchQuery = ownProps.navigation.getParam('q');

  const searchedReposPagination = SEARCH_REPOS[searchQuery] || {
    ids: [],
    isFetching: false,
  };
  const searchedRepos = searchedReposPagination.ids.map(id => repos[id]);

  const searchedUsersPagination = SEARCH_USERS[searchQuery] || {
    ids: [],
    isFetching: false,
  };
  const searchedUsers = searchedUsersPagination.ids.map(id => users[id]);

  return {
    locale,
    searchedReposPagination,
    searchedRepos,
    searchedUsersPagination,
    searchedUsers,
    searchQuery,
  };
};

const mapDispatchToProps = {
  searchRepos: RestClient.search.repos,
  searchUsers: RestClient.search.users,
};

const SearchBarWrapper = styled.View`
  flex-direction: row;
  margin-top: ${Platform.select({
    ios: isIphoneX() ? 30 : 20,
    android: 5,
  })};
`;

const SearchContainer = styled.View`
  width: ${Dimensions.get('window').width};
  background-color: ${colors.white};
  flex: 1;
  height: 55;
  justify-content: center;
`;

const ListContainer = styled.View`
  border-top-color: ${colors.greyLight};
  border-top-width: ${props => (props.noBorderTopWidth ? 0 : 1)};
  margin-bottom: 105;
`;

const TextContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SearchInfoText = styled.Text`
  font-size: ${normalize(18)};
  text-align: center;
  ${fonts.fontPrimary};
`;

const StyledButtonGroup = styled(ButtonGroup).attrs({
  textStyle: { ...fonts.fontPrimaryBold },
  selectedTextStyle: { color: colors.black },
  containerStyle: {
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
})``;

class Search extends Component {
  props: {
    searchRepos: Function,
    searchUsers: Function,
    searchedUsers: Array,
    searchedUsersPagination: Object,
    searchedRepos: Array,
    searchedReposPagination: Object,
    locale: string,
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
      currentQuery: {},
      searchType: 0,
      searchStart: false,
      searchFocus: false,
    };

    this.switchQueryType = this.switchQueryType.bind(this);
    this.search = this.search.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  search(query, selectedType = null) {
    const { searchRepos, searchUsers } = this.props;

    const selectedSearchType =
      selectedType !== null ? selectedType : this.state.searchType;

    if (query.trim() !== '') {
      const searchedQuery = query.toLowerCase();

      this.setState({
        searchStart: true,
        currentQuery: {
          ...this.state.currentQuery,
          [selectedSearchType]: searchedQuery,
        },
        query: searchedQuery,
      });
      this.props.navigation.setParams({ q: searchedQuery });
      if (selectedSearchType === 0) {
        searchRepos(searchedQuery);
      } else {
        searchUsers(searchedQuery);
      }
    }
  }

  switchQueryType(selectedType) {
    if (this.state.searchType !== selectedType) {
      this.setState({
        searchType: selectedType,
      });
      if (this.state.currentQuery[selectedType] !== this.state.query) {
        this.search(this.state.query, selectedType);
      }
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

  renderFooter = () => {
    const { searchType } = this.state;

    if (
      this.props[
        searchType === 0 ? 'searchedReposPagination' : 'searchedUsersPagination'
      ].nextPageUrl === null
    ) {
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
      searchedRepos,
      searchedReposPagination,
      searchedUsers,
      searchedUsersPagination,
      locale,
    } = this.props;

    const isPendingSearchRepos =
      searchedRepos.length === 0 && searchedReposPagination.isFetching;
    const isPendingSearchUsers =
      searchedUsers.length === 0 && searchedUsersPagination.isFetching;

    const { query, searchType, searchStart } = this.state;
    const noReposFound =
      searchStart &&
      !isPendingSearchRepos &&
      searchedRepos.length === 0 &&
      searchType === 0;

    const noUsersFound =
      searchStart &&
      !isPendingSearchUsers &&
      searchedUsers.length === 0 &&
      searchType === 1;

    const isPending = isPendingSearchUsers || isPendingSearchRepos;
    const noResults = !noUsersFound && !noReposFound;

    return (
      <ViewContainer>
        <SearchBarWrapper>
          <SearchContainer>
            <SearchBar
              textColor={colors.primaryDark}
              textFieldBackgroundColor={colors.greyLight}
              showsCancelButton={this.state.searchFocus}
              onFocus={() => this.setState({ searchFocus: true })}
              onCancelButtonPress={() =>
                this.setState({ searchStart: false, query: '' })
              }
              onSearchButtonPress={text => {
                this.search(text);
              }}
              hideBackground
            />
          </SearchContainer>
        </SearchBarWrapper>

        <StyledButtonGroup
          onPress={this.switchQueryType}
          selectedIndex={this.state.searchType}
          buttons={[
            translate('search.main.repositoryButton', locale),
            translate('search.main.userButton', locale),
          ]}
        />

        {isPendingSearchRepos &&
          searchType === 0 && (
            <LoadingContainer
              animating={isPendingSearchRepos && searchType === 0}
              text={translate('search.main.searchingMessage', locale, {
                query,
              })}
            />
          )}

        {isPendingSearchUsers &&
          searchType === 1 && (
            <LoadingContainer
              animating={isPendingSearchUsers && searchType === 1}
              text={translate('search.main.searchingMessage', locale, {
                query,
              })}
            />
          )}

        {searchStart &&
          noResults && (
            <ListContainer noBorderTopWidth={isPending}>
              <FlatList
                data={searchType === 0 ? searchedRepos : searchedUsers}
                onRefresh={() =>
                  this.props[searchType === 0 ? 'searchRepos' : 'searchUsers'](
                    query,
                    {
                      forceRefresh: true,
                    }
                  )
                }
                refreshing={isPendingSearchRepos || isPendingSearchUsers}
                onEndReached={() =>
                  this.props[searchType === 0 ? 'searchRepos' : 'searchUsers'](
                    query,
                    { loadMore: true }
                  )
                }
                onEndReachedThreshold={0.5}
                ListFooterComponent={this.renderFooter}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
              />
            </ListContainer>
          )}

        {!searchStart && (
          <TextContainer>
            <SearchInfoText>
              {translate('search.main.searchMessage', locale, {
                type:
                  searchType === 0
                    ? translate('search.main.repository', locale)
                    : translate('search.main.user', locale),
              })}
            </SearchInfoText>
          </TextContainer>
        )}

        {searchStart &&
          !isPendingSearchRepos &&
          searchedRepos.length === 0 &&
          searchType === 0 && (
            <TextContainer>
              <SearchInfoText>
                {translate('search.main.noRepositoriesFound', locale)}
              </SearchInfoText>
            </TextContainer>
          )}

        {searchStart &&
          !isPendingSearchUsers &&
          searchedUsers.length === 0 &&
          searchType === 1 && (
            <TextContainer>
              <SearchInfoText>
                {translate('search.main.noUsersFound', locale)}
              </SearchInfoText>
            </TextContainer>
          )}
      </ViewContainer>
    );
  }
}

export const SearchScreen = connect(mapStateToProps, mapDispatchToProps)(
  Search
);
