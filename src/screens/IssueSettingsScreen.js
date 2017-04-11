import React, {Component, PropTypes} from 'react';
import {ScrollView} from 'react-native';
import {Button} from 'react-native-elements';

import ViewContainer from '../components/ViewContainer';
import SectionList from '../components/SectionList';
import AssigneeListItem from '../components/AssigneeListItem';

import colors from '../config/colors';

class IssueSettings extends Component {
  render() {
    const { navigation } = this.props;
    const issue = this.props.navigation.state.params.issue;

    return (
      <ViewContainer>
        <ScrollView>
          {issue.assignees.length > 0 &&
            <SectionList
              noOuterBorders
              title="ASSIGNEES">
              {
                issue.assignees.map((item, i) => (
                  <AssigneeListItem user={item} key={i} navigation={navigation}/>
                ))
              }
            </SectionList>
          }

          {issue.labels.length > 0 &&
            <SectionList
              noOuterBorders
              title="LABELS">

            </SectionList>
          }

          <Button
            title="Close Issue"
            fontFamily="AvenirNext-DemiBold"
            fontSize={16}
            color={colors.white}
            backgroundColor={colors.red}
          />
        </ScrollView>
      </ViewContainer>
    );
  }
}

export default IssueSettings;
