import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import { MarkdownWebView, ViewContainer, LoadingContainer } from 'components';
import { normalize } from 'config';
import { getReadMe } from '../repository.action';

const mapStateToProps = state => ({
  readMe: state.repository.readMe,
  isPendingReadMe: state.repository.isPendingReadMe,
});

const mapDispatchToProps = dispatch => ({
  getReadMeByDispatch: (user, repoName) => dispatch(getReadMe(user, repoName)),
});

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noReadMeTitle: {
    fontSize: normalize(18),
    textAlign: 'center',
  },
});

class ReadMe extends Component {
  props: {
    getReadMeByDispatch: Function,
    readMe: string,
    isPendingReadMe: boolean,
    navigation: Object,
  };

  componentDidMount() {
    const repo = this.props.navigation.state.params.repository;

    this.props.getReadMeByDispatch(repo.owner.login, repo.name);
  }

  isJsonString = str => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }

    return true;
  };

  render() {
    const { readMe, isPendingReadMe } = this.props;
    let noReadMe = null;

    if (this.isJsonString(readMe)) {
      noReadMe = JSON.parse(readMe).message;
    }

    return (
      <ViewContainer>
        {isPendingReadMe &&
          <LoadingContainer animating={isPendingReadMe} center />}
        {!isPendingReadMe &&
          !noReadMe &&
          <MarkdownWebView
            html={readMe}
            baseUrl={`${this.props.navigation.state.params.repository
              .html_url}/raw/master/`}
          />}
        {!isPendingReadMe &&
          noReadMe &&
          <View style={styles.textContainer}>
            <Text style={styles.noReadMeTitle}>No README.md found</Text>
          </View>}
      </ViewContainer>
    );
  }
}

export const ReadMeScreen = connect(mapStateToProps, mapDispatchToProps)(
  ReadMe
);
