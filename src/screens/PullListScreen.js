import React, {Component, PropTypes} from 'react';
import { FlatList, View, StyleSheet, Dimensions, Text } from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import SearchBar from 'react-native-search-bar';

import ViewContainer from '../components/ViewContainer';
import IssueListItem from '../components/IssueListItem';
import LoadingContainer from '../components/LoadingContainer';

import colors from '../config/colors';

import {connect} from 'react-redux';
import {searchOpenRepoPulls, searchClosedRepoPulls} from '../actions/repository';

const mapStateToProps = state => ({
  repository: state.repository.repository,
  searchedOpenPulls: state.repository.searchedOpenPulls,
  searchedClosedPulls: state.repository.searchedClosedPulls,
  isPendingSearchOpenPulls: state.repository.isPendingSearchOpenPulls,
  isPendingSearchClosedPulls: state.repository.isPendingSearchClosedPulls
});

const mapDispatchToProps = dispatch => ({
  searchOpenRepoPulls: (query, repo) => dispatch(searchOpenRepoPulls(query, repo)),
  searchClosedRepoPulls: (query, repo) => dispatch(searchClosedRepoPulls(query, repo)),
});

class PullList extends Component {
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

  switchQueryType(selectedType) {
    if (this.state.searchType !== selectedType) {
      this.setState({
        searchType: selectedType,
      });

      this.search(this.state.query, selectedType);
    }
  }

  search(query, selectedType = null) {
    const {searchOpenRepoPulls, searchClosedRepoPulls, repository} = this.props;

    const selectedSearchType = selectedType !== null
      ? selectedType
      : this.state.searchType;

    if (query !== '') {
      this.setState({
        query: query,
        searchStart: true,
      });

      selectedSearchType === 0 ? searchOpenRepoPulls(query, repository.full_name) : searchClosedRepoPulls(query, repository.full_name);
    }
  }

  renderItem = ({item}) => (
    <IssueListItem
      type={this.props.navigation.state.params.type}
      issue={item}
      userHasPushPermission={this.props.navigation.state.params.userHasPushPermission}
      navigation={this.props.navigation} />
  )

  getList = () => {
    const {searchedOpenPulls, searchedClosedPulls, navigation} = this.props;    
    const {searchType, searchStart} = this.state;
    
    if (searchStart) {
      return searchType === 0 ? searchedOpenPulls : searchedClosedPulls;
    } else {
      return searchType === 0 ? navigation.state.params.issues.filter(issue => issue.state === 'open') : navigation.state.params.issues.filter(issue => issue.state === 'closed');
    }
  }

  render() {
    const {searchedOpenPulls, searchedClosedPulls, isPendingSearchOpenPulls, isPendingSearchClosedPulls} = this.props;
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
                  this.setState({ searchStart: false, query: '' });
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

        {isPendingSearchOpenPulls &&
          searchType === 0 &&
          <LoadingContainer
            animating={isPendingSearchOpenPulls && searchType === 0}
            text={`Searching for ${query}`}
            style={styles.marginSpacing}
          />}

        {isPendingSearchClosedPulls &&
          searchType === 1 &&
          <LoadingContainer
            animating={isPendingSearchClosedPulls && searchType === 1}
            text={`Searching for ${query}`}
            style={styles.marginSpacing}
          />}
        
        {this.getList().length > 0 &&
          <FlatList
            removeClippedSubviews={false}
            data={this.getList()}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        }

        {searchStart && !isPendingSearchOpenPulls && searchedOpenPulls.length === 0 && searchType === 0 &&
          <View style={styles.marginSpacing}>
            <Text style={styles.searchTitle}>
              No open pull requests found!
            </Text>
          </View>}

        {searchStart && !isPendingSearchClosedPulls && searchedClosedPulls.length === 0 && searchType === 1 &&
          <View style={styles.marginSpacing}>
            <Text style={styles.searchTitle}>
              No closed pull requests found!
            </Text>
          </View>}
      </ViewContainer>
    )
  }

  keyExtractor = (item) => {
    return item.id;
  }
}

PullList.propTypes = {
  repository: PropTypes.object,
  searchedOpenPulls: PropTypes.array,
  searchedClosedPulls: PropTypes.array,
  isPendingSearchOpenPulls: PropTypes.bool,
  isPendingSearchClosedPulls: PropTypes.bool,
  searchOpenRepoPulls: PropTypes.func,
  searchClosedRepoPulls: PropTypes.func,
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

export default connect(mapStateToProps, mapDispatchToProps)(PullList);
