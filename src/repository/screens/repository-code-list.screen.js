import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

import { ViewContainer, LoadingListItem } from 'components';
import { colors, fonts, normalize } from 'config';
import { getContents } from '../repository.action';

const mapStateToProps = state => ({
  contents: state.repository.contents,
  isPendingContents: state.repository.isPendingContents,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getContents,
    },
    dispatch
  );

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    ...fonts.fontPrimaryLight,
  },
  titleBold: {
    color: colors.black,
    ...fonts.fontPrimarySemiBold,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noCodeTitle: {
    fontSize: normalize(18),
    textAlign: 'center',
  },
  container: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
});

class RepositoryCodeList extends Component {
  props: {
    getContents: Function,
    contents: Array,
    isPendingContents: boolean,
    navigation: Object,
  };

  componentDidMount() {
    const navigationParams = this.props.navigation.state.params;
    const url = navigationParams.topLevel
      ? navigationParams.contentsUrl
      : navigationParams.content.url;
    const level = navigationParams.topLevel
      ? 'top'
      : navigationParams.content.name;

    this.props.getContents(url, level);
  }

  sortedContents = contents => {
    if (contents) {
      return contents.sort((a, b) => {
        return a.type === b.type ? 0 : a.type === 'dir' ? -1 : 1; // eslint-disable-line no-nested-ternary
      });
    }

    return null;
  };

  goToPath = content => {
    if (content.type === 'dir') {
      return this.props.navigation.navigate('RepositoryCodeList', {
        topLevel: false,
        content,
      });
    }

    return this.props.navigation.navigate('RepositoryFile', {
      content,
    });
  };

  keyExtractor = item => {
    return item.path;
  };

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      leftIcon={{
        name: item.type === 'dir' ? 'file-directory' : 'file',
        color: colors.grey,
        type: 'octicon',
      }}
      titleStyle={item.type === 'dir' ? styles.titleBold : styles.title}
      containerStyle={styles.container}
      onPress={() => this.goToPath(item)}
      underlayColor={colors.greyLight}
    />
  );

  render() {
    const { contents, isPendingContents, navigation } = this.props;
    const currentContents = navigation.state.params.topLevel
      ? contents.top
      : contents[navigation.state.params.content.name];

    return (
      <ViewContainer>
        {isPendingContents &&
          [...Array(15)].map((item, index) => <LoadingListItem key={index} />) // eslint-disable-line react/no-array-index-key
        }

        {!isPendingContents &&
          currentContents &&
          currentContents.length > 0 && (
            <FlatList
              data={this.sortedContents(currentContents)}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
          )}

        {!isPendingContents &&
          navigation.state.params.topLevel &&
          currentContents &&
          currentContents.message && (
            <View style={styles.textContainer}>
              <Text style={styles.noCodeTitle}>{currentContents.message}</Text>
            </View>
          )}
      </ViewContainer>
    );
  }
}

export const RepositoryCodeListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryCodeList);
