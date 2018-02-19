import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';

import { colors, fonts } from 'config';

type Props = {
  loading: boolean,
  title: React.Element,
  children?: React.Element<*>,
  showButton: boolean,
  buttonTitle: string,
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
    ...fonts.fontPrimaryBold,
  },
  listTitle: {
    color: colors.black,
    ...fonts.fontPrimary,
  },
  button: {
    backgroundColor: colors.white,
    borderColor: colors.primaryDark,
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  list: {
    marginTop: 0,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
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
  noItems,
  noItemsMessage,
  children,
}: Props) => {
  let listDisplay;

  if (loading) {
    listDisplay = (
      <ActivityIndicator animating={loading} style={styles.loadingIcon} />
    );
  } else if (noItems) {
    listDisplay = (
      <ListItem
        title={noItemsMessage}
        titleStyle={styles.listTitle}
        hideChevron
      />
    );
  } else {
    listDisplay = children;
  }

  let sectionTitle = '';

  if (typeof title === 'string') {
    sectionTitle = <Text style={styles.sectionTitle}>{title}</Text>;
  } else {
    sectionTitle = <View style={{ padding: 15 }}>{title}</View>;
  }

  return (
    <View style={styles.section}>
      <View style={styles.topHeader}>
        {sectionTitle}

        {showButton &&
          !loading && (
            <Button
              title={buttonTitle}
              textStyle={fonts.fontPrimarySemiBold}
              fontSize={13}
              color={showButton ? colors.primaryDark : colors.white}
              buttonStyle={styles.button}
              onPress={buttonAction}
            />
          )}
      </View>
      <List containerStyle={styles.list}>{listDisplay}</List>
    </View>
  );
};

SectionList.defaultProps = {
  children: null,
};
