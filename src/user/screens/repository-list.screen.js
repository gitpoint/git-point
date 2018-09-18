/* eslint-disable no-shadow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, FlatList, Dimensions } from 'react-native';

import {
  ViewContainer,
  RepositoryListItem,
  LoadingRepositoryListItem,
  SearchBar,
} from 'components';
import { colors } from 'config';
import { getRepositories, searchUserRepos } from 'user';

const mapStateToProps = state => ({
  authUser: state.auth.user,
  user: state.user.user,
  repositories: state.user.repositories,
  searchedUserRepos: state.user.searchedUserRepos,
  isPendingRepositories: state.user.isPendingRepositories,
  isPendingSearchUserRepos: state.user.isPendingSearchUserRepos,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getRepositories,
      searchUserRepos,
    },
    dispatch
  );

const Header = styled.View`
  border-bottom-color: ${colors.greyLight};
  border-bottom-width: 1;
`;

const SearchBarWrapper = styled.View`
  flex-direction: row;
`;

const SearchContainer = styled.View`
  width: ${Dimensions.get('window').width};
  background-color: ${colors.white};
  flex: 1;
`;

const ListContainer = styled.View`
  margin-bottom: 90;
`;

class RepositoryList extends Component {
  props: {
    getRepositories: Function,
    searchUserRepos: Function,
    authUser: Object,
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

  constructor(props) {
    super(props);

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
    } = this.props;
    const repoCount = navigation.state.params.repoCount;
    const { searchStart, searchFocus } = this.state;
    const loading =
      (isPendingRepositories && !searchStart) ||
      (isPendingSearchUserRepos && searchStart);

    return (
      <ViewContainer>
        <View>
          <Header>
            <SearchBarWrapper>
              <SearchContainer>
                <SearchBar
                  textColor={colors.primaryDark}
                  textFieldBackgroundColor={colors.greyLight}
                  showsCancelButton={searchFocus}
                  onFocus={() => this.setState({ searchFocus: true })}
                  onCancelButtonPress={() =>
                    this.setState({ searchStart: false, query: '' })
                  }
                  onSearchButtonPress={query => {
                    this.search(query);
                  }}
                  hideBackground
                />
              </SearchContainer>
            </SearchBarWrapper>
          </Header>

          {loading &&
            [...Array(searchStart ? repoCount : 10)].map(
              (item, index) => <LoadingRepositoryListItem key={index} /> // eslint-disable-line react/no-array-index-key
            )}

          {!loading && (
            <ListContainer>
              <FlatList
                removeClippedSubviews={false}
                data={this.getList()}
                keyExtractor={this.keyExtractor}
                renderItem={({ item }) => (
                  <RepositoryListItem
                    repository={item}
                    showFullName={authUser.login !== item.owner.login}
                    navigation={navigation}
                  />
                )}
              />
            </ListContainer>
          )}
        </View>
      </ViewContainer>
    );
  }
}

export const RepositoryListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryList);
