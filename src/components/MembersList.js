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
    containerStyle,
    smallTitle,
    navigation,
  },
) => (
  <View style={[styles.container, containerStyle && containerStyle]}>
    <Text style={smallTitle ? styles.sectionTitleSmall : styles.sectionTitle}>{title}</Text>

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
  containerStyle: PropTypes.object,
  smallTitle: PropTypes.bool,
  navigation: PropTypes.object,
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

export default MembersList;
