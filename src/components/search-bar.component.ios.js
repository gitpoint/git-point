import React, { Component, PropTypes } from 'react';
import RNSearchBar from 'react-native-search-bar';

export class SearchBar extends Component {
  static propTypes = {
    textColor: PropTypes.string,
    textFieldBackgroundColor: PropTypes.string,
    showsCancelButton: PropTypes.bool,
    placeholder: PropTypes.string,
    onFocus: PropTypes.func.isRequired,
    onCancelButtonPress: PropTypes.func.isRequired,
    onSearchButtonPress: PropTypes.func.isRequired,
  };

  render() {
    const {
      textColor,
      textFieldBackgroundColor,
      showsCancelButton,
      placeholder,
      onFocus,
      onCancelButtonPress,
      onSearchButtonPress,
    } = this.props;

    return (
      <RNSearchBar
        ref="searchBar"
        hideBackground={true}
        textColor={textColor}
        textFieldBackgroundColor={textFieldBackgroundColor}
        showsCancelButton={showsCancelButton}
        placeholder={placeholder}
        onFocus={onFocus}
        onCancelButtonPress={() => {
          typeof onCancelButtonPress === 'function' && onCancelButtonPress();
          this.refs.searchBar.unFocus();
        }}
        onSearchButtonPress={query => {
          typeof onSearchButtonPress === 'function' && onSearchButtonPress(query);
          this.refs.searchBar.unFocus();
        }}
      />
    );
  }
}
