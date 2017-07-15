import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';

import { colors } from '../config';

type Props = {
  loading: boolean,
  title: string,
  children?: React.Element<*>,
  showButton: boolean,
  buttonTitle: string,
  noOuterBorders: boolean,
  noItems: boolean,
  noItemsMessage: string,
  buttonAction: Function,
};

const styles = StyleSheet.create({
  section: {
    marginTop: 15,
  },
  topHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: colors.black,
    padding: 15,
    fontFamily: 'AvenirNext-Bold',
  },
  listTitle: {
    color: colors.black,
    fontFamily: 'AvenirNext-Medium',
  },
  button: {
    backgroundColor: colors.white,
    borderColor: colors.primarydark,
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 0,
  },
  list: {
    marginTop: 0,
  },
  noOuterBorders: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  loadingIcon: {
    marginVertical: 20,
  },
});

export const SectionList = ({
  loading,
  title,
  showButton,
  buttonTitle,
  buttonAction,
  noOuterBorders,
  noItems,
  noItemsMessage,
  children,
}: Props) => {
  let listDisplay;

  if (loading) {
    listDisplay = <ActivityIndicator animating={loading} style={styles.loadingIcon} />;
  } else if (noItems) {
    listDisplay = <ListItem title={noItemsMessage} titleStyle={styles.listTitle} hideChevron />;
  } else {
    listDisplay = children;
  }

  return (
    <View style={styles.section}>
      <View style={styles.topHeader}>
        <Text style={styles.sectionTitle}>
          {title.toUpperCase()}
        </Text>

        {showButton &&
          !loading &&
          <Button
            title={buttonTitle}
            fontFamily="AvenirNext-DemiBold"
            fontSize={13}
            color={showButton ? colors.primarydark : colors.white}
            buttonStyle={styles.button}
            onPress={buttonAction}
          />}
      </View>
      <List containerStyle={[styles.list, noOuterBorders && styles.noOuterBorders]}>
        {listDisplay}
      </List>
    </View>
  );
};

SectionList.defaultProps = {
  children: null,
};
