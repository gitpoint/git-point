import React, {Component, PropTypes} from 'react';
import { FlatList, View, StyleSheet, Dimensions, Text } from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import SearchBar from 'react-native-search-bar';

import ViewContainer from '../components/ViewContainer';
import IssueListItem from '../components/IssueListItem';
import LoadingContainer from '../components/LoadingContainer';

import colors from '../config/colors';

import {connect} from 'react-redux';
import {searchRepoIssues, searchRepoPulls} from '../actions/search';

const mapStateToProps = state => ({
  repository: state.repository.repository,
  issues: state.search.issues,
  pullRequests: state.search.pullRequests,
  isPendingSearchIssues: state.search.isPendingSearchIssues,
  isPendingSearchpullRequests: state.search.isPendingSearchpullRequests,
});

const mapDispatchToProps = dispatch => ({
  searchRepoIssues: (query, repo) => dispatch(searchRepoIssues(query, repo)),
  searchRepoPulls: (query, repo) => dispatch(searchRepoPulls(query, repo)),
});

class IssuesList extends Component {
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
  }

  switchQueryType(selectedType) {
    if (this.state.searchType !== selectedType) {
      this.setState({
        searchType: selectedType,
      });

      this.search(this.state.query, selectedType);
    }
  }

  search(query, selectedType = null) {
    const {searchRepoIssues, searchRepoPulls, repository} = this.props;

    const selectedSearchType = selectedType !== null
      ? selectedType
      : this.state.searchType;

    if (query !== '') {
      this.setState({
        query: query,
        searchStart: true,
      });

      selectedSearchType === 0 ? searchRepoIssues(query, repository.full_name) : searchRepoPulls(query, repository.full_name);
    }
  }

  renderItem = ({item}) => (
    <IssueListItem
      type={this.props.navigation.state.params.type}
      issue={item}
      userHasPushPermission={this.props.navigation.state.params.userHasPushPermission}
      navigation={this.props.navigation} />
  )

  render() {
    const {issues, pullRequests, isPendingSearchIssues, isPendingSearchpullRequests, navigation} = this.props;
    const {query, searchType, searchStart} = this.state;

    return (
      <ViewContainer>
        <View style={styles.header}>
          <View style={styles.searchBarWrapper}>
            <View style={styles.searchContainer}>
              <SearchBar
                ref="searchBar"
                hideBackground={true}
                textColor={colors.primaryDark}
                textFieldBackgroundColor={colors.greyLight}
                showsCancelButton={this.state.searchFocus}
                onFocus={() => this.setState({searchFocus: true})}
                onCancelButtonPress={() => {
                  this.setState({ searchStart: false });
                  this.refs.searchBar.unFocus();
                }}
                onSearchButtonPress={(query) => {
                  this.search(query);
                  this.refs.searchBar.unFocus();
                }}
              />
            </View>
          </View>

          <ButtonGroup
            onPress={this.switchQueryType}
            selectedIndex={searchType}
            buttons={['Open', 'Closed']}
            textStyle={styles.buttonGroupText}
            selectedTextStyle={styles.buttonGroupTextSelected}
            containerStyle={styles.buttonGroupContainer}
          />
        </View>

        {isPendingSearchIssues &&
          searchType === 0 &&
          <LoadingContainer
            animating={isPendingSearchIssues && searchType === 0}
            text={`Searching for ${query}`}
            style={styles.marginSpacing}
          />}

        {isPendingSearchpullRequests &&
          searchType === 1 &&
          <LoadingContainer
            animating={isPendingSearchpullRequests && searchType === 1}
            text={`Searching for ${query}`}
            style={styles.marginSpacing}
          />}

        {searchStart && ((searchType === 0 && issues.length > 0) || (searchType === 1 && pullRequests.length > 0)) &&
          <FlatList
            removeClippedSubviews={false}
            data={searchType === 0 ? issues : pullRequests}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        }

        {!searchStart &&
          <FlatList
          removeClippedSubviews={false}
          data={searchType === 0 ? navigation.state.params.issues.filter(issue => issue.state === 'open') : navigation.state.params.issues.filter(issue => issue.state === 'closed')}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          />
        }

        {searchStart && !isPendingSearchIssues && issues.length === 0 && searchType === 0 &&
          <View style={styles.marginSpacing}>
            <Text style={styles.searchTitle}>
              No issues found!
            </Text>
          </View>}

        {searchStart && !isPendingSearchpullRequests && pullRequests.length === 0 && searchType === 1 &&
          <View style={styles.marginSpacing}>
            <Text style={styles.searchTitle}>
              No pull requests found!
            </Text>
          </View>}
      </ViewContainer>
    )
  }

  keyExtractor = (item) => {
    return item.id;
  }
}

IssuesList.propTypes = {
  issues: PropTypes.array,
  repository: PropTypes.object,
  pullRequests: PropTypes.array,
  isPendingSearchIssues: PropTypes.bool,
  isPendingSearchpullRequests: PropTypes.bool,
  searchRepoIssues: PropTypes.func,
  searchRepoPulls: PropTypes.func,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  header: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  searchBarWrapper: {
    flexDirection: 'row',
  },
  searchContainer: {
    width: Dimensions.get('window').width,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.grey,
    backgroundColor: colors.white,
    flex: 1,
  },
  list: {
    marginTop: 0,
  },
  buttonGroupContainer: {
    height: 30,
  },
  buttonGroupText: {
    fontFamily: 'AvenirNext-Bold',
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
    fontSize: 20,
    textAlign: 'center',
  },
  listContainer: {
    borderTopColor: colors.greyLight,
    borderTopWidth: 1,
    marginBottom: 105,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(IssuesList);
