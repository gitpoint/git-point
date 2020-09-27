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
import { SafeAreaView } from 'react-navigation';

import {
  ViewContainer,
  RepositoryListItem,
  UserListItem,
  LoadingContainer,
  SearchBar,
} from 'components';
import styled from 'styled-components';
import { colors, fonts, normalize, getHeaderForceInset } from 'config';
import { t } from 'utils';
import { RestClient } from 'api';

const NAV_QUERY_PARAM = 'q';
const SearchTypes = {
  REPOS: 0,
  USERS: 1,
};

const mapStateToProps = (state, ownProps) => {
  const {
    auth: { locale },
    pagination: { SEARCH_REPOS, SEARCH_USERS },
    entities: { repos, users },
  } = state;

  const searchQuery = ownProps.navigation.getParam(NAV_QUERY_PARAM);

  const reposSearchResultsPagination = SEARCH_REPOS[searchQuery] || {
    ids: [],
    isFetching: false,
  };
  const reposSearchResults = reposSearchResultsPagination.ids.map(
    id => repos[id]
  );

  const usersSearchResultsPagination = SEARCH_USERS[searchQuery] || {
    ids: [],
    isFetching: false,
  };
  const usersSearchResults = usersSearchResultsPagination.ids.map(
    id => users[id]
  );

  return {
    locale,
    reposSearchResultsPagination,
    reposSearchResults,
    usersSearchResultsPagination,
    usersSearchResults,
    searchQuery,
  };
};

const mapDispatchToProps = {
  searchRepos: RestClient.search.repos,
  searchUsers: RestClient.search.users,
};

const StyledSafeAreaView = styled(SafeAreaView).attrs({
  forceInset: getHeaderForceInset('Search'),
})`
  background-color: ${colors.white};
`;

const SearchBarWrapper = styled.View`
  flex-direction: row;
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
    usersSearchResults: Array,
    usersSearchResultsPagination: Object,
    reposSearchResults: Array,
    reposSearchResultsPagination: Object,
    locale: string,
    navigation: Object,
  };

  state: {
    query: string,
    searchType: number,
    searchStart: boolean,
    searchFocus: boolean,
  };

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      currentQuery: {},
      searchType: SearchTypes.REPOS,
      searchStart: false,
      searchFocus: false,
    };

    this.switchQueryType = this.switchQueryType.bind(this);
    this.search = this.search.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  getNoResultsFound = (type = this.state.searchType) => {
    const { locale } = this.props;

    switch (type) {
      case SearchTypes.REPOS:
        return t('No repositories found :(', locale);
      case SearchTypes.USERS:
        return t('No users found :(', locale);
      default:
        return null;
    }
  };

  getSearchPagination = (type = this.state.searchType) => {
    switch (type) {
      case SearchTypes.REPOS:
        return this.props.reposSearchResultsPagination;

      case SearchTypes.USERS:
        return this.props.usersSearchResultsPagination;

      default:
        return null;
    }
  };

  getSearchResults = (type = this.state.searchType) => {
    switch (type) {
      case SearchTypes.REPOS:
        return this.props.reposSearchResults;

      case SearchTypes.USERS:
        return this.props.usersSearchResults;

      default:
        return null;
    }
  };

  getSearcher = (type = this.state.searchType) => {
    switch (type) {
      case SearchTypes.REPOS:
        return this.props.searchRepos;

      case SearchTypes.USERS:
        return this.props.searchUsers;

      default:
        return null;
    }
  };

  search(query, selectedType = null) {
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
      this.props.navigation.setParams({ [NAV_QUERY_PARAM]: searchedQuery });

      this.getSearcher(selectedSearchType)(searchedQuery);
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
    switch (this.state.searchType) {
      case SearchTypes.REPOS:
        return (
          <RepositoryListItem
            repository={item}
            navigation={this.props.navigation}
          />
        );

      case SearchTypes.USERS:
        return <UserListItem user={item} navigation={this.props.navigation} />;

      default:
        return null;
    }
  };

  renderFooter = isPendingSearch => {
    if (isPendingSearch) {
      return null;
    }

    if (this.getSearchPagination().nextPageUrl === null) {
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
    const { locale } = this.props;

    const isPendingSearch =
      this.getSearchResults().length === 0 &&
      this.getSearchPagination().isFetching;

    const { query, searchType, searchStart } = this.state;

    const noResults =
      this.getSearchResults().length === 0 &&
      !this.getSearchPagination().isFetching;

    return (
      <ViewContainer>
        <StyledSafeAreaView />

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
          buttons={[t('Repositories', locale), t('Users', locale)]}
        />

        {isPendingSearch && (
          <LoadingContainer
            animating={isPendingSearch}
            text={t('Searching for {query}', locale, {
              query,
            })}
          />
        )}

        {searchStart &&
          !noResults && (
            <ListContainer noBorderTopWidth={isPendingSearch}>
              <FlatList
                data={this.getSearchResults()}
                onRefresh={() =>
                  this.getSearcher()(query, {
                    forceRefresh: true,
                  })
                }
                refreshing={isPendingSearch}
                onEndReached={() =>
                  this.getSearcher()(query, { loadMore: true })
                }
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => this.renderFooter(isPendingSearch)}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
              />
            </ListContainer>
          )}

        {!searchStart && (
          <TextContainer>
            <SearchInfoText>
              {t('Search for any {type}', locale, {
                type:
                  searchType === SearchTypes.REPOS
                    ? t('repository', locale)
                    : t('user', locale),
              })}
            </SearchInfoText>
          </TextContainer>
        )}

        {searchStart &&
          !isPendingSearch &&
          this.getSearchResults().length === 0 && (
            <TextContainer>
              <SearchInfoText>{this.getNoResultsFound()}</SearchInfoText>
            </TextContainer>
          )}
      </ViewContainer>
    );
  }
}

export const SearchScreen = connect(mapStateToProps, mapDispatchToProps)(
  Search
);
