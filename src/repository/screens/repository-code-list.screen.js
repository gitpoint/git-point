import React, { Component } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { ViewContainer } from 'components';

import { colors, normalize } from 'config';

import { connect } from 'react-redux';
import { getContents } from '../repository.action';

const mapStateToProps = state => ({
  repository: state.repository.repository,
  contents: state.repository.contents,
  isPendingContents: state.repository.isPendingContents
});

const mapDispatchToProps = dispatch => ({
  getContents: (url, level) => dispatch(getContents(url, level))
});

class RepositoryCodeList extends Component {
  props: {
    getContents: Function,
    repository: Object,
    contents: Array,
    isPendingContents: boolean,
    navigation: Object
  };

  componentDidMount() {
    const navigationParams = this.props.navigation.state.params;
    const url = navigationParams.topLevel
      ? this.props.repository.contents_url.replace('{+path}', '')
      : navigationParams.content.url;
    const level = navigationParams.topLevel
      ? 'top'
      : navigationParams.content.name;

    this.props.getContents(url, level);
  }

  sortedContents = contents => {
    if (contents) {
      return contents.sort((a, b) => {
        return a.type === b.type ? 0 : a.type === 'dir' ? -1 : 1;
      });
    }
  };

  goToPath = content => {
    if (content.type === 'dir') {
      return this.props.navigation.navigate('RepositoryCodeList', {
        topLevel: false,
        content: content
      });
    } else {
      return this.props.navigation.navigate('RepositoryFile', {
        content: content
      });
    }
  };

  render() {
    const { contents, isPendingContents, navigation } = this.props;

    return (
      <ViewContainer>
        {!isPendingContents &&
          contents.length > 0 &&
          <FlatList
            data={
              navigation.state.params.topLevel
                ? this.sortedContents(contents.top)
                : this.sortedContents(
                    contents[navigation.state.params.content.name]
                  )
            }
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />}

        {!isPendingContents &&
          contents.length === 0 &&
          <View style={styles.marginSpacing}>
            <Text style={styles.noCodeTitle}>
              There's no code in this repository
            </Text>
          </View>}
      </ViewContainer>
    );
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      leftIcon={{
        name: item.type === 'dir' ? 'file-directory' : 'file',
        color: colors.grey,
        type: 'octicon'
      }}
      titleStyle={item.type === 'dir' ? styles.titleBold : styles.title}
      onPress={() => this.goToPath(item)}
      underlayColor={colors.greyLight}
    />
  );

  keyExtractor = item => {
    return item.id;
  };
}

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontFamily: 'AvenirNext-Regular'
  },
  titleBold: {
    color: colors.black,
    fontFamily: 'AvenirNext-DemiBold'
  },
  marginSpacing: {
    marginTop: 40
  },
  noCodeTitle: {
    fontSize: normalize(18),
    textAlign: 'center'
  }
});

export const RepositoryCodeListScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryCodeList);
