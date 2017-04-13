import React, {Component, PropTypes} from 'react';
import {ScrollView, StyleSheet, View, ActionSheetIOS} from 'react-native';
import {Button, ListItem} from 'react-native-elements';

import ViewContainer from '../components/ViewContainer';
import SectionList from '../components/SectionList';
import AssigneeListItem from '../components/AssigneeListItem';
import LabelListItem from '../components/LabelListItem';

import colors from '../config/colors';

class IssueSettings extends Component {
  render() {
    const { navigation } = this.props;
    const issue = navigation.state.params.issue;

    return (
      <ViewContainer>
        <ScrollView>
          <SectionList
            showActionButton
            buttonTitle="New Label"
            style={{borderBottomWidth: 1, borderBottomColor: colors.grey}}
            noItems={issue.labels.length === 0}
            noItemsMessage="None yet"
            title="LABELS">
            {
              issue.labels.map((item, i) => (
                <LabelListItem label={item} key={i}/>
              ))
            }
          </SectionList>

          <SectionList
            showActionButton
            buttonTitle="Assign Yourself"
            noItems={issue.assignees.length === 0}
            noItemsMessage="None yet"
            title="ASSIGNEES">
            {
              issue.assignees.map((item, i) => (
                <AssigneeListItem user={item} key={i} navigation={navigation}/>
              ))
            }
          </SectionList>

          <SectionList
            title="Actions">
            <ListItem
              title="Close Issue"
              hideChevron
              underlayColor={colors.greyLight}
              titleStyle={styles.closeActionTitle}
              onPress={() => showConfirmCloseIssueActionSheet(issue)}
            />
          </SectionList>
        </ScrollView>
      </ViewContainer>
    );
  }
}

const showConfirmCloseIssueActionSheet = issue => {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      title: 'Are you sure you want to close this issue?',
      options: ['Yes', 'Cancel'],
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1,
    },
    buttonIndex => {

    }
  );
};

const styles = StyleSheet.create({
  closeActionTitle: {
    color: colors.red,
    fontFamily: 'AvenirNext-DemiBold',
  },
});

export default IssueSettings;
