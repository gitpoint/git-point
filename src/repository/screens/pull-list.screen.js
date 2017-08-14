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
import { ButtonGroup } from 'react-native-elements';
import {
  ViewContainer,
  IssueListItem,
  LoadingContainer,
  SearchBar,
} from 'components';

import { translate } from 'utils';
import { colors, fonts, normalize } from 'config';
import {
  searchOpenRepoPulls,
  searchClosedRepoPulls,
} from '../repository.action';

const mapStateToProps = state => ({
  language: state.auth.language,
  repository: state.repository.repository,
  searchedOpenPulls: state.repository.searchedOpenPulls,
  searchedClosedPulls: state.repository.searchedClosedPulls,
  isPendingSearchOpenPulls: state.repository.isPendingSearchOpenPulls,
  isPendingSearchClosedPulls: state.repository.isPendingSearchClosedPulls,
});

const mapDispatchToProps = dispatch => ({
  searchOpenRepoPullsByDispatch: (query, repo) =>
    dispatch(searchOpenRepoPulls(query, repo)),
  searchClosedRepoPullsByDispatch: (query, repo) =>
    dispatch(searchClosedRepoPulls(query, repo)),
});

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
  listContainer: {
    borderTopColor: colors.greyLight,
    borderTopWidth: 1,
    marginBottom: 105,
  },
});

class PullList extends Component {
  props: {
    language: string,
    repository: Object,
    searchedOpenPulls: Array,
    searchedClosedPulls: Array,
    isPendingSearchOpenPulls: boolean,
    isPendingSearchClosedPulls: boolean,
    searchOpenRepoPullsByDispatch: Function,
    searchClosedRepoPullsByDispatch: Function,
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

    this.switchQueryType = this.switchQueryType.bind(this);
    this.search = this.search.bind(this);
    this.getList = this.getList.bind(this);
  }

  getList = () => {
    const { searchedOpenPulls, searchedClosedPulls, navigation } = this.props;
    const { searchType, searchStart } = this.state;

    if (searchStart) {
      return searchType === 0 ? searchedOpenPulls : searchedClosedPulls;
    }

    return searchType === 0
      ? navigation.state.params.issues.filter(issue => issue.state === 'open')
      : navigation.state.params.issues.filter(
          issue => issue.state === 'closed'
        );
  };

  switchQueryType(selectedType) {
    if (this.state.searchType !== selectedType) {
      this.setState({
        searchType: selectedType,
      });

      this.search(this.state.query, selectedType);
    } else {
      this.pullList.scrollToOffset({
        x: 0,
        y: 0,
        animated: false,
      });
    }
  }

  search(query, selectedType = null) {
    const {
      searchOpenRepoPullsByDispatch,
      searchClosedRepoPullsByDispatch,
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
        searchOpenRepoPullsByDispatch(query, repository.full_name);
      } else {
        searchClosedRepoPullsByDispatch(query, repository.full_name);
      }
    }
  }

  keyExtractor = item => {
    return item.id;
  };

  renderItem = ({ item }) =>
    <IssueListItem
      type={this.props.navigation.state.params.type}
      issue={item}
      navigation={this.props.navigation}
      language={this.props.language}
    />;

  render() {
    const {
      language,
      searchedOpenPulls,
      searchedClosedPulls,
      isPendingSearchOpenPulls,
      isPendingSearchClosedPulls,
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
                  this.setState({ searchStart: false, query: '' })}
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
            buttons={[
              translate('repository.pullList.openButton', language),
              translate('repository.pullList.closedButton', language),
            ]}
            textStyle={styles.buttonGroupText}
            selectedTextStyle={styles.buttonGroupTextSelected}
            containerStyle={styles.buttonGroupContainer}
          />
        </View>

        {isPendingSearchOpenPulls &&
          searchType === 0 &&
          <LoadingContainer
            animating={isPendingSearchOpenPulls && searchType === 0}
            text={translate('repository.pullList.searchingMessage', language, {
              query,
            })}
            style={styles.marginSpacing}
          />}

        {isPendingSearchClosedPulls &&
          searchType === 1 &&
          <LoadingContainer
            animating={isPendingSearchClosedPulls && searchType === 1}
            text={translate('repository.pullList.searchingMessage', language, {
              query,
            })}
            style={styles.marginSpacing}
          />}

        {this.getList().length > 0 &&
          <FlatList
            ref={ref => {
              this.pullList = ref;
            }}
            removeClippedSubviews={false}
            data={this.getList()}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />}

        {searchStart &&
          !isPendingSearchOpenPulls &&
          searchedOpenPulls.length === 0 &&
          searchType === 0 &&
          <View style={styles.marginSpacing}>
            <Text style={styles.searchTitle}>
              {translate('repository.pullList.noOpenPulls', language)}
            </Text>
          </View>}

        {searchStart &&
          !isPendingSearchClosedPulls &&
          searchedClosedPulls.length === 0 &&
          searchType === 1 &&
          <View style={styles.marginSpacing}>
            <Text style={styles.searchTitle}>
              {translate('repository.pullList.noOpenPulls', language)}
            </Text>
          </View>}
      </ViewContainer>
    );
  }
}

export const PullListScreen = connect(mapStateToProps, mapDispatchToProps)(
  PullList
);
