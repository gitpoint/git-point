import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, TextInput } from 'react-native';

import {
  ViewContainer,
  SectionList,
} from 'components';
import { colors, fonts } from 'config';
import { submitNewIssue } from '../issue.action';

const styles = StyleSheet.create({
  listItemTitle: {
    color: colors.black,
    ...fonts.fontPrimary,
  },
  closeActionTitle: {
    color: colors.red,
    ...fonts.fontPrimary,
  },
  openActionTitle: {
    color: colors.green,
    ...fonts.fontPrimary,
  },
});

const mapStateToProps = state => ({
  repository: state.repository.repository,
});

const mapDispatchToProps = dispatch => ({
  submitNewIssueByDispatch: (
    repoFullName,
    issueTitle,
    issueComment
  ) =>
    dispatch(
      submitNewIssue(
        repoFullName,
        issueTitle,
        issueComment
      )
    ),
});

class NewIssue extends Component {
  props: {
    repository: Object,
  };

  state: {
    issueTitle: string,
    issueComment: string,
  };

  constructor() {
    super();

    this.state = {
      issueTitle: '',
      issueTitleHeight: 0,
      issueComment: '',
      issueCommentHeight: 0,
    };
  }

  render() {
    const { issueTitle, issueComment } = this.state;

    return (
      <ViewContainer>
        <ScrollView>
          <SectionList title="Issue Title">
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholder="Write a title for your issue here"
              blurOnSubmit
              multiline
              onContentSizeChange={event =>
                this.setState({
                  issueTitleHeight: event.nativeEvent.contentSize.height,
                })}
              onChangeText={text => this.setState({ issueTitle: text })}
              placeholderTextColor={colors.grey}
              style={[
                styles.textInput,
                { height: Math.max(60, this.state.issueTitleHeight) },
              ]}
              value={issueTitle}
            />
          </SectionList>

          <SectionList title="Issue comment">
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholder="Write a comment for your issue here"
              blurOnSubmit
              multiline
              onChangeText={text => this.setState({ issueComment: text })}
              onContentSizeChange={event =>
                this.setState({
                  issueCommentHeight: event.nativeEvent.contentSize.height,
                })}
              placeholderTextColor={colors.grey}
              style={[
                styles.textInput,
                { height: Math.max(60, this.state.issueCommentHeight) },
              ]}
              value={issueComment}
            />
          </SectionList>
        </ScrollView>
      </ViewContainer>
    );
  }
}

export const NewIssueScreen = connect(mapStateToProps, mapDispatchToProps)(
  NewIssue
);
