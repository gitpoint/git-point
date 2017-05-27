import React, {PropTypes} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
// import {SearchBar} from 'react-native-elements';
import SearchBar from 'react-native-search-bar';

import config from '@config';

const SearchInput = (
  {
    onChangeText,
    onSubmitEditing,
  }
) => (
  /*<SearchBar
    lightTheme
    round
    containerStyle={styles.searchBarContainer}
    inputStyle={styles.searchBar}
    autoCapitalize="none"
    autoCorrect={false}
    placeholder="Search"
    onChangeText={onChangeText}
    onSubmitEditing={onSubmitEditing}
  />*/
  <View style={styles.searchContainer}>
    <SearchBar
      placeholder="Search"
      hideBackground={true}
      textFieldBackgroundColor={config.colors.greyLight}
      onSearchButtonPress={() => {
        onSubmitEditing;
        this.unFocus();
      }}
    />
  </View>
);

SearchInput.propTypes = {
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
};

const styles = StyleSheet.create({
  searchContainer: {
    width: Dimensions.get('window').width,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#bbb',
    backgroundColor: 'white',
    flex: 1,
  },
  searchBar: {
    backgroundColor: config.colors.greyLight,
    fontSize: 15,
    borderRadius: 3,
    height: 40,
    width: 500,
  },
});

export default SearchInput;
