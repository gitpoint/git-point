
import React, {Component, PropTypes} from 'react';
import {ScrollView, StyleSheet, ActionSheetIOS} from 'react-native';
import {ListItem} from 'react-native-elements';

import ViewContainer from '../components/ViewContainer';
import SectionList from '../components/SectionList';
import AssigneeListItem from '../components/AssigneeListItem';
import LabelListItem from '../components/LabelListItem';

import colors from '../config/colors';

import {connect} from 'react-redux';
import {editIssue} from '../actions/issue';

const mapStateToProps = state => ({
  authUser: state.authUser.user,
  repository: state.repository.repository,
  issue: state.issue.issue,
  isEditingIssue: state.issue.isEditingIssue,
});

const mapDispatchToProps = dispatch => ({
  editIssue: (owner, repoName, issueNum, editParams) =>
    dispatch(editIssue(owner, repoName, issueNum, editParams)),
});

class IssueSettings extends Component {
  render() {
    const {issue, navigation} = this.props;

    return (
      <ViewContainer>
        <ScrollView>
          <SectionList
            showButton
            buttonTitle="New Label"
            style={{borderBottomWidth: 1, borderBottomColor: colors.grey}}
            noItems={issue.labels.length === 0}
            noItemsMessage="None yet"
            title="LABELS"
          >
            {issue.labels.map((item, i) => (
              <LabelListItem label={item} key={i} />
            ))}
          </SectionList>

          <SectionList
            showButton
            buttonTitle="Assign Yourself"
            noItems={issue.assignees.length === 0}
            noItemsMessage="None yet"
            title="ASSIGNEES"
          >
            {issue.assignees.map((item, i) => (
              <AssigneeListItem user={item} key={i} navigation={navigation} />
            ))}
          </SectionList>

          <SectionList title="Actions">
            <ListItem
              title="Lock Issue"
              hideChevron
              underlayColor={colors.greyLight}
              titleStyle={styles.listItemTitle}
              onPress={() => this.showLockIssueActionSheet()}
            />
            <ListItem
              title={issue.state === 'open' ? "Close Issue" : "Reopen Issue"}
              hideChevron
              underlayColor={colors.greyLight}
              titleStyle={issue.state === 'open' ? styles.closeActionTitle : styles.openActionTitle}
              onPress={() => this.showChangeIssueStateActionSheet(issue.state === 'open' ? 'close' : 'reopen')}
            />
          </SectionList>
        </ScrollView>
      </ViewContainer>
    );
  }

  showChangeIssueStateActionSheet = (stateChange) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: `Are you sure you want to ${stateChange} this issue?`,
        options: ['Yes', 'Cancel'],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      buttonIndex => {
        const {issue, repository} = this.props;
        const repoName = repository.name;
        const owner = repository.owner.login;

        const newState = stateChange === 'open' ? 'open' : 'closed';

        if (buttonIndex === 0) {
          this.props.editIssue(owner, repoName, issue.number, {state: newState});
        }
      }
    );
  };

  showLockIssueActionSheet = issue => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Are you sure you want to lock this issue?',
        options: ['Yes', 'Cancel'],
        cancelButtonIndex: 1,
      },
      buttonIndex => {
        
      }
    );
  };
}

const styles = StyleSheet.create({
  listItemTitle: {
    color: colors.black,
    fontFamily: 'AvenirNext-Medium',
  },
  closeActionTitle: {
    color: colors.red,
    fontFamily: 'AvenirNext-Medium',
  },
  openActionTitle: {
    color: colors.green,
    fontFamily: 'AvenirNext-Medium',
  },
});

IssueSettings.propTypes = {
  editIssue: PropTypes.func,
  authUser: PropTypes.object,
  repository: PropTypes.object,
  issue: PropTypes.object,
  isEditingIssue: PropTypes.bool,
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueSettings);
