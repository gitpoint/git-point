import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Communications from 'react-native-communications';

import { SectionList } from 'components';
import { colors, fonts, normalize } from 'config';

type Props = {
  entity: Object,
};

const styles = StyleSheet.create({
  badge: {
    padding: 12,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 20,
  },
  mergedIssue: {
    backgroundColor: colors.purple,
  },
  openIssue: {
    backgroundColor: colors.green,
  },
  closedIssue: {
    backgroundColor: colors.red,
  },
  text: {
    fontSize: normalize(12),
    ...fonts.fontPrimarySemiBold,
    color: colors.white,
  },
});

const getBlogLink = url =>
  url.substr(0, 4) === 'http' ? url : `http://${url}`;

const getLocationLink = location =>
  `https://www.google.com/maps/place/${location.split(' ').join('+')}`;

export const EntityInfo = ({ entity }: Props) => {
  return (
    <SectionList title="INFO">
      {!!entity.location &&
        entity.location !== '' &&
        <ListItem
          title="Location"
          titleStyle={styles.listTitle}
          leftIcon={{
            name: 'location',
            color: colors.grey,
            type: 'octicon',
          }}
          subtitle={entity.location}
          onPress={() => Communications.web(getLocationLink(entity.location))}
          underlayColor={colors.greyLight}
        />}

      {!!entity.email &&
        entity.email !== '' &&
        <ListItem
          title="Email"
          titleStyle={styles.listTitle}
          leftIcon={{
            name: 'mail',
            color: colors.grey,
            type: 'octicon',
          }}
          subtitle={entity.email}
          onPress={() =>
            Communications.email([entity.email], null, null, 'Hi!', '')}
          underlayColor={colors.greyLight}
        />}

      {!!entity.blog &&
        entity.blog !== '' &&
        <ListItem
          title="Website"
          titleStyle={styles.listTitle}
          leftIcon={{
            name: 'link',
            color: colors.grey,
            type: 'octicon',
          }}
          subtitle={entity.blog}
          onPress={() => Communications.web(getBlogLink(entity.blog))}
          underlayColor={colors.greyLight}
        />}
    </SectionList>
  );
};
