import React, {PropTypes} from 'react';
import {StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';

import colors from '../config/colors';

const SearchInput = (
  {
    onChangeText,
    onSubmitEditing,
  }
) => (
  <SearchBar
    lightTheme
    round
    containerStyle={styles.searchBarContainer}
    inputStyle={styles.searchBar}
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="Search"
    onChangeText={onChangeText}
    onSubmitEditing={onSubmitEditing}
  />
);

SearchInput.propTypes = {
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    flex: 1,
  },
  searchBar: {
    backgroundColor: colors.greyLight,
    fontSize: 15,
    borderRadius: 3,
  },
});

export default SearchInput;
