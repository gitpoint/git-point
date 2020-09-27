/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import {
  ViewContainer,
  DiffBlocks,
  CodeLine,
  LoadingContainer,
} from 'components';
import Parse from 'parse-diff';
import { t } from 'utils';
import { colors, fonts, normalize } from 'config';
import styled from 'styled-components';
import { getCommitDetails } from '../repository.action';

const mapStateToProps = state => ({
  locale: state.auth.locale,
  commit: state.repository.commit,
  diff: state.repository.diff,
  isPendingCommit: state.repository.isPendingCommit,
  isPendingDiff: state.repository.isPendingDiff,
});

const mapDispatchToProps = dispatch => ({
  getCommitDetailsByDispatch: commit => dispatch(getCommitDetails(commit)),
});

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
  headerContainer: {
    paddingTop: 15,
    paddingHorizontal: 25,
  },
  header: {
    flex: 1,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerItem: {
    flex: 1,
  },
  headerText: {
    ...fonts.fontPrimary,
    fontSize: normalize(14),
  },
});
const FieldTitle = styled.Text`
  color: ${colors.greyDark};
`;
const ProfileLink = styled.Text`
  color: ${colors.black};
  ${fonts.fontPrimarySemiBold};
`;

class Commit extends Component {
  props: {
    navigation: Object,
    commit: Object,
    diff: string,
    isPendingCommit: boolean,
    isPendingDiff: boolean,
    getCommitDetailsByDispatch: Function,
    locale: string,
  };

  componentDidMount() {
    const { navigation, getCommitDetailsByDispatch } = this.props;
    const commit = navigation.state.params.commit;

    getCommitDetailsByDispatch(commit);
  }

  keyExtractor = (item, index) => {
    return index;
  };

  navigateToProfile = user => {
    this.props.navigation.navigate('Profile', {
      user,
    });
  };

  renderHeader = () => {
    const { commit, locale, isPendingCommit } = this.props;
    const message = commit.commit ? commit.commit.message : 'Loading...';

    if (isPendingCommit || !commit.files) {
      return <Text>{message}</Text>;
    }

    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text>{message}</Text>
        </View>
        {!!commit.author && (
          <View style={styles.header}>
            <Text>
              <FieldTitle>{t('Author: ', locale)}</FieldTitle>
              <ProfileLink
                onPress={() => this.navigateToProfile(commit.author)}
              >
                {commit.author.login}
              </ProfileLink>
            </Text>
          </View>
        )}
        {!!commit.committer && (
          <View style={styles.header}>
            <Text>
              <FieldTitle>{t('Committer: ', locale)}</FieldTitle>
              <ProfileLink
                onPress={() => this.navigateToProfile(commit.committer)}
              >
                {commit.committer.login}
              </ProfileLink>
            </Text>
          </View>
        )}
        <View style={styles.header}>
          <Text style={[styles.headerItem, styles.headerText]}>
            {t('{numFilesChanged} files', locale, {
              numFilesChanged: isPendingCommit ? 0 : commit.files.length,
            })}
          </Text>

          <DiffBlocks
            style={styles.headerItem}
            additions={isPendingCommit ? 0 : commit.stats.additions}
            deletions={isPendingCommit ? 0 : commit.stats.deletions}
            showNumbers
          />
        </View>
      </View>
    );
  };

  renderItem = ({ item }) => {
    const { locale } = this.props;
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
    const { diff, isPendingCommit, isPendingDiff } = this.props;
    const filesChanged = isPendingDiff || diff === {} ? [] : Parse(diff);

    return (
      <ViewContainer>
        {(isPendingCommit || isPendingDiff) && (
          <LoadingContainer
            animating={isPendingCommit || isPendingDiff}
            center
          />
        )}

        {!isPendingCommit &&
          !isPendingDiff && (
            <FlatList
              ListHeaderComponent={this.renderHeader}
              removeClippedSubviews={false}
              data={filesChanged}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
              disableVirtualization
            />
          )}
      </ViewContainer>
    );
  }
}

export const CommitScreen = connect(mapStateToProps, mapDispatchToProps)(
  Commit
);
