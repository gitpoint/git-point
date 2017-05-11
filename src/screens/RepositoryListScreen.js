import React, { Component, PropTypes } from "react";
import { FlatList, View } from "react-native";
import SearchBar from "react-native-search-bar";

import ViewContainer from "../components/ViewContainer";
import RepositoryListItem from "../components/RepositoryListItem";
import LoadingRepositoryListItem from "../components/LoadingRepositoryListItem";

import { connect } from "react-redux";
import { getRepositories } from "../actions/user";

const mapStateToProps = state => ({
  user: state.user.user,
  repositories: state.user.repositories,
  isPendingRepositories: state.user.isPendingRepositories
});

const mapDispatchToProps = dispatch => ({
  getRepositories: (user, type) => dispatch(getRepositories(user, type))
});

class RepositoryList extends Component {
  componentDidMount() {
    const user = this.props.navigation.state.params.user;
    this.props.getRepositories(user);
  }

  render() {
    const { repositories, isPendingRepositories, navigation } = this.props;
    const repoCount = navigation.state.params.repoCount;

    return (
      <ViewContainer>

        {isPendingRepositories &&
          [...Array(repoCount)].map((item, i) => (
            <LoadingRepositoryListItem key={i} />
          ))}

        {!isPendingRepositories &&
          <View>

            <FlatList
              data={repositories}
              keyExtractor={this.keyExtractor}
              renderItem={({ item }) => (
                <RepositoryListItem repository={item} navigation={navigation} />
              )}
            />
          </View>}
      </ViewContainer>
    );
  }

  keyExtractor = item => {
    return item.id;
  };
}

RepositoryList.propTypes = {
  getRepositories: PropTypes.func,
  repositories: PropTypes.array,
  isPendingRepositories: PropTypes.bool,
  navigation: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryList);
