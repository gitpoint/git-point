import React from 'react';
import { StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 0,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export const SearchBar = ({
  textColor,
  textFieldBackgroundColor,
  showsCancelButton,
  placeholder,
  onFocus,
  onCancelButtonPress,
  onSearchButtonPress,
}: Props) => (
  <MDSearchBar
    textStyle={textColor ? { color: textColor } : null}
    inputStyle={{
      ...StyleSheet.flatten(styles.textInput),
      ...(textFieldBackgroundColor
        ? { backgroundColor: textFieldBackgroundColor }
        : {}),
    }}
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
    height={40}
    autoCorrect={false}
    returnKeyType="search"
  />
);

SearchBar.defaultProps = {
  textColor: undefined,
  textFieldBackgroundColor: undefined,
  showsCancelButton: false,
  placeholder: '',
};
