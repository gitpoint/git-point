import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, TextInput, View, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';

import { ViewContainer, SectionList } from 'components';
import { translate } from 'utils';
import { colors, fonts, normalize } from 'config';
import { submitNewIssue } from '../issue.action';

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
});

const mapDispatchToProps = dispatch => ({
  submitNewIssueByDispatch: (owner, repoName, issueTitle, issueComment) =>
    dispatch(submitNewIssue(owner, repoName, issueTitle, issueComment)),
});

class NewIssue extends Component {
  props: {
    submitNewIssueByDispatch: Function,
    language: string,
    repository: Object,
    navigation: Object,
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

  submitNewIssue = () => {
    const {
      submitNewIssueByDispatch,
      repository,
      language,
      navigation,
    } = this.props;
    const { issueTitle, issueComment } = this.state;
    const repoName = repository.name;
    const owner = repository.owner.login;

    if (issueTitle === '') {
      Alert.alert(
        translate('issue.newIssue.missingTitleAlert', language),
        null,
        [{ text: translate('common.ok', language) }]
      );
    } else {
      submitNewIssueByDispatch(
        owner,
        repoName,
        issueTitle,
        issueComment
      ).then(issue => {
        navigation.navigate('Issue', {
          issue,
        });
      });
    }
  };

  render() {
    const { language, repository } = this.props;
    const { issueTitle, issueComment } = this.state;

    return (
      <ViewContainer>
        <ScrollView>
          {repository.full_name &&
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
            />}
          <SectionList title={translate('issue.newIssue.issueTitle', language)}>
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholder={translate('issue.newIssue.writeATitle', language)}
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

          <SectionList
            title={translate('issue.newIssue.issueComment', language)}
          >
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholder={translate('issue.newIssue.writeAComment', language)}
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

          <SectionList>
            <View style={styles.listItemContainer}>
              <ListItem
                title={translate('common.submit', language)}
                hideChevron
                underlayColor={colors.greyLight}
                titleStyle={styles.submitTitle}
                onPress={() => this.submitNewIssue()}
              />
            </View>
          </SectionList>
        </ScrollView>
      </ViewContainer>
    );
  }
}

export const NewIssueScreen = connect(mapStateToProps, mapDispatchToProps)(
  NewIssue
);
