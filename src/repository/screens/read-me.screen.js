import React, { Component } from "react";
import { WebView } from "react-native";

import { ViewContainer, LoadingContainer } from "components";

import { connect } from "react-redux";
import { getReadMe } from "../repository.action";

const mapStateToProps = state => ({
  readMe: state.repository.readMe,
  isPendingReadMe: state.repository.isPendingReadMe
});

const mapDispatchToProps = dispatch => ({
  getReadMe: (user, repoName) => dispatch(getReadMe(user, repoName))
});

class ReadMe extends Component {
  props: {
    getReadMe: Function,
    readMe: string,
    isPendingReadMe: boolean,
    navigation: Object
  };

  componentDidMount() {
    const repo = this.props.navigation.state.params.repository;
    this.props.getReadMe(repo.owner.login, repo.name);
  }

  render() {
    const { readMe, isPendingReadMe } = this.props;

    return (
      <ViewContainer barColor="dark">
        {isPendingReadMe &&
          <LoadingContainer animating={isPendingReadMe} center />}
        {!isPendingReadMe && <WebView source={{ html: readMe }} />}
      </ViewContainer>
    );
  }
}

export const ReadMeScreen = connect(mapStateToProps, mapDispatchToProps)(
  ReadMe
);
