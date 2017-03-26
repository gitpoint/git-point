import React, { Component } from 'react';
import { StatusBar, FlatList, Animated } from 'react-native';

import ViewContainer from '../components/ViewContainer';
import RepositoryListItem from '../components/RepositoryListItem';
import UserListItem from '../components/UserListItem';
import LoadingUserListItem from '../components/LoadingUserListItem';
import LoadingRepositoryListItem from '../components/LoadingRepositoryListItem';

import colors from '../config/colors';

import { ListItem } from 'react-native-elements'

export default class ListRender extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      list: [],
      searchQuery: '',
      fetchingList: false,
    }
  }

  componentDidMount() {
    this.fetchAll();
  }

  fetchAll() {
    this.setState({
      fetchingList: true,
    });

    fetch(this.endpoint())
      .then((response) => response.json())
      .then((list) => {
        this.setState({
          list,
          fetchingList: false,
        });
      })
      .done();
  }

  endpoint() {
    let user = this.props.navigation.state.params ? this.props.navigation.state.params.user : `housseindjirdeh`;

    switch(this.props.navigation.state.params.listType) {
      case "Repositories":
        return `https://api.github.com/users/${user}/repos`;
      case "Starred":
        return `https://api.github.com/users/${user}/starred`;
      case "Followers":
        return `https://api.github.com/users/${user}/followers`;
      case "Following":
        return `https://api.github.com/users/${user}/following`;
    }
  }

  renderItem = ({item}) => {
    const listType = this.props.navigation.state.params.listType;

    if (listType === 'Repositories' || listType === 'Starred') {
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

  search(query) {
    this.setState({
      searchQuery: query,
    });
  }

  render() {
    const listType = this.props.navigation.state.params.listType;

    return (
      <ViewContainer
        barColor="dark">

        { this.state.fetchingList && (listType === 'Followers' || listType === 'Following') &&
            [...Array(this.props.navigation.state.params.showLoadingCount)].map((item, i) => (
              <LoadingUserListItem key={i}/>
            ))
        }

        { this.state.fetchingList && (listType !== 'Followers' || listType !== 'Following') &&
            [...Array(this.props.navigation.state.params.showLoadingCount)].map((item, i) => (
              <LoadingRepositoryListItem key={i}/>
            ))
        }

        { !this.state.fetchingList &&
          <FlatList
            data={this.state.list}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        }
      </ViewContainer>
    )
  }

  keyExtractor = (item) => {
    return item.id;
  }
}
