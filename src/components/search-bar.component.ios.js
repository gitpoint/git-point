import React from 'react';
import RNSearchBar from 'react-native-search-bar';

type Props = {
  textColor?: string,
  textFieldBackgroundColor?: string,
  showsCancelButton?: boolean,
  placeholder?: string,
  onFocus: Function,
  onCancelButtonPress: Function,
  onSearchButtonPress: Function,
};

export const SearchBar = ({
  textColor,
  textFieldBackgroundColor,
  showsCancelButton,
  placeholder,
  onFocus,
  onCancelButtonPress,
  onSearchButtonPress,
}: Props) => (
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

SearchBar.defaultProps = {
  textColor: '',
  textFieldBackgroundColor: '',
  showsCancelButton: false,
  placeholder: '',
};
