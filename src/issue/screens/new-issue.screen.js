/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, StyleSheet, TextInput, View, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';

import { ViewContainer, SectionList, LoadingModal } from 'components';
import { t } from 'utils';
import { colors, fonts, normalize } from 'config';
import { submitNewIssue } from '../issue.action';

const styles = StyleSheet.create({
  textInput: {
    fontSize: normalize(12),
    marginHorizontal: 15,
    flex: 1,
    color: colors.black,
    ...fonts.fontPrimary,
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
  locale: state.auth.locale,
  repository: state.repository.repository,
  isPendingSubmitting: state.issue.isPendingSubmitting,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitNewIssue,
    },
    dispatch
  );

class NewIssue extends Component {
  props: {
    submitNewIssue: Function,
    locale: string,
    repository: Object,
    navigation: Object,
    isPendingSubmitting: boolean,
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
    const { submitNewIssue, repository, locale, navigation } = this.props;
    const { issueTitle, issueComment } = this.state;
    const repoName = repository.name;
    const owner = repository.owner.login;

    if (issueTitle === '') {
      Alert.alert(t('You need to have an issue title!', locale), null, [
        { text: t('OK', locale) },
      ]);
    } else {
      submitNewIssue(owner, repoName, issueTitle, issueComment).then(issue => {
        navigation.navigate('Issue', {
          issue,
          headerLeft: null,
          gesturesEnabled: false,
        });
      });
    }
  };

  render() {
    const { locale, repository, isPendingSubmitting } = this.props;
    const { issueTitle, issueComment } = this.state;

    return (
      <ViewContainer>
        {isPendingSubmitting && <LoadingModal />}
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
          <SectionList title={t('Issue Title', locale)}>
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholder={t('Write a title for your issue here', locale)}
              blurOnSubmit
              multiline
              onContentSizeChange={event =>
                this.setState({
                  issueTitleHeight: event.nativeEvent.contentSize.height,
                })
              }
              onChangeText={text => this.setState({ issueTitle: text })}
              placeholderTextColor={colors.grey}
              style={[
                styles.textInput,
                { height: Math.max(60, this.state.issueTitleHeight) },
              ]}
              value={issueTitle}
            />
          </SectionList>

          <SectionList title={t('Issue Comment', locale)}>
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholder={t('Write a comment for your issue here', locale)}
              multiline
              onChangeText={text => this.setState({ issueComment: text })}
              onContentSizeChange={event =>
                this.setState({
                  issueCommentHeight: event.nativeEvent.contentSize.height,
                })
              }
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
                title={t('Submit', locale)}
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
