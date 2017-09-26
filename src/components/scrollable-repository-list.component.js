import React, { Component } from 'react';
import { FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { RepositoryListItem } from 'components';

const styles = StyleSheet.create({
  loading: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export class ScrollableRepositoryList extends Component {
  constructor() {
    super();

    this.state = {
      page: 1,
      totalPages: 1,
    };
  }

  renderLoading(isLoadingMoreRepositories) {
    if (!isLoadingMoreRepositories) return;

    return <ActivityIndicator animating size="large" style={styles.loading} />;
  }

  render() {
    const {
      repositories,
      getMoreRepositories,
      isLoadingMoreRepositories,
      navigation,
    } = this.props;

    return (
      <FlatList
        data={repositories}
        onEndReached={getMoreRepositories}
        onEndReachedThreshold={0.5}
        ListFooterComponent={this.renderLoading(isLoadingMoreRepositories)}
        renderItem={({ item }) =>
          <RepositoryListItem repository={item} navigation={navigation} />}
      />
    );
  }
}
