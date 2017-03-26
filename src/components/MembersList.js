import React, {PropTypes} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import colors from '../config/colors';

const MembersList = (
  {
    title,
    members,
    navigation,
  },
) => (
  <View style={styles.wrapper}>
    <Text style={styles.sectionTitle}>{title}</Text>

    <FlatList
      data={members}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <View style={styles.avatarContainer}>
          <TouchableHighlight
            onPress={() => navigation.navigate('Profile', {
              user: item,
            })}
            underlayColor="transparent"
          >
            <Image style={styles.avatar} source={{uri: item.avatar_url}} />
          </TouchableHighlight>
        </View>
      )}
      keyExtractor={item => item.id}
      horizontal={true}
    />
  </View>
);

MembersList.propTypes = {
  title: PropTypes.string,
  members: PropTypes.array,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
    padding: 15,
  },
  avatarContainer: {
    marginRight: 5,
  },
  avatar: {
    borderRadius: 15,
    height: 30,
    width: 30,
  },
  sectionTitle: {
    color: colors.black,
    fontFamily: 'AvenirNext-Bold',
    marginBottom: 10,
  },
});

export default MembersList;
