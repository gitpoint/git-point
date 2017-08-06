import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { ViewContainer, CommitListItem } from 'components';
import { translate } from 'utils';
import { normalize } from 'config';

const styles = StyleSheet.create({
  marginSpacing: {
    marginTop: 40,
  },
  noCommit: {
    fontSize: normalize(18),
    textAlign: 'center',
  },
});

class CommitList extends Component {
  props: {
    language: string,
    navigation: Object,
  };

  keyExtractor = item => {
    return item.id;
  };

  renderItem = ({ item }) =>
    <CommitListItem commit={item} navigation={this.props.navigation} />;

  render() {
    const { language, navigation } = this.props;
    const commits = navigation.state.params.commits;

    return (
      <ViewContainer>
        {commits.length > 0 &&
          <FlatList
            removeClippedSubviews={false}
            data={commits}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />}

        {commits.length === 0 &&
          <View style={styles.marginSpacing}>
            <Text style={styles.noCommit}>
              {translate('repository.commitList.noCommit', language)}
            </Text>
          </View>}
      </ViewContainer>
    );
  }
}

export const CommitListScreen = CommitList;
