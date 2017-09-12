// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { ViewContainer, SectionList, LoadingModal } from 'components';
import { translate } from 'utils';
import { colors, fonts, normalize } from 'config';
import { editIssueComment } from '../issue.action';

const styles = StyleSheet.create({
  textInput: {
    fontSize: normalize(12),
    marginHorizontal: 15,
    flex: 1,
    color: colors.black,
    ...fonts.fontPrimaryLight,
  },
  submitTitle: {
    color: colors.green,
    ...fonts.fontPrimary,
  },
  listItemContainer: {
    flex: 1,
  },
  titleSmall: {
    color: colors.primaryDark,
    ...fonts.fontPrimarySemiBold,
    fontSize: normalize(10),
  },
});

const mapStateToProps = state => ({
  language: state.auth.language,
  repository: state.repository.repository,
  isEditingIssueComment: state.issue.isEditingIssueComment,
});

const mapDispatchToProps = dispatch => ({
  editIssueCommentByDispatch: (owner, repoName, issueTitle, issueComment) =>
    dispatch(editIssueComment(owner, repoName, issueTitle, issueComment)),
});

class EditIssueComment extends Component {
  props: {
    editIssueCommentByDispatch: Function,
    language: string,
    repository: Object,
    navigation: Object,
    isEditingIssueComment: boolean,
  };

  state: {
    issueComment: string,
    issueCommentHeight: number,
  };

  constructor(props) {
    super(props);

    this.state = {
      issueComment: this.props.navigation.state.params.comment.body,
      issueCommentHeight: 0,
    };
  }

  editIssueComment = () => {
    const { navigation, editIssueCommentByDispatch } = this.props;
    const { repository, comment } = this.props.navigation.state.params;

    const repoName = repository.name;
    const owner = repository.owner.login;
    const text = this.state.issueComment;

    editIssueCommentByDispatch(comment.id, owner, repoName, text).then(() =>
      navigation.goBack()
    );
  };

  render() {
    const { language, repository, isEditingIssueComment } = this.props;
    const { issueComment } = this.state;

    return (
      <ViewContainer>
        {isEditingIssueComment && <LoadingModal />}
        <ScrollView>
          {repository.full_name && (
            <ListItem
              title={repository.full_name}
              titleStyle={styles.titleSmall}
              leftIcon={{
                name: 'repo',
                size: 17,
                color: colors.grey,
                type: 'octicon',
              }}
              hideChevron
            />
          )}

          <SectionList
            title={translate('issue.newIssue.issueComment', language)}
          >
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholder={translate('issue.newIssue.writeAComment', language)}
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

          <SectionList>
            <View style={styles.listItemContainer}>
              <ListItem
                title={translate('common.submit', language)}
                hideChevron
                underlayColor={colors.greyLight}
                titleStyle={styles.submitTitle}
                onPress={() => this.editIssueComment()}
              />
            </View>
          </SectionList>
        </ScrollView>
      </ViewContainer>
    );
  }
}

export const EditIssueCommentScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditIssueComment);
