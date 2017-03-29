import React, {Component, PropTypes} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';

import ViewContainer from '../components/ViewContainer';

import colors from '../config/colors';

import {connect} from 'react-redux';
import {getContents} from '../actions/repository';

const mapStateToProps = state => ({
  repository: state.repository.repository,
  contents: state.repository.contents,
  isPendingContents: state.repository.isPendingContents,
});

const mapDispatchToProps = dispatch => ({
  getContents: url => dispatch(getContents(url)),
});

class RepositoryCodeList extends Component {
  componentDidMount() {
    const navigationParams = this.props.navigation.state.params;
    const url = navigationParams.topLevel ? this.props.repository.contents_url.replace('{+path}', '') : navigationParams.content.url;
    this.props.getContents(url);
  }

  sortedContents = contents => contents.sort((a, b) => {
    return a.type === b.type ? 0 : a.type === 'dir' ? -1 : 1;
  });

  goToPath = content => {
    if (content.type === 'dir') {
      return this.props.navigation.navigate('RepositoryCodeList', {
        topLevel: false,
        content: content,
      });
    }
  };

  render() {
    const {
      contents,
      isPendingContents,
    } = this.props;

    return (
      <ViewContainer barColor="dark">
        {!isPendingContents &&
          <FlatList
            data={this.sortedContents(contents)}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />}
      </ViewContainer>
    );
  }

  renderItem = ({item}) => (
    <ListItem
      title={item.name}
      leftIcon={{
        name: item.type === 'dir' ? 'folder-open' : 'insert-drive-file',
        color: colors.grey,
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
    fontFamily: 'AvenirNext-Regular',
  },
  titleBold: {
    color: colors.black,
    fontFamily: 'AvenirNext-DemiBold',
  },
});

RepositoryCodeList.propTypes = {
  getContents: PropTypes.func,
  repository: PropTypes.object,
  contents: PropTypes.object,
  isPendingContents: PropTypes.bool,
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryCodeList);
