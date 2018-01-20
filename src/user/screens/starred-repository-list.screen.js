import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatList } from 'react-native';

import { getStarredRepositories } from 'user';

import {
  ViewContainer,
  RepositoryListItem,
  LoadingRepositoryListItem,
} from 'components';

const mapStateToProps = state => ({
  user: state.user.user,
  starredRepositories: state.user.starredRepositories,
  isPendingStarredRepositories: state.user.isPendingStarredRepositories,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getStarredRepositories }, dispatch);

class StarredRepositoryList extends Component {
  props: {
    user: Object,
    starredRepositories: Array,
    navigation: Object,
    isPendingStarredRepositories: boolean,
    getStarredRepositories: Function,
  };

  componentWillMount() {
    const user = this.props.navigation.state.params.user;

    this.props.getStarredRepositories(user);
  }

  render() {
    const {
      starredRepositories,
      navigation,
      isPendingStarredRepositories,
    } = this.props;

    const repoCount = navigation.state.params.repoCount;

    return (
      <ViewContainer>
        {isPendingStarredRepositories &&
          [...Array(repoCount)].map(
            (item, index) => <LoadingRepositoryListItem key={index} /> // eslint-disable-line react/no-array-index-key
          )}
        {!isPendingStarredRepositories && (
          <FlatList
            data={starredRepositories}
            renderItem={({ item }) => (
              <RepositoryListItem repository={item} navigation={navigation} />
            )}
          />
        )}
      </ViewContainer>
    );
  }
}

export const StarredRepositoryListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(StarredRepositoryList);
