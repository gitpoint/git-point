import React, { PropTypes } from 'react';
import MDSearchBar from 'react-native-material-design-searchbar';

export const SearchBar = ({
  textColor,
  textFieldBackgroundColor,
  showsCancelButton,
  placeholder,
  onFocus,
  onCancelButtonPress,
  onSearchButtonPress,
}) => (
  <MDSearchBar
    textStyle={textColor ? { color: textColor } : null}
    inputStyle={textFieldBackgroundColor ? { backgroundColor: textFieldBackgroundColor } : null}
    alwaysShowBackButton={showsCancelButton}
    placeholder={placeholder}
    onFocus={onFocus}
    onClose={onCancelButtonPress}
    onBackPress={onCancelButtonPress}
    onSubmitEditing={event => {
      typeof onSearchButtonPress === 'function' && onSearchButtonPress(event.nativeEvent.text);
    }}
    height={50}
    autoCorrect={false}
    returnKeyType="search"
  />
);

SearchBar.propTypes = {
  textColor: PropTypes.string,
  textFieldBackgroundColor: PropTypes.string,
  showsCancelButton: PropTypes.boolean,
  placeholder: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
  onCancelButtonPress: PropTypes.func.isRequired,
  onSearchButtonPress: PropTypes.func.isRequired,
};
