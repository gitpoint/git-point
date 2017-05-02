import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { List, Button, ButtonGroup, Card } from 'react-native-elements'

import ViewContainer from '../components/ViewContainer';
import RepositoryListItem from '../components/RepositoryListItem';
import UserListItem from '../components/UserListItem';
import SearchInput from '../components/SearchInput';
import LoadingContainer from '../components/LoadingContainer';

import colors from '../config/colors';

import {connect} from 'react-redux';
import {searchRepos, searchUsers} from '../actions/search';

const mapStateToProps = state => ({
  users: state.search.users,
  repos: state.search.repos,
  isPendingSearchUsers: state.search.isPendingSearchUsers,
  isPendingSearchRepos: state.search.isPendingSearchRepos,
});

const mapDispatchToProps = dispatch => ({
  searchRepos: query => dispatch(searchRepos(query)),
  searchUsers: query => dispatch(searchUsers(query))
});

class Search extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      searchType: 0,
      searchStart: false,
    }

    this.switchQueryType = this.switchQueryType.bind(this);
    this.search = this.search.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.fetchTrending();
  }

  fetchTrending() {

  }

  search(query, selectedType = null) {
    const {searchRepos, searchUsers} = this.props;

    const selectedSearchType = selectedType !== null ? selectedType : this.state.searchType;

    if (query !== '') {
      this.setState({
        query: query,
        searchStart: true,
      });

      selectedSearchType === 0 ? searchRepos(query) : searchUsers(query);
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

  renderItem = ({item}) => {
    if (this.state.searchType === 0) {
      return (
        <RepositoryListItem
          repository={item}
          navigation={this.props.navigation} />
      )
    } else {
      return (
        <UserListItem
          user={item}
          navigation={this.props.navigation} />
      )
    }
  }

  // renderCancelSearch() {
  //   if (this.state.searchBegins) {
  //     return (
  //       <Button
  //         buttonStyle={{marginLeft: 0, marginRight: 0, paddingLeft: 5}}
  //         textStyle={{fontFamily: 'AvenirNext-Medium'}}
  //         title='Cancel'
  //         backgroundColor='#fafafa'
  //         color={colors.primarydark}
  //         onPress={() => this.unsetSearchBegins()} />
  //     )
  //   }
  // }

  renderHeader = () => (
    <View>
      <View style={styles.searchBarWrapper}>
        <SearchInput
          onSubmitEditing={(event) => this.search(event.nativeEvent.text)} />
      </View>

      <ButtonGroup
        onPress={this.switchQueryType}
        selectedIndex={this.state.searchType}
        buttons={['Repositories', 'Users']}
        textStyle={styles.buttonGroupText}
        selectedTextStyle={styles.buttonGroupTextSelected}
        containerStyle={{height: 30}} />
    </View>
  );

  render() {
    const {users, repos, isPendingSearchUsers, isPendingSearchRepos} = this.props;
    const {query, searchType, searchStart} = this.state;

    return (
      <ViewContainer>
      <View>
        <View style={styles.searchBarWrapper}>
          <SearchInput
            onSubmitEditing={(event) => this.search(event.nativeEvent.text)} />
        </View>

        <ButtonGroup
          onPress={this.switchQueryType}
          selectedIndex={this.state.searchType}
          buttons={['Repositories', 'Users']}
          textStyle={styles.buttonGroupText}
          selectedTextStyle={styles.buttonGroupTextSelected}
          containerStyle={{height: 30}} />
      </View>

      {isPendingSearchUsers && searchType === 1 &&
        <LoadingContainer animating={isPendingSearchUsers && searchType === 1} />
      }

      {isPendingSearchRepos && searchType === 0 &&
        <LoadingContainer animating={isPendingSearchRepos && searchType === 0} />
      }

      {searchStart &&
        <FlatList
          data={searchType === 0 ? repos : users}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      }

      {!searchStart && <Text>Trending</Text>}
      </ViewContainer>
    )
  }

  keyExtractor = item => {
    return item.id;
  };
}

const styles = StyleSheet.create({
  searchBarWrapper: {
    flexDirection:'row',
    marginTop: 20,
  },
  list: {
    marginTop: 0,
  },
  buttonGroupText: {
    fontFamily: 'AvenirNext-Bold',
  },
  buttonGroupTextSelected: {
    color: colors.black,
  },
  loadingIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
