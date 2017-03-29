import React, {Component, PropTypes} from 'react';
import {FlatList} from 'react-native';

import ViewContainer from '../components/ViewContainer';
import RepositoryListItem from '../components/RepositoryListItem';
import UserListItem from '../components/UserListItem';
import LoadingUserListItem from '../components/LoadingUserListItem';
import LoadingRepositoryListItem from '../components/LoadingRepositoryListItem';

import {connect} from 'react-redux';
import {getUserInfoList} from '../actions/userInfoList';

const mapStateToProps = state => ({
  user: state.userInfoList.user,
  list: state.userInfoList.list,
  isPendingList: state.userInfoList.isPendingList,
});

const mapDispatchToProps = dispatch => ({
  getUserInfoList: (user, type) => dispatch(getUserInfoList(user, type)),
});

class ListRender extends Component {
  componentDidMount() {
    const user = this.props.navigation.state.params.user;

    this.props.getUserInfoList(user, this.getType());
  }

  getType() {
    switch (this.props.navigation.state.params.listType) {
      case 'Repositories':
        return 'repos';
      case 'Starred':
        return 'starred';
      case 'Followers':
        return 'followers';
      case 'Following':
        return 'following';
    }
  }

  renderItem = ({item}) => {
    const {navigation} = this.props;
    const listType = navigation.state.params.listType;

    if (listType === 'Repositories' || listType === 'Starred') {
      return <RepositoryListItem repository={item} navigation={navigation} />;
    } else {
      return <UserListItem user={item} navigation={navigation} />;
    }
  };

  render() {
    const {list, isPendingList, navigation} = this.props;
    const showLoadingCount = navigation.state.params.showLoadingCount;
    const listType = navigation.state.params.listType;

    return (
      <ViewContainer barColor="dark">

        {isPendingList &&
          (listType === 'Followers' || listType === 'Following') &&
          [...Array(showLoadingCount)].map((item, i) => (
            <LoadingUserListItem key={i} />
          ))}

        {isPendingList &&
          (listType !== 'Followers' || listType !== 'Following') &&
          [...Array(showLoadingCount)].map((item, i) => (
            <LoadingRepositoryListItem key={i} />
          ))}

        {!isPendingList &&
          <FlatList
            data={list}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />}
      </ViewContainer>
    );
  }

  keyExtractor = item => {
    return item.id;
  };
}

ListRender.propTypes = {
  getUserInfoList: PropTypes.func,
  user: PropTypes.object,
  list: PropTypes.array,
  isPendingList: PropTypes.bool,
  navigation: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListRender);
