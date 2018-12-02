/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  LoadingCommonItem,
  SearchBar,
} from 'components';

import { t } from 'utils';
import { colors, fonts, normalize } from 'config';
import { RestClient } from 'api';

const SearchTypes = {
  OPEN: 0,
  CLOSED: 1,
};
const getFinalQuery = (searchType, query, repoFullName) =>
  `${query}+repo:${repoFullName}+type:issue+state:${
    searchType === SearchTypes.OPEN ? 'open' : 'closed'
  }&sort=created`;

const mapStateToProps = (state, ownProps) => {
  const {
    auth: { locale },
    entities: { gqlRepos, issues },
    pagination: { SEARCH_ISSUES },
  } = state;

  const { searchType, query, repository } = ownProps.navigation.state.params;
  const repoId = repository.nameWithOwner;

  const issuesPagination = SEARCH_ISSUES[
    getFinalQuery(searchType, query, repoId)
  ] || {
    ids: [],
  };

  return {
    locale,
    repository: gqlRepos[repoId],
    issuesPagination,
    issues: issuesPagination.ids.map(id => issues[id]),
  };
};

const mapDispatchToProps = {
  searchIssues: RestClient.search.issues,
};

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
              repository: state.params.repository,
            })
          }
        />
      ),
    };
  };

  props: {
    locale: string,
    repository: Object,
    issuesPagination: Object,
    issues: Array,
    searchIssues: Function,
    navigation: Object,
  };

  state: {
    searchStart: boolean,
    searchFocus: boolean,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchStart: false,
      searchFocus: false,
    };
  }

  componentDidMount() {
    const { locale, navigation } = this.props;
    const { query, searchType } = navigation.state.params;

    this.search(query, searchType);

    navigation.setParams({
      locale,
    });
  }

  switchQueryType = selectedType => {
    const { query, searchType } = this.props.navigation.state.params;

    if (searchType !== selectedType) {
      this.search(query, selectedType);
    } else {
      this.issueList.scrollToOffset({
        x: 0,
        y: 0,
        animated: false,
      });
    }
  };

  search = (query, selectedType, params) => {
    const { repository, navigation, searchIssues } = this.props;
    const q = getFinalQuery(selectedType, query, repository.nameWithOwner);

    navigation.setParams({
      query,
      searchType: selectedType,
    });
    this.setState({
      searchStart: true,
    });
    searchIssues(q, params);
  };

  keyExtractor = item => {
    return item.id;
  };

  renderItem = ({ item }) => (
    <IssueListItem
      type="issue"
      issue={item}
      navigation={this.props.navigation}
      locale={this.props.locale}
    />
  );

  renderFooter = () => {
    return this.props.issuesPagination.nextPageUrl ? (
      <LoadingCommonItem />
    ) : null;
  };

  render() {
    const {
      locale,
      issuesPagination: { isFetching },
      issues,
      navigation,
    } = this.props;
    const { query, searchType } = navigation.state.params;
    const { searchStart, searchFocus } = this.state;

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
                onCancelButtonPress={() => {
                  navigation.setParams({
                    query: '',
                  });
                  this.setState({ searchStart: false });
                }}
                onSearchButtonPress={text => {
                  this.search(text, searchType);
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

        {isFetching &&
          issues.length === 0 && (
            <LoadingContainer
              animating
              center
              text={
                query.length > 0
                  ? t('Searching for {query}', locale, {
                      query,
                    })
                  : ''
              }
              style={styles.marginSpacing}
            />
          )}

        {issues.length > 0 && (
          <FlatList
            ref={ref => {
              this.issueList = ref;
            }}
            removeClippedSubviews={false}
            data={issues}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            onEndReached={() =>
              this.search(query, searchType, { loadMore: true })
            }
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
          />
        )}

        {searchStart &&
          !isFetching &&
          issues.length === 0 && (
            <View style={styles.marginSpacing}>
              <Text style={styles.searchTitle}>
                {searchType === SearchTypes.OPEN
                  ? t('No open issues found!', locale)
                  : t('No closed issues found!', locale)}
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
