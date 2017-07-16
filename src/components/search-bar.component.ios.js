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

  static defaultProps = {
    textColor: '',
    textFieldBackgroundColor: '',
    showsCancelButton: false,
    placeholder: '',
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
        ref={ref => {
          this.searchBar = ref;
        }}
        textColor={textColor}
        textFieldBackgroundColor={textFieldBackgroundColor}
        showsCancelButton={showsCancelButton}
        placeholder={placeholder}
        onFocus={onFocus}
        onCancelButtonPress={() => {
          if (typeof onCancelButtonPress === 'function') {
            onCancelButtonPress();
          }
          this.searchBar.unFocus();
        }}
        onSearchButtonPress={text => {
          if (typeof onSearchButtonPress === 'function') {
            onSearchButtonPress(text);
          }
          this.searchBar.unFocus();
        }}
        hideBackground
      />
    );
  }
}
