/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Platform,
} from 'react-native';
import { ButtonGroup, Icon } from 'react-native-elements';
import {
  ViewContainer,
  IssueListItem,
  LoadingContainer,
  SearchBar,
} from 'components';

import { t } from 'utils';
import { colors, fonts, normalize } from 'config';
import {
  searchOpenRepoIssues,
  searchClosedRepoIssues,
} from '../repository.action';

const mapStateToProps = state => ({
  locale: state.auth.locale,
  repository: state.repository.repository,
  searchedOpenIssues: state.repository.searchedOpenIssues,
  searchedClosedIssues: state.repository.searchedClosedIssues,
  isPendingSearchOpenIssues: state.repository.isPendingSearchOpenIssues,
  isPendingSearchClosedIssues: state.repository.isPendingSearchClosedIssues,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchOpenRepoIssues,
      searchClosedRepoIssues,
    },
    dispatch
  );

const styles = StyleSheet.create({
  header: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  searchBarWrapper: {
    flexDirection: 'row',
    marginTop: 5,
  },
  searchContainer: {
    width: Dimensions.get('window').width,
    backgroundColor: colors.white,
    flex: 1,
  },
  list: {
    marginTop: 0,
  },
  buttonGroupContainer: {
    height: 30,
    ...Platform.select({
      ios: {
        marginTop: 5,
        marginBottom: 10,
      },
      android: {
        marginTop: 5,
        marginBottom: 12,
      },
    }),
  },
  buttonGroupText: {
    ...fonts.fontPrimaryBold,
  },
  buttonGroupTextSelected: {
    color: colors.black,
  },
  loadingIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginSpacing: {
    marginTop: 40,
  },
  searchTitle: {
    fontSize: normalize(18),
    textAlign: 'center',
  },
  searchCancelButton: {
    color: colors.black,
  },
});

class IssueList extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, navigate } = navigation;

    return {
      headerRight: (
        <Icon
          name="plus"
          color={colors.primaryDark}
          type="octicon"
          containerStyle={{ marginRight: 5 }}
          underlayColor={colors.transparent}
          onPress={() =>
            navigate('NewIssue', {
              title: t('New Issue', state.params.locale),
            })
          }
        />
      ),
    };
  };

  props: {
    locale: string,
    repository: Object,
    searchedOpenIssues: Array,
    searchedClosedIssues: Array,
    isPendingSearchOpenIssues: boolean,
    isPendingSearchClosedIssues: boolean,
    searchOpenRepoIssues: Function,
    searchClosedRepoIssues: Function,
    navigation: Object,
  };

  state: {
    query: string,
    searchType: number,
    searchStart: boolean,
    searchFocus: boolean,
  };

  constructor() {
    super();

    this.state = {
      query: '',
      searchType: 0,
      searchStart: false,
      searchFocus: false,
    };
  }

  componentDidMount() {
    const { locale, navigation } = this.props;

    navigation.setParams({
      locale,
    });
  }

  getList = () => {
    const { searchedOpenIssues, searchedClosedIssues, navigation } = this.props;
    const { searchType, searchStart } = this.state;

    if (searchStart) {
      return searchType === 0 ? searchedOpenIssues : searchedClosedIssues;
    }

    return searchType === 0
      ? navigation.state.params.issues.filter(issue => issue.state === 'open')
      : navigation.state.params.issues.filter(
          issue => issue.state === 'closed'
        );
  };

  switchQueryType = selectedType => {
    if (this.state.searchType !== selectedType) {
      this.setState({
        searchType: selectedType,
      });

      this.search(this.state.query, selectedType);
    } else {
      this.issueList.scrollToOffset({
        x: 0,
        y: 0,
        animated: false,
      });
    }
  };

  search = (query, selectedType = null) => {
    const {
      searchOpenRepoIssues,
      searchClosedRepoIssues,
      repository,
    } = this.props;

    const selectedSearchType =
      selectedType !== null ? selectedType : this.state.searchType;

    if (query !== '') {
      this.setState({
        searchStart: true,
        query,
      });

      if (selectedSearchType === 0) {
        searchOpenRepoIssues(query, repository.full_name);
      } else {
        searchClosedRepoIssues(query, repository.full_name);
      }
    }
  };

  keyExtractor = item => {
    return item.id;
  };

  renderItem = ({ item }) => (
    <IssueListItem
      type={this.props.navigation.state.params.type}
      issue={item}
      navigation={this.props.navigation}
      locale={this.props.locale}
    />
  );

  render() {
    const {
      locale,
      searchedOpenIssues,
      searchedClosedIssues,
      isPendingSearchOpenIssues,
      isPendingSearchClosedIssues,
    } = this.props;
    const { query, searchType, searchStart, searchFocus } = this.state;

    return (
      <ViewContainer>
        <View style={styles.header}>
          <View style={styles.searchBarWrapper}>
            <View style={styles.searchContainer}>
              <SearchBar
                textColor={colors.primaryDark}
                textFieldBackgroundColor={colors.greyLight}
                showsCancelButton={searchFocus}
                onFocus={() => this.setState({ searchFocus: true })}
                onCancelButtonPress={() =>
                  this.setState({ searchStart: false, query: '' })
                }
                onSearchButtonPress={text => {
                  this.search(text);
                }}
                hideBackground
              />
            </View>
          </View>

          <ButtonGroup
            onPress={this.switchQueryType}
            selectedIndex={searchType}
            buttons={[t('Open', locale), t('Closed', locale)]}
            textStyle={styles.buttonGroupText}
            selectedTextStyle={styles.buttonGroupTextSelected}
            containerStyle={styles.buttonGroupContainer}
          />
        </View>

        {isPendingSearchOpenIssues &&
          searchType === 0 && (
            <LoadingContainer
              animating={isPendingSearchOpenIssues && searchType === 0}
              text={t('Searching for {query}', locale, {
                query,
              })}
              style={styles.marginSpacing}
            />
          )}

        {isPendingSearchClosedIssues &&
          searchType === 1 && (
            <LoadingContainer
              animating={isPendingSearchClosedIssues && searchType === 1}
              text={t('Searching for {query}', locale, {
                query,
              })}
              style={styles.marginSpacing}
            />
          )}

        {this.getList().length > 0 && (
          <FlatList
            ref={ref => {
              this.issueList = ref;
            }}
            removeClippedSubviews={false}
            data={this.getList()}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        )}

        {searchStart &&
          !isPendingSearchOpenIssues &&
          searchedOpenIssues.length === 0 &&
          searchType === 0 && (
            <View style={styles.marginSpacing}>
              <Text style={styles.searchTitle}>
                {t('No open issues found!', locale)}
              </Text>
            </View>
          )}

        {searchStart &&
          !isPendingSearchClosedIssues &&
          searchedClosedIssues.length === 0 &&
          searchType === 1 && (
            <View style={styles.marginSpacing}>
              <Text style={styles.searchTitle}>
                {t('No closed issues found!', locale)}
              </Text>
            </View>
          )}
      </ViewContainer>
    );
  }
}

export const IssueListScreen = connect(mapStateToProps, mapDispatchToProps)(
  IssueList
);
