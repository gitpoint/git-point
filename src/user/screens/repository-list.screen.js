/* eslint-disable no-shadow */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, FlatList, Dimensions, Platform } from 'react-native';
import { ButtonGroup, Icon } from 'react-native-elements';

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
        marginTop: 8,
        marginBottom: 12,
      },
    }),
  },
})``;

const TitleText = styled(Text).attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  margin-left: 5;
  margin-right: 5;
`;

const repoTypes = ['all', 'owner', 'member', 'private', 'public'];

class RepositoryList extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;

    return {
      headerRight: (
        <Icon
          name="search"
          color={colors.greyDark}
          type="font-awesome"
          containerStyle={{ marginRight: 20 }}
          underlayColor={colors.transparent}
          onPress={state.params.openSearch}
        />
      ),
    };
  };

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
    this.openSearch = this.openSearch.bind(this);
  }

  componentDidMount() {
    const user = this.props.navigation.state.params.user;

    this.props.getRepositories(user);
    this.props.navigation.setParams({ openSearch: this.openSearch });
  }

  getList = () => {
    const { searchedUserRepos, repositories } = this.props;
    const { searchStart } = this.state;

    return searchStart ? searchedUserRepos : repositories;
  };

  getRepoTypeTitle = title => () => <TitleText>{title}</TitleText>;

  openSearch() {
    this.setState({ searchFocus: true });
  }

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
    const buttons = [
      {
        element: this.getRepoTypeTitle(
          translate('user.repositoryList.allReposButton', locale)
        ),
      },
      {
        element: this.getRepoTypeTitle(
          translate('user.repositoryList.ownedReposButton', locale)
        ),
      },
      {
        element: this.getRepoTypeTitle(
          translate('user.repositoryList.memberReposButton', locale)
        ),
      },
    ];

    if (authUser.login === currentuser.login) {
      buttons.push(
        {
          element: this.getRepoTypeTitle(
            translate('user.repositoryList.privateReposButton', locale)
          ),
        },
        {
          element: this.getRepoTypeTitle(
            translate('user.repositoryList.publicReposButton', locale)
          ),
        }
      );
    }

    return (
      <ViewContainer>
        <View>
          <Header>
            {this.state.searchFocus ? (
              <SearchBarWrapper>
                <SearchContainer>
                  <SearchBar
                    textColor={colors.primaryDark}
                    textFieldBackgroundColor={colors.greyLight}
                    showsCancelButton={searchFocus}
                    onCancelButtonPress={() =>
                      this.setState({
                        searchStart: false,
                        searchFocus: false,
                        query: '',
                      })
                    }
                    onSearchButtonPress={query => {
                      this.search(query);
                    }}
                    hideBackground
                    autoFocus
                  />
                </SearchContainer>
              </SearchBarWrapper>
            ) : (
              <StyledButtonGroup
                onPress={this.switchRepoType}
                selectedIndex={this.state.repoType}
                buttons={buttons}
              />
            )}
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
