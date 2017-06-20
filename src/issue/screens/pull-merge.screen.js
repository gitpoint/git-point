import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  ActionSheetIOS,
  Alert
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import { ViewContainer, SectionList } from 'components';

import config from 'config';

import { connect } from 'react-redux';
import { mergePullRequest } from '../issue.action';

const mapStateToProps = state => ({
  repository: state.repository.repository,
  issue: state.issue.issue,
  isPendingMerging: state.repository.isPendingMerging
});

const mapDispatchToProps = dispatch => ({
  mergePullRequest: (
    repoFullName,
    issueNum,
    commitTitle,
    commitMessage,
    mergeMethod
  ) =>
    dispatch(
      mergePullRequest(
        repoFullName,
        issueNum,
        commitTitle,
        commitMessage,
        mergeMethod
      )
    )
});

class PullMerge extends Component {
  state: {
    mergeMethod: number,
    commitTitle: string,
    commitMessage: string
  };

  props: {
    mergePullRequest: Function,
    repository: Object,
    issue: Object,
    isPendingMerging: boolean,
    navigation: Object
  };

  constructor() {
    super();

    this.state = {
      mergeMethod: 0,
      commitTitle: '',
      commitTitleHeight: 0,
      commitMessage: '',
      commitMessageHeight: 0
    };
  }

  render() {
    const { mergeMethod, commitTitle, commitMessage } = this.state;
    const mergeMethodMessages = ['Create a merge commit', 'Squash and merge'];

    return (
      <ViewContainer>
        <ScrollView>
          <SectionList title="Commit Title">
            <TextInput
              placeholder="Write a title for your commit here"
              blurOnSubmit
              multiline
              onContentSizeChange={event =>
                this.setState({
                  commitTitleHeight: event.nativeEvent.contentSize.height
                })}
              onChangeText={commitTitle => this.setState({ commitTitle })}
              placeholderTextColor={config.colors.grey}
              style={[
                styles.textInput,
                { height: Math.max(60, this.state.commitTitleHeight) }
              ]}
              value={commitTitle}
            />
          </SectionList>

          <SectionList title="Commit Message">
            <TextInput
              placeholder="Write a message for your commit here"
              blurOnSubmit
              multiline
              onChangeText={commitMessage => this.setState({ commitMessage })}
              onContentSizeChange={event =>
                this.setState({
                  commitMessageHeight: event.nativeEvent.contentSize.height
                })}
              placeholderTextColor={config.colors.grey}
              style={[
                styles.textInput,
                { height: Math.max(60, this.state.commitMessageHeight) }
              ]}
              value={commitMessage}
            />
          </SectionList>

          <SectionList title="Merge Type">
            <View style={styles.mergeListItemContainer}>
              <View style={styles.listItemContainer}>
                <ListItem
                  title={mergeMethodMessages[mergeMethod]}
                  hideChevron
                  underlayColor={config.colors.greyLight}
                  titleStyle={styles.mergeActionTitle}
                  onPress={() => this.mergePullRequest()}
                />
              </View>

              <View style={styles.iconContainer}>
                <Icon
                  color={config.colors.grey}
                  size={24}
                  name="pencil"
                  type="octicon"
                  onPress={() => this.changeMergeMethod(mergeMethodMessages)}
                />
              </View>
            </View>
          </SectionList>
        </ScrollView>
      </ViewContainer>
    );
  }

  mergePullRequest = () => {
    const { repository, issue, mergePullRequest } = this.props;
    const { mergeMethod, commitTitle, commitMessage } = this.state;
    const mergeMethodTypes = ['merge', 'squash'];

    if (commitTitle === '') {
      Alert.alert('You need to have a commit title!', null, [{ text: 'OK' }]);
    } else {
      mergePullRequest(
        repository.full_name,
        issue.number,
        commitTitle,
        commitMessage,
        mergeMethodTypes[mergeMethod]
      );
    }
  };

  changeMergeMethod = mergeMethodMessages => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: `Change Merge Type`,
        options: [...mergeMethodMessages, 'Cancel'],
        cancelButtonIndex: mergeMethodMessages.length
      },
      buttonIndex => {
        if (buttonIndex !== mergeMethodMessages.length) {
          this.setState({
            mergeMethod: buttonIndex
          });
        }
      }
    );
  };
}

const styles = StyleSheet.create({
  listItemTitle: {
    color: config.colors.black,
    fontFamily: 'AvenirNext-Medium'
  },
  textInput: {
    fontSize: 14,
    marginHorizontal: 15,
    flex: 1,
    color: config.colors.black,
    fontFamily: 'AvenirNext-Regular'
  },
  mergeActionTitle: {
    color: config.colors.green,
    fontFamily: 'AvenirNext-Medium'
  },
  mergeListItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10
  },
  listItemContainer: {
    flex: 1
  },
  iconContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
});

export const PullMergeScreen = connect(mapStateToProps, mapDispatchToProps)(
  PullMerge
);
