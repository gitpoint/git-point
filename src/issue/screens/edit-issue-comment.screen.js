import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { RestClient } from 'api';

import { ViewContainer, SectionList, LoadingModal } from 'components';
import { translate } from 'utils';
import { colors, fonts, normalize } from 'config';

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: 10,
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
  isEditingComment: state.issue.isEditingComment,
});

const mapDispatchToProps = {
  editIssue: RestClient.issues.edit,
  editIssueComment: RestClient.issues.editComment,
};

class EditIssueComment extends Component {
  props: {
    editIssue: Function,
    editIssueComment: Function,
    locale: string,
    navigation: Object,
    isEditingComment: boolean,
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

  editComment = () => {
    const { navigation } = this.props;
    const { repoId, issueNumber, comment } = this.props.navigation.state.params;

    const text = this.state.issueComment;

    const action = comment.repository_url
      ? this.props.editIssue(repoId, issueNumber, { body: text })
      : this.props.editIssueComment(repoId, issueNumber, comment.id, text);

    action.then(() => navigation.goBack());
  };

  render() {
    const { locale, isEditingComment } = this.props;
    const { issueComment } = this.state;

    return (
      <ViewContainer>
        {isEditingComment && <LoadingModal />}
        <ScrollView>
          <SectionList title={translate('issue.newIssue.issueComment', locale)}>
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholder={translate('issue.newIssue.writeAComment', locale)}
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
                {
                  height: this.state.issueCommentHeight,
                  maxHeight: Dimensions.get('window').height / 2,
                },
              ]}
              value={issueComment}
            />
          </SectionList>

          <SectionList>
            <View style={styles.listItemContainer}>
              <ListItem
                title={translate('common.submit', locale)}
                hideChevron
                underlayColor={colors.greyLight}
                titleStyle={styles.submitTitle}
                onPress={this.editComment}
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
