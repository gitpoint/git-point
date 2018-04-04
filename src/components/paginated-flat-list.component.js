import React, { Component } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components';

const LoaderWrapper = styled.View`
  padding: 20px 0;
`;

type Props = {
  loadingView: Component,
  loadMoreData: Function,
  lastPageReached: Boolean,
};

export class PaginatedFlatList extends Component<Props> {
  renderFooter = () => {
    const { lastPageReached, loadingView } = this.props;

    return lastPageReached ? null : loadingView;
  };

  render() {
    const {
      loadMoreData,
      lastPageReached,
      loadingView,
      ...remaining
    } = this.props;

    return (
      <FlatList
        removeClippedSubviews={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => loadMoreData()}
        ListFooterComponent={this.renderFooter}
        {...remaining}
      />
    );
  }
}

PaginatedFlatList.defaultProps = {
  loadMoreData: () => {},
  lastPageReached: false,
  loadingView: (
    <LoaderWrapper
      style={{
        paddingVertical: 20,
      }}
    >
      <ActivityIndicator animating size="large" />
    </LoaderWrapper>
  ),
};
