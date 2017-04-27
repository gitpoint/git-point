import React, {Component, PropTypes} from 'react';
import {View, ScrollView, Text, FlatList, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';

import Parse from 'parse-diff';

import ViewContainer from '../components/ViewContainer';
import DiffBlocks from '../components/DiffBlocks';
import CodeLine from '../components/CodeLine';

import colors from '../config/colors';

class PullDiff extends Component {
  componentDidMount() {
    const files = Parse(this.props.navigation.state.params.diff);

    console.log(files);
  }

  renderFileTitle = (title) => {
    <View>
     <Text>{title}</Text>
    </View>
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
      <Card
        containerStyle={styles.fileChangeContainer}
        dividerStyle={styles.dividerStyle}>
          <ScrollView
            style={styles.fileTitleContainer}
            automaticallyAdjustContentInsets={false}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
              <View style={styles.linesChanged}>
                <Text style={styles.codeStyle}>{item.additions + item.deletions}</Text>
              </View>

              <Text style={[styles.fileTitle, styles.codeStyle]}>{item.from}</Text>
          </ScrollView>
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

const styles = StyleSheet.create({
  fileChangeContainer: {
    padding: 0,
  },
  fileTitleContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    backgroundColor: colors.greyVeryLight,
  },
  linesChanged: {
    flex: 0.15,
    width: 50,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fileTitle: {
    flex: 1,
  },
  codeStyle: {
    fontFamily: 'Menlo',
    fontSize: 12,
  },
  dividerStyle: {
    marginBottom: 0,
  },
});

export default PullDiff;
