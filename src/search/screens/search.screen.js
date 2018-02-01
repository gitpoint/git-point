/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatList, Dimensions, Platform } from 'react-native';
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
import { searchRepos, searchUsers } from '../index';

const mapStateToProps = state => ({
  users: state.search.users,
  repos: state.search.repos,
  locale: state.auth.locale,
  isPendingSearchUsers: state.search.isPendingSearchUsers,
  isPendingSearchRepos: state.search.isPendingSearchRepos,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchRepos,
      searchUsers,
    },
    dispatch
  );

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
    users: Array,
    repos: Array,
    locale: string,
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

    if (query !== '') {
      this.setState({
        searchStart: true,
        currentQuery: {
          ...this.state.currentQuery,
          [selectedSearchType]: query,
        },
        query,
      });
      if (selectedSearchType === 0) {
        searchRepos(query);
      } else {
        searchUsers(query);
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

  render() {
    const {
      users,
      repos,
      locale,
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
                data={searchType === 0 ? repos : users}
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
          repos.length === 0 &&
          searchType === 0 && (
            <TextContainer>
              <SearchInfoText>
                {translate('search.main.noRepositoriesFound', locale)}
              </SearchInfoText>
            </TextContainer>
          )}

        {searchStart &&
          !isPendingSearchUsers &&
          users.length === 0 &&
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
