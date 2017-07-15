import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Image,
} from 'react-native';

import { colors } from 'config';

type Props = {
  title: string,
  members: Array,
  containerStyle: Object,
  smallTitle: string,
  navigation: Object,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    padding: 15,
  },
  avatarContainer: {
    marginRight: 5,
  },
  avatar: {
    backgroundColor: colors.greyLight,
    borderRadius: 15,
    height: 30,
    width: 30,
  },
  sectionTitle: {
    color: colors.black,
    fontFamily: 'AvenirNext-Bold',
    marginBottom: 10,
  },
  sectionTitleSmall: {
    color: colors.primarydark,
    fontFamily: 'AvenirNext-DemiBold',
    marginBottom: 10,
  },
});

export const MembersList = ({
  title,
  members,
  containerStyle,
  smallTitle,
  navigation,
}: Props) =>
  <View style={[styles.container, containerStyle && containerStyle]}>
    <Text style={smallTitle ? styles.sectionTitleSmall : styles.sectionTitle}>
      {title}
    </Text>

    <FlatList
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
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={{
                uri: item.avatar_url,
              }}
            />
          </View>
        </TouchableHighlight>}
      keyExtractor={item => item.id}
      horizontal
    />
  </View>;
