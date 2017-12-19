import React from 'react';
import { TouchableOpacity, FlatList, Text, View } from 'react-native';
import { colors, fonts } from 'config';

type Props = {
  containerStyle: Object,
  title: string,
  topics: Array,
};

const styles = {
  container: {
    marginTop: 30,
  },
  sectionTitle: {
    color: colors.black,
    ...fonts.fontPrimaryBold,
    marginBottom: 10,
    paddingLeft: 15,
  },
  topic: {
    backgroundColor: colors.topicLightBlue,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 3,
    paddingRight: 10,
    paddingBottom: 3,
    paddingLeft: 10,
    borderRadius: 3,
  },
  flatList: {
    marginLeft: 15,
    marginRight: 15,
  },
};

export const TopicsList = ({ containerStyle, title, topics }: Props) => (
  <View style={styles.container}>
    <Text style={[styles.sectionTitle, containerStyle]}>{title}</Text>
    {topics.length > 0 && (
      <FlatList
        style={styles.flatList}
        data={topics}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.topic}>
            <Text style={{ color: colors.topicDarkBlue }}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        horizontal
      />
    )}
  </View>
);
