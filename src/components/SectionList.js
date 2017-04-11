import React, {PropTypes} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List, Button} from 'react-native-elements';

import colors from '../config/colors';

const SectionList = (
  {
    title,
    showButton,
    buttonTitle,
    buttonAction,
    noOuterBorders,
    children,
  }
) => (
  <View style={styles.section}>
    <View style={styles.topHeader}>
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>

      {showButton &&
        <Button
          title={buttonTitle}
          fontFamily="AvenirNext-DemiBold"
          fontSize={13}
          color={colors.primarydark}
          buttonStyle={styles.button}
          onPress={buttonAction}
        />}
    </View>
    <List containerStyle={[styles.list, noOuterBorders && styles.noOuterBorders]}>
      {children}
    </List>
  </View>
);

SectionList.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  showButton: PropTypes.bool,
  buttonTitle: PropTypes.string,
  noOuterBorders: PropTypes.bool,
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
  button: {
    backgroundColor: colors.white,
    borderColor: colors.primarydark,
    borderWidth: 1,
    borderRadius: 3,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 0,
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
