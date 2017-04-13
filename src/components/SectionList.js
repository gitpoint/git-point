import React, {PropTypes} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List, ListItem, Button} from 'react-native-elements';

import colors from '../config/colors';

const SectionList = (
  {
    title,
    showButton,
    showActionButton,
    buttonTitle,
    buttonAction,
    noOuterBorders,
    noItems,
    noItemsMessage,
    children,
  }
) => {
  const listDisplay = noItems ? <ListItem title={noItemsMessage} titleStyle={styles.listTitle} hideChevron/> : children;

  return (
    <View style={styles.section}>
      <View style={styles.topHeader}>
        <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>

        {(showButton || showActionButton) &&
          <Button
            title={buttonTitle}
            fontFamily="AvenirNext-DemiBold"
            fontSize={13}
            color={showButton ? colors.primarydark : colors.white}
            buttonStyle={[styles.button, showButton ? styles.displayButton : styles.actionButton]}
            onPress={buttonAction}
          />}
      </View>
      <List containerStyle={[styles.list, noOuterBorders && styles.noOuterBorders]}>
        {listDisplay}
      </List>
    </View>
  )
};

SectionList.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  showButton: PropTypes.bool,
  showActionButton: PropTypes.bool,
  buttonTitle: PropTypes.string,
  noOuterBorders: PropTypes.bool,
  noItems: PropTypes.bool,
  noItemsMessage: PropTypes.string,
  buttonAction: PropTypes.func,
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
    color: colors.primarydark,
    fontFamily: 'AvenirNext-DemiBold',
  },
  button: {
    borderWidth: 1,
    borderRadius: 3,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 0,
  },
  displayButton: {
    backgroundColor: colors.white,
    borderColor: colors.primarydark,
  },
  actionButton: {
    backgroundColor: colors.green,
    borderColor: colors.green,
  },
  list: {
    marginTop: 0,
  },
  noOuterBorders: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  }
});

export default SectionList;
