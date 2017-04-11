import React, {Component, PropTypes} from 'react';
import { FlatList } from 'react-native';

import ViewContainer from '../components/ViewContainer';
import IssueListItem from '../components/IssueListItem';

class IssuesList extends Component {
  renderItem = ({item}) => (
    <IssueListItem
      type={this.props.navigation.state.params.type}
      issue={item}
      userHasPushPermission={this.props.navigation.state.params.userHasPushPermission}
      navigation={this.props.navigation} />
  )

  render() {
    const  {navigation} = this.props;

    return (
      <ViewContainer>
        <FlatList
          removeClippedSubviews={false}
          data={navigation.state.params.issues}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </ViewContainer>
    )
  }

  keyExtractor = (item) => {
    return item.id;
  }
}

IssuesList.propTypes = {
  userHasPushPermission: PropTypes.bool,
  navigation: PropTypes.object,
};

export default IssuesList;
