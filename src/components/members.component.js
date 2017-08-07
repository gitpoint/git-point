import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Image,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import { colors, fonts } from 'config';

type Props = {
  title: string,
  members: Array,
  noMembersMessage: string,
  containerStyle: Object,
  smallTitle: string,
  navigation: Object,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  avatarContainer: {
    backgroundColor: colors.greyLight,
    borderRadius: 15,
    width: 30,
    height: 30,
    marginRight: 5,
  },
  avatar: {
    borderRadius: 15,
    height: 30,
    width: 30,
  },
  list: {
    marginTop: 0,
  },
  sectionTitle: {
    color: colors.black,
    ...fonts.fontPrimaryBold,
    marginBottom: 10,
    paddingLeft: 15,
  },
  sectionTitleSmall: {
    color: colors.primaryDark,
    ...fonts.fontPrimarySemiBold,
    marginBottom: 10,
    paddingLeft: 15,
  },
  flatList: {
    paddingLeft: 15,
  },
});

export const MembersList = ({
  title,
  members,
  noMembersMessage,
  containerStyle,
  smallTitle,
  navigation,
}: Props) =>
  <View style={[styles.container, containerStyle && containerStyle]}>
    <Text style={smallTitle ? styles.sectionTitleSmall : styles.sectionTitle}>
      {title}
    </Text>

    {noMembersMessage &&
      !members.length &&
      <List containerStyle={styles.list}>
        <ListItem
          title={noMembersMessage}
          titleStyle={styles.listTitle}
          hideChevron
        />
      </List>}

    <FlatList
      style={styles.flatList}
      data={members}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) =>
        <TouchableHighlight
          onPress={() =>
            navigation.navigate('Profile', {
              user: item,
            })}
          underlayColor="transparent"
          style={styles.avatarContainer}
        >
          <Image
            style={styles.avatar}
            source={{
              uri: item.avatar_url,
            }}
          />
        </TouchableHighlight>}
      keyExtractor={item => item.id}
      horizontal
    />
  </View>;
