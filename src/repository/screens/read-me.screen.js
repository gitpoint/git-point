import React, { Component } from 'react';
import { WebView, StyleSheet, View, Text } from 'react-native';

import { ViewContainer, LoadingContainer } from 'components';

import { normalize } from 'config';

import { connect } from 'react-redux';
import { getReadMe } from '../repository.action';

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

  isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

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
        {!isPendingReadMe && !noReadMe && <WebView source={{ html: readMe }} />}

        {!isPendingReadMe &&
          noReadMe &&
          <View style={styles.textContainer}>
            <Text style={styles.noReadMeTitle}>
              No README.md found
            </Text>
          </View>}
      </ViewContainer>
    );
  }
}

export const ReadMeScreen = connect(mapStateToProps, mapDispatchToProps)(
  ReadMe
);

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noReadMeTitle: {
    fontSize: normalize(18),
    textAlign: 'center'
  }
});
