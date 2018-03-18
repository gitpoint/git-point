/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, ScrollView, StyleSheet, TextInput, Alert } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';
import { withI18n } from '@lingui/react';

import { ViewContainer, SectionList } from 'components';
import { colors, fonts, normalize } from 'config';
import { mergePullRequest } from '../issue.action';

const mapStateToProps = state => ({
  locale: state.auth.locale,
  repository: state.repository.repository,
  issue: state.issue.issue,
  isPendingMerging: state.repository.isPendingMerging,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      mergePullRequest,
    },
    dispatch
  );

const styles = StyleSheet.create({
  listItemTitle: {
    color: colors.black,
    ...fonts.fontPrimary,
  },
  textInput: {
    fontSize: normalize(12),
    marginHorizontal: 15,
    flex: 1,
    color: colors.black,
    ...fonts.fontPrimary,
  },
  mergeActionTitle: {
    color: colors.green,
    ...fonts.fontPrimary,
  },
  mergeListItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  listItemContainer: {
    flex: 1,
  },
  iconContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

class PullMerge extends Component {
  props: {
    mergePullRequest: Function,
    i18n: Object,
    repository: Object,
    issue: Object,
    // isPendingMerging: boolean,
    navigation: Object,
  };

  state: {
    mergeMethod: number,
    commitTitle: string,
    commitMessage: string,
  };

  constructor() {
    super();

    this.state = {
      mergeMethod: 0,
      commitTitle: '',
      commitTitleHeight: 0,
      commitMessage: '',
      commitMessageHeight: 0,
    };
  }

  mergeMethodMessages = () => {
    const { i18n } = this.props;

    return [i18n.t`Create a merge commit`, i18n.t`Squash and merge`];
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  handlePress = index => {
    if (index !== this.mergeMethodMessages().length) {
      this.setState({
        mergeMethod: index,
      });
    }
  };

  mergePullRequest = () => {
    const {
      repository,
      issue,
      mergePullRequest,
      i18n,
      navigation,
    } = this.props;
    const { mergeMethod, commitTitle, commitMessage } = this.state;
    const mergeMethodTypes = [i18n.t`merge`, i18n.t`squash`];

    if (commitTitle === '') {
      Alert.alert(i18n.t`You need to have a commit title!`, null, [
        { text: i18n.t`OK` },
      ]);
    } else {
      mergePullRequest(
        repository.full_name,
        issue.number,
        commitTitle,
        commitMessage,
        mergeMethodTypes[mergeMethod]
      ).then(() => {
        navigation.goBack();
      });
    }
  };

  render() {
    const { i18n } = this.props;
    const { mergeMethod, commitTitle, commitMessage } = this.state;

    return (
      <ViewContainer>
        <ScrollView>
          <SectionList title={i18n.t`Commit Title`}>
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholder={i18n.t`Write a title for your commit here`}
              blurOnSubmit
              multiline
              onContentSizeChange={event =>
                this.setState({
                  commitTitleHeight: event.nativeEvent.contentSize.height,
                })
              }
              onChangeText={text => this.setState({ commitTitle: text })}
              placeholderTextColor={colors.grey}
              style={[
                styles.textInput,
                { height: Math.max(60, this.state.commitTitleHeight) },
              ]}
              value={commitTitle}
            />
          </SectionList>

          <SectionList title={i18n.t`Commit Message`}>
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholder={i18n.t`Write a message for your commit here`}
              blurOnSubmit
              multiline
              onChangeText={text => this.setState({ commitMessage: text })}
              onContentSizeChange={event =>
                this.setState({
                  commitMessageHeight: event.nativeEvent.contentSize.height,
                })
              }
              placeholderTextColor={colors.grey}
              style={[
                styles.textInput,
                { height: Math.max(60, this.state.commitMessageHeight) },
              ]}
              value={commitMessage}
            />
          </SectionList>

          <SectionList title={i18n.t`Merge Type`}>
            <View style={styles.mergeListItemContainer}>
              <View style={styles.listItemContainer}>
                <ListItem
                  title={this.mergeMethodMessages()[mergeMethod]}
                  hideChevron
                  underlayColor={colors.greyLight}
                  titleStyle={styles.mergeActionTitle}
                  onPress={() => this.mergePullRequest()}
                />
              </View>

              <View style={styles.iconContainer}>
                <Icon
                  color={colors.grey}
                  size={24}
                  name="pencil"
                  type="octicon"
                  onPress={this.showActionSheet}
                />
              </View>
            </View>
          </SectionList>
        </ScrollView>

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={i18n.t`Change Merge Type`}
          options={[...this.mergeMethodMessages(), i18n.t`Cancel`]}
          cancelButtonIndex={this.mergeMethodMessages().length}
          onPress={this.handlePress}
        />
      </ViewContainer>
    );
  }
}

export const PullMergeScreen = connect(mapStateToProps, mapDispatchToProps)(
  withI18n()(PullMerge)
);
