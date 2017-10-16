import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { LabelButton } from 'components';
import { colors } from 'config';

type Props = {
  label: Object,
  removeLabel: Function,
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  wrapper: {
    padding: 10,
    marginLeft: 5,
    flexDirection: 'row',
  },
  labelInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 0.15,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

export const LabelListItem = ({ label, removeLabel }: Props) => (
  <View style={styles.container}>
    <View style={styles.wrapper}>
      <View style={styles.labelInfo}>
        <LabelButton label={label} largeWithTag />
      </View>

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => removeLabel(label)}
      >
        <Icon color={colors.grey} name="x" type="octicon" />
      </TouchableOpacity>
    </View>
  </View>
);
