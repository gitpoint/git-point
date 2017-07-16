import React from 'react';
import MDSearchBar from 'react-native-material-design-searchbar';

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
}: Props) =>
  <MDSearchBar
    textStyle={textColor ? { color: textColor } : null}
    inputStyle={
      textFieldBackgroundColor
        ? { backgroundColor: textFieldBackgroundColor }
        : null
    }
    alwaysShowBackButton={showsCancelButton}
    placeholder={placeholder}
    onFocus={onFocus}
    onClose={onCancelButtonPress}
    onBackPress={onCancelButtonPress}
    onSubmitEditing={event => {
      if (typeof onSearchButtonPress === 'function') {
        onSearchButtonPress(event.nativeEvent.text);
      }
    }}
    height={50}
    autoCorrect={false}
    returnKeyType="search"
  />;

SearchBar.defaultProps = {
  textColor: undefined,
  textFieldBackgroundColor: undefined,
  showsCancelButton: false,
  placeholder: '',
};
