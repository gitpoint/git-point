/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import Parse from 'parse-diff';

import { ViewContainer, DiffBlocks, CodeLine } from 'components';
import { t } from 'utils';
import { colors, fonts, normalize } from 'config';

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
    ...fonts.fontCode,
    marginRight: 5,
  },
  fileTitle: {
    flex: 1,
    marginLeft: 10,
  },
  codeStyle: {
    ...fonts.fontCode,
    fontSize: normalize(10),
  },
  dividerStyle: {
    marginBottom: 0,
  },
  noChangesMessage: {
    ...fonts.fontPrimarySemiBold,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  newIndicator: {
    ...fonts.fontPrimarySemiBold,
    color: colors.green,
  },
  deletedIndicator: {
    ...fonts.fontPrimarySemiBold,
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
    ...fonts.fontPrimarySemiBold,
    fontSize: normalize(14),
  },
});

class PullDiff extends Component {
  props: {
    navigation: Object,
  };

  keyExtractor = (item, index) => {
    return index;
  };

  renderHeader = () => {
    const { navigation } = this.props;
    const { locale, diff } = navigation.state.params;

    const filesChanged = Parse(diff);

    let lineAdditions = 0;
    let lineDeletions = 0;

    filesChanged.forEach(file => {
      lineAdditions += file.additions;
      lineDeletions += file.deletions;
    });

    return (
      <View style={styles.header}>
        <Text style={[styles.headerItem, styles.headerText]}>
          {t('{numFilesChanged} files', locale, {
            numFilesChanged: filesChanged.length,
          })}
        </Text>

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
    const { navigation } = this.props;
    const { locale } = navigation.state.params;
    const filename = item.deleted ? item.from : item.to;
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
              filename={filename}
            />

            {chunk.changes.map((change, changesIndex) => (
              <CodeLine
                key={changesIndex}
                change={change}
                filename={filename}
              />
            ))}
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

          {item.new && (
            <Text style={styles.fileTitle}>
              <Text style={styles.newIndicator}>
                {t('NEW', locale)}
                {'\n'}
              </Text>
              <Text style={[styles.fileTitle, styles.codeStyle]}>
                {item.to}
              </Text>
            </Text>
          )}

          {item.deleted && (
            <Text style={styles.fileTitle}>
              <Text style={styles.deletedIndicator}>
                {t('DELETED', locale)}
                {'\n'}
              </Text>
              <Text style={[styles.fileTitle, styles.codeStyle]}>
                {item.from}
              </Text>
            </Text>
          )}

          {!item.new &&
            !item.deleted && (
              <Text style={[styles.fileTitle, styles.codeStyle]}>
                {item.from === item.to
                  ? item.to
                  : `${item.from} \n → ${item.to}`}
              </Text>
            )}
        </ScrollView>

        {item.chunks.length > 0 && chunks}

        {item.chunks.length === 0 &&
          !item.new &&
          !item.deleted &&
          item.from !== item.to && (
            <Text style={styles.noChangesMessage}>
              {t('File renamed without any changes', locale)}
            </Text>
          )}
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
