import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Image,
} from 'react-native';

import { colors, fonts } from 'config';

const mapStateToProps = state => ({
  authUser: state.auth.user,
});

type Props = {
  title: string,
  members: Array,
  containerStyle: Object,
  smallTitle: string,
  navigation: Object,
  authUser: Object,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    padding: 15,
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
  sectionTitle: {
    color: colors.black,
    ...fonts.fontPrimaryBold,
    marginBottom: 10,
  },
  sectionTitleSmall: {
    color: colors.primaryDark,
    ...fonts.fontPrimarySemiBold,
    marginBottom: 10,
  },
});

const MembersListComponent = ({
  title,
  members,
  containerStyle,
  smallTitle,
  navigation,
  authUser,
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
          onPress={() => {
            navigation.navigate(
              authUser.login === item.login ? 'AuthProfile' : 'Profile',
              {
                user: item,
              }
            );
          }}
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

export const MembersList = connect(mapStateToProps)(MembersListComponent);
