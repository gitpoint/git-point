import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, TextInput, View, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';

import { ViewContainer, SectionList } from 'components';
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
  repository: state.repository.repository,
});

const mapDispatchToProps = dispatch => ({
  submitNewIssueByDispatch: (owner, repoName, issueTitle, issueComment) =>
    dispatch(submitNewIssue(owner, repoName, issueTitle, issueComment)),
});

class NewIssue extends Component {
  props: {
    submitNewIssueByDispatch: Function,
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
    const { submitNewIssueByDispatch, repository, navigation } = this.props;
    const { issueTitle, issueComment } = this.state;
    const repoName = repository.name;
    const owner = repository.owner.login;

    if (issueTitle === '') {
      Alert.alert('You need to have an issue title!', null, [{ text: 'OK' }]);
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
    const { repository } = this.props;
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
          <SectionList title="Issue Title">
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholder="Write a title for your issue here"
              blurOnSubmit
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

          <SectionList title="Issue Comment">
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

          <SectionList>
            <View style={styles.listItemContainer}>
              <ListItem
                title="Submit"
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
