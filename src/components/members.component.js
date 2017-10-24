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
import LinearGradient from 'react-native-linear-gradient';

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
};

const avatarSize = 30;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  avatarContainer: {
    backgroundColor: colors.greyLight,
    borderRadius: avatarSize / 2,
    width: avatarSize,
    height: avatarSize,
  },
  avatar: {
    borderRadius: avatarSize / 2,
    height: avatarSize,
    width: avatarSize,
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
    paddingHorizontal: 15,
  },
  scrollGradient: {
    position: 'absolute',
    width: 15,
    height: avatarSize,
  },
});

const MembersListComponent = ({
  title,
  members,
  noMembersMessage,
  containerStyle,
  smallTitle,
  navigation,
  authUser,
}: Props) => (
  <View style={[styles.container, containerStyle && containerStyle]}>
    <Text style={smallTitle ? styles.sectionTitleSmall : styles.sectionTitle}>
      {title}
    </Text>

    {noMembersMessage &&
      !members.length && (
        <List containerStyle={styles.list}>
          <ListItem
            title={noMembersMessage}
            titleStyle={styles.listTitle}
            hideChevron
          />
        </List>
      )}
    <View>
      <FlatList
        contentContainerStyle={styles.flatList}
        data={members}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
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
            style={[
              styles.avatarContainer,
              { marginRight: index < members.length - 1 ? 5 : 0 },
            ]}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: item.avatar_url,
              }}
            />
          </TouchableHighlight>
        )}
        keyExtractor={item => item.id}
        horizontal
      />

      <LinearGradient
        style={[styles.scrollGradient, { left: 0 }]}
        colors={['white', 'rgba(255, 255, 255, 0)']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      />

      <LinearGradient
        style={[styles.scrollGradient, { right: 0 }]}
        colors={['rgba(255, 255, 255, 0)', 'white']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      />
    </View>
  </View>
);

export const MembersList = connect(mapStateToProps)(MembersListComponent);
