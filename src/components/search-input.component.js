import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import SearchBar from "react-native-search-bar";

import config from "config";

type Props = {
  onSubmitEditing: Function
};

export const SearchInput = ({ onSubmitEditing }: Props) => (
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

const styles = StyleSheet.create({
  searchContainer: {
    width: Dimensions.get("window").width,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#bbb",
    backgroundColor: "white",
    flex: 1
  },
  searchBar: {
    backgroundColor: config.colors.greyLight,
    fontSize: 15,
    borderRadius: 3,
    height: 40,
    width: 500
  }
});
