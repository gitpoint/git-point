/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import styled from 'styled-components';

import { ViewContainer, SectionList, LoadingModal } from 'components';
import { t } from 'utils';
import { colors, fonts, normalize } from 'config';
import { submitNewIssue } from '../issue.action';

const StyledListItem = styled(ListItem).attrs({
  titleStyle: {
    color: colors.primaryDark,
    ...fonts.fontPrimarySemiBold,
    fontSize: normalize(10),
  },
})``;

const StyledTextInput = styled.TextInput`
  flex-grow: 1;
  height: ${props => Math.max(60, props.valueHeight)}
  margin: 0 15px;
  ${fonts.fontPrimary};
  font-size: ${normalize(12)};
  color: ${colors.black};
`;

const SubmitListItem = styled(ListItem).attrs({
  titleStyle: {
    color: colors.green,
    ...fonts.fontPrimary,
  },
})``;

const SubmitView = styled.View`
  flex-grow: 1;
`;

const mapStateToProps = state => ({
  locale: state.auth.locale,
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
    navigation: Object,
    isPendingSubmitting: boolean,
  };

  state: {
    issueTitle: string,
    issueComment: string,
  };

  constructor(props) {
    super(props);

    this.state = {
      issueTitle: '',
      issueTitleHeight: 0,
      issueComment: '',
      issueCommentHeight: 0,
    };
  }

  submitNewIssue = () => {
    const { submitNewIssue, locale, navigation } = this.props;
    const { repository } = navigation.state.params;
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
    const { locale, navigation, isPendingSubmitting } = this.props;
    const { repository } = navigation.state.params;
    const {
      issueTitle,
      issueTitleHeight,
      issueComment,
      issueCommentHeight,
    } = this.state;

    return (
      <ViewContainer>
        {isPendingSubmitting && <LoadingModal />}
        <ScrollView>
          {repository.full_name && (
            <StyledListItem
              title={repository.full_name}
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
            <StyledTextInput
              underlineColorAndroid="transparent"
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
              value={issueTitle}
              valueHeight={issueTitleHeight}
            />
          </SectionList>

          <SectionList title={t('Issue Comment', locale)}>
            <StyledTextInput
              underlineColorAndroid="transparent"
              placeholder={t('Write a comment for your issue here', locale)}
              multiline
              onChangeText={text => this.setState({ issueComment: text })}
              onContentSizeChange={event =>
                this.setState({
                  issueCommentHeight: event.nativeEvent.contentSize.height,
                })
              }
              placeholderTextColor={colors.grey}
              value={issueComment}
              valueHeight={issueCommentHeight}
            />
          </SectionList>

          <SectionList>
            <SubmitView>
              <SubmitListItem
                title={t('Submit', locale)}
                hideChevron
                underlayColor={colors.greyLight}
                onPress={() => this.submitNewIssue()}
              />
            </SubmitView>
          </SectionList>
        </ScrollView>
      </ViewContainer>
    );
  }
}

export const NewIssueScreen = connect(mapStateToProps, mapDispatchToProps)(
  NewIssue
);
