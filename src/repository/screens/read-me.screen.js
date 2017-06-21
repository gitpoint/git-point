import React, { Component } from 'react';
import { WebView, StyleSheet, View } from 'react-native';

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

  render() {
    const { readMe, isPendingReadMe } = this.props;

    return (
      <ViewContainer>
        {isPendingReadMe &&
          <LoadingContainer animating={isPendingReadMe} center />}
        {!isPendingReadMe && readMe && <WebView source={{ html: readMe }} />}

        {!isPendingReadMe &&
          !readMe &&
          <View style={styles.marginSpacing}>
            <Text style={styles.noReadMeTitle}>
              No README.md file available
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
  marginSpacing: {
    marginTop: 40
  },
  noReadMeTitle: {
    fontSize: normalize(18),
    textAlign: 'center'
  }
});
