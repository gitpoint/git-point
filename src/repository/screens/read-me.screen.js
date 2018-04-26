import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';

import { MarkdownWebView, ViewContainer, LoadingContainer } from 'components';
import { normalize, colors } from 'config';
import { t, openURLInView } from 'utils';
import { getReadMe } from '../repository.action';

const mapStateToProps = state => ({
  readMe: state.repository.readMe,
  isPendingReadMe: state.repository.isPendingReadMe,
  locale: state.auth.locale,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getReadMe,
    },
    dispatch
  );

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
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;

    return {
      headerRight: (
        <Icon
          name="ellipsis-h"
          color={colors.primaryDark}
          type="font-awesome"
          containerStyle={{ marginRight: 10 }}
          underlayColor={colors.transparent}
          onPress={state.params.showActionSheet}
        />
      ),
    };
  };

  props: {
    getReadMe: Function,
    readMe: string,
    isPendingReadMe: boolean,
    navigation: Object,
    locale: string,
  };

  componentDidMount() {
    const repo = this.props.navigation.state.params.repository;

    this.props.getReadMe(repo.owner.login, repo.name);
    this.props.navigation.setParams({ showActionSheet: this.showActionSheet });
  }

  showActionSheet = () => this.ActionSheet.show();

  isJsonString = str => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }

    return true;
  };

  handleActionSheetPress = index => {
    const repo = this.props.navigation.state.params.repository;

    if (index === 0) {
      openURLInView(repo.html_url);
    }
  };

  render() {
    const { readMe, isPendingReadMe, locale } = this.props;
    let noReadMe = null;

    if (this.isJsonString(readMe)) {
      noReadMe = JSON.parse(readMe).message;
    }
    const readmeActions = [t('Open in Browser', locale)];

    return (
      <ViewContainer>
        {isPendingReadMe && (
          <LoadingContainer animating={isPendingReadMe} center />
        )}
        {!isPendingReadMe &&
          !noReadMe && (
            <MarkdownWebView
              html={readMe}
              baseUrl={`${
                this.props.navigation.state.params.repository.html_url
              }/raw/master/`}
            />
          )}
        {!isPendingReadMe &&
          noReadMe && (
            <View style={styles.textContainer}>
              <Text style={styles.noReadMeTitle}>
                {t('No README.md found', locale)}
              </Text>
            </View>
          )}

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={t('README Actions', locale)}
          options={[...readmeActions, t('Cancel', locale)]}
          cancelButtonIndex={1}
          onPress={this.handleActionSheetPress}
        />
      </ViewContainer>
    );
  }
}

export const ReadMeScreen = connect(mapStateToProps, mapDispatchToProps)(
  ReadMe
);
