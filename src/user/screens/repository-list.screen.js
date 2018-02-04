/* eslint-disable no-shadow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, FlatList, Dimensions, Platform } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

import {
  ViewContainer,
  RepositoryListItem,
  LoadingRepositoryListItem,
  SearchBar,
} from 'components';
import { colors, fonts } from 'config';
import { getRepositories, searchUserRepos } from 'user';
import { translate } from 'utils';

const mapStateToProps = state => ({
  authUser: state.auth.user,
  user: state.user.user,
  repositories: state.user.repositories,
  searchedUserRepos: state.user.searchedUserRepos,
  isPendingRepositories: state.user.isPendingRepositories,
  isPendingSearchUserRepos: state.user.isPendingSearchUserRepos,
  locale: state.auth.locale,
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

const repoTypes = ['all', 'owner', 'member', 'private', 'public'];

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
    locale: string,
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
      repoType: 0,
    };

    this.search = this.search.bind(this);
    this.getList = this.getList.bind(this);
    this.switchRepoType = this.switchRepoType.bind(this);
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

  switchRepoType(selectedRepoType) {
    if (this.state.repoType !== selectedRepoType) {
      this.setState({
        repoType: selectedRepoType,
      });

      const user = this.props.navigation.state.params.user;

      this.props.getRepositories(user, repoTypes[selectedRepoType]);
    }
  }

  keyExtractor = item => {
    return item.id;
  };

  render() {
    const currentuser = this.props.navigation.state.params.user;
    const {
      authUser,
      isPendingRepositories,
      isPendingSearchUserRepos,
      navigation,
      locale,
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
                    this.setState({ searchStart: false, query: '' })}
                  onSearchButtonPress={query => {
                    this.search(query);
                  }}
                  hideBackground
                />
              </SearchContainer>
            </SearchBarWrapper>
            <StyledButtonGroup
              onPress={this.switchRepoType}
              selectedIndex={this.state.repoType}
              buttons={
                authUser.login === currentuser.login
                  ? [
                      translate('user.repositoryList.allReposButton', locale),
                      translate('user.repositoryList.ownedReposButton', locale),
                      translate(
                        'user.repositoryList.memberReposButton',
                        locale
                      ),
                      translate(
                        'user.repositoryList.privateReposButton',
                        locale
                      ),
                      translate(
                        'user.repositoryList.publicReposButton',
                        locale
                      ),
                    ]
                  : [
                      translate('user.repositoryList.allReposButton', locale),
                      translate('user.repositoryList.ownedReposButton', locale),
                      translate(
                        'user.repositoryList.memberReposButton',
                        locale
                      ),
                    ]
              }
            />
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
