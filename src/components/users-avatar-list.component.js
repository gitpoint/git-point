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
import { List, ListItem } from 'react-native-elements';

import { colors, fonts } from 'config';

const mapStateToProps = state => ({
  authUser: state.auth.user,
});

type Props = {
  title: string,
  members: Array,
  noMembersMessage: string,
  containerStyle: Object,
  smallTitle: string,
  navigation: Object,
  authUser: Object,
  loadMore: Function,
};

const size = 30;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  avatarContainer: {
    backgroundColor: colors.greyLight,
    borderRadius: size / 2,
    width: size,
    height: size,
    marginRight: 5,
  },
  avatar: {
    borderRadius: size / 2,
    height: size,
    width: size,
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
    paddingRight: 15,
  },
});

const UsersAvatarListComponent = ({
  title,
  members,
  noMembersMessage,
  containerStyle,
  smallTitle,
  navigation,
  loadMore,
  authUser,
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
      onEndReached={() => loadMore()}
      onEndReachedThreshold={0.4}
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
              uri: item.avatarUrl,
            }}
          />
        </TouchableHighlight>}
      keyExtractor={item => item.id}
      horizontal
    />
  </View>;

export const UsersAvatarList = connect(mapStateToProps)(
  UsersAvatarListComponent
);
