/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import Parse from 'parse-diff';

import { ViewContainer, DiffBlocks, CodeLine } from 'components';
import { colors, normalize } from 'config';

const styles = StyleSheet.create({
  fileChangeContainer: {
    padding: 0,
    marginTop: 12,
    marginBottom: 12,
  },
  fileTitleContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    backgroundColor: colors.greyVeryLight,
  },
  linesChanged: {
    flex: 0.3,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineNumbersChanged: {
    fontFamily: 'Menlo',
    marginRight: 5,
  },
  fileTitle: {
    flex: 1,
    marginLeft: 10,
  },
  codeStyle: {
    fontFamily: 'Menlo',
    fontSize: normalize(10),
  },
  dividerStyle: {
    marginBottom: 0,
  },
  noChangesMessage: {
    fontFamily: 'AvenirNext-DemiBold',
    paddingVertical: 5,
    paddingLeft: 10,
  },
  newIndicator: {
    fontFamily: 'AvenirNext-DemiBold',
    color: colors.green,
  },
  deletedIndicator: {
    fontFamily: 'AvenirNext-DemiBold',
    color: colors.red,
  },
  header: {
    paddingTop: 25,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerItem: {
    flex: 1,
  },
  headerText: {
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: normalize(14),
  },
});

class PullDiff extends Component {
  props: {
    diff: string,
    navigation: Object,
  };

  keyExtractor = (item, index) => {
    return index;
  };

  renderHeader = () => {
    const filesChanged = this.props.navigation.state.params
      ? Parse(this.props.navigation.state.params.diff)
      : [];

    let lineAdditions = 0;
    let lineDeletions = 0;

    filesChanged.forEach(file => {
      lineAdditions += file.additions;
      lineDeletions += file.deletions;
    });

    return (
      <View style={styles.header}>
        <Text
          style={[styles.headerItem, styles.headerText]}
        >{`${filesChanged.length} ${filesChanged.length === 1
          ? 'file'
          : 'files'}`}</Text>

        <DiffBlocks
          style={styles.headerItem}
          additions={lineAdditions}
          deletions={lineDeletions}
          showNumbers
        />
      </View>
    );
  };

  renderItem = ({ item }) => {
    const chunks = item.chunks.map((chunk, index) => {
      return (
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          <View style={{ flexDirection: 'column' }}>
            <CodeLine
              key={index}
              newChunk
              change={{ content: chunk.content }}
            />

            {chunk.changes.map((change, changesIndex) =>
              <CodeLine key={changesIndex} change={change} />
            )}
          </View>
        </ScrollView>
      );
    });

    return (
      <Card
        containerStyle={styles.fileChangeContainer}
        dividerStyle={styles.dividerStyle}
      >
        <ScrollView
          style={styles.fileTitleContainer}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          <View style={styles.linesChanged}>
            <Text style={[styles.codeStyle, styles.lineNumbersChanged]}>
              {item.additions + item.deletions}
            </Text>
            <DiffBlocks additions={item.additions} deletions={item.deletions} />
          </View>

          {item.new &&
            <Text style={styles.fileTitle}>
              <Text style={styles.newIndicator}>
                NEW{'\n'}
              </Text>
              <Text style={[styles.fileTitle, styles.codeStyle]}>
                {item.to}
              </Text>
            </Text>}

          {item.deleted &&
            <Text style={styles.fileTitle}>
              <Text style={styles.deletedIndicator}>
                DELETED{'\n'}
              </Text>
              <Text style={[styles.fileTitle, styles.codeStyle]}>
                {item.from}
              </Text>
            </Text>}

          {!item.new &&
            !item.deleted &&
            <Text style={[styles.fileTitle, styles.codeStyle]}>
              {item.from === item.to ? item.to : `${item.from} \n → ${item.to}`}
            </Text>}
        </ScrollView>

        {item.chunks.length > 0 && chunks}

        {item.chunks.length === 0 &&
          !item.new &&
          !item.deleted &&
          item.from !== item.to &&
          <Text style={styles.noChangesMessage}>
            File renamed without changes.
          </Text>}
      </Card>
    );
  };

  render() {
    const { navigation } = this.props;
    const filesChanged = navigation.state.params
      ? Parse(navigation.state.params.diff)
      : [];

    return (
      <ViewContainer>
        <FlatList
          ListHeaderComponent={this.renderHeader}
          removeClippedSubviews={false}
          data={filesChanged}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          disableVirtualization
        />
      </ViewContainer>
    );
  }
}

export const PullDiffScreen = PullDiff;
