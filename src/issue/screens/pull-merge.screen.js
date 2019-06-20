/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, ScrollView, StyleSheet, TextInput, Alert } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';

import { ViewContainer, SectionList } from 'components';
import { t } from 'utils';
import { colors, fonts, normalize } from 'config';
import { mergePullRequest } from '../issue.action';

const mapStateToProps = state => ({
  locale: state.auth.locale,
  isPendingMerging: state.repository.isPendingMerging,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      mergePullRequest,
    },
    dispatch
  );

const styles = StyleSheet.create({
  listItemTitle: {
    color: colors.black,
    ...fonts.fontPrimary,
  },
  textInput: {
    fontSize: normalize(12),
    marginHorizontal: 15,
    flex: 1,
    color: colors.black,
    ...fonts.fontPrimary,
  },
  mergeActionTitle: {
    color: colors.green,
    ...fonts.fontPrimary,
  },
  mergeListItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },
  listItemContainer: {
    flex: 1,
  },
  iconContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

class PullMerge extends Component {
  props: {
    mergePullRequest: Function,
    locale: string,
    // isPendingMerging: boolean,
    navigation: Object,
  };

  state: {
    mergeMethod: number,
    commitTitle: string,
    commitMessage: string,
  };

  constructor(props) {
    super(props);

    this.state = {
      mergeMethod: 0,
      commitTitle: '',
      commitTitleHeight: 0,
      commitMessage: '',
      commitMessageHeight: 0,
    };
  }

  mergeMethodMessages = () => {
    const { locale } = this.props;

    return [t('Create a merge commit', locale), t('Squash and merge', locale)];
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  handlePress = index => {
    if (index !== this.mergeMethodMessages().length) {
      this.setState({
        mergeMethod: index,
      });
    }
  };

  mergePullRequest = () => {
    const { mergePullRequest, locale, navigation } = this.props;
    const { issue, repository } = navigation.state.params;
    const { mergeMethod, commitTitle, commitMessage } = this.state;
    const mergeMethodTypes = [t('merge', locale), t('squash', locale)];

    if (commitTitle === '') {
      Alert.alert(t('You need to have a commit title!', locale), null, [
        { text: t('OK', locale) },
      ]);
    } else {
      mergePullRequest(
        repository.full_name,
        issue.number,
        commitTitle,
        commitMessage,
        mergeMethodTypes[mergeMethod]
      ).then(() => {
        navigation.goBack();
      });
    }
  };

  render() {
    const { locale } = this.props;
    const { mergeMethod, commitTitle, commitMessage } = this.state;

    return (
      <ViewContainer>
        <ScrollView>
          <SectionList title={t('Commit Title', locale)}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder={t('Write a title for your commit here', locale)}
              blurOnSubmit
              multiline
              onContentSizeChange={event =>
                this.setState({
                  commitTitleHeight: event.nativeEvent.contentSize.height,
                })
              }
              onChangeText={text => this.setState({ commitTitle: text })}
              placeholderTextColor={colors.grey}
              style={[
                styles.textInput,
                { height: Math.max(60, this.state.commitTitleHeight) },
              ]}
              value={commitTitle}
            />
          </SectionList>

          <SectionList title={t('Commit Message', locale)}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholder={t('Write a message for your commit here', locale)}
              blurOnSubmit
              multiline
              onChangeText={text => this.setState({ commitMessage: text })}
              onContentSizeChange={event =>
                this.setState({
                  commitMessageHeight: event.nativeEvent.contentSize.height,
                })
              }
              placeholderTextColor={colors.grey}
              style={[
                styles.textInput,
                { height: Math.max(60, this.state.commitMessageHeight) },
              ]}
              value={commitMessage}
            />
          </SectionList>

          <SectionList title={t('Merge Type', locale)}>
            <View style={styles.mergeListItemContainer}>
              <View style={styles.listItemContainer}>
                <ListItem
                  title={this.mergeMethodMessages()[mergeMethod]}
                  hideChevron
                  underlayColor={colors.greyLight}
                  titleStyle={styles.mergeActionTitle}
                  onPress={() => this.mergePullRequest()}
                />
              </View>

              <View style={styles.iconContainer}>
                <Icon
                  color={colors.grey}
                  size={24}
                  name="pencil"
                  type="octicon"
                  onPress={this.showActionSheet}
                />
              </View>
            </View>
          </SectionList>
        </ScrollView>

        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={t('Change Merge Type', locale)}
          options={[...this.mergeMethodMessages(), t('Cancel', locale)]}
          cancelButtonIndex={this.mergeMethodMessages().length}
          onPress={this.handlePress}
        />
      </ViewContainer>
    );
  }
}

export const PullMergeScreen = connect(mapStateToProps, mapDispatchToProps)(
  PullMerge
);
