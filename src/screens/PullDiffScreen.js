import React, {Component, PropTypes} from 'react';
import {View, FlatList} from 'react-native';
import {Card, ListItem} from 'react-native-elements';

import Parse from 'parse-diff';

import ViewContainer from '../components/ViewContainer';
import CodeLine from '../components/CodeLine';

class PullDiff extends Component {
  componentDidMount() {
    const files = Parse(this.props.navigation.state.params.diff);

    console.log(files);

    files.forEach(function(file) {
      console.log(file.chunks.length); // number of hunks
      console.log(file.chunks[0].changes.length); // hunk added/deleted/context lines
      // each item in changes is a string
      console.log(file.deletions); // number of deletions in the patch
      console.log(file.additions); // number of additions in the patch
    });
  }

  renderItem = ({item}) => {
    var chunks = item.chunks.map((chunk, i) => {
      return (
        <View>
          <CodeLine key={i} newChunk change={{content: chunk.content}}/>

          {chunk.changes.map((change, i) => (
            <CodeLine key={i} change={change}/>
          ))}
        </View>
      );
    });

    return (
      <Card containerStyle={{padding: 0}} titleStyle={{margin: 0}} title={item.from}>
        {chunks}
      </Card>
    );
  };

  render() {
    const {navigation} = this.props;
    const filesChanged = Parse(navigation.state.params.diff);

    return (
      <ViewContainer>
        <FlatList
          removeClippedSubviews={false}
          data={filesChanged}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </ViewContainer>
    );
  }

  keyExtractor = item => {
    return item.id;
  };
}

PullDiff.propTypes = {
  diff: PropTypes.string,
};

export default PullDiff;
