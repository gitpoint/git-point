import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';
import { colors, fonts } from 'config';
import { InlineLabel } from 'components';
import { FlatList, View } from 'react-native';

type Props = {
  title: string,
  topics: Array,
};

const styles = {
  contentContainerStyle: {
    paddingLeft: 13,
    paddingRight: 13,
  },
  scrollGradient: {
    position: 'absolute',
    width: 15,
    height: 30,
  },
};

const TopicsListContainer = styled.View`
  margin-top: 30;
`;

const TopicsListLabel = styled.Text`
  color: ${colors.black};
  ${{ ...fonts.fontPrimaryBold }};
  margin-bottom: 10;
  padding-left: 15;
`;

export const TopicsList = ({ title, topics }: Props) => (
  <TopicsListContainer>
    <TopicsListLabel>{title}</TopicsListLabel>
    <View>
      {topics.length > 0 && (
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          data={topics}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <InlineLabel
              label={{ name: item, color: colors.topicLightBlue.slice(1) }}
            />
          )}
          keyExtractor={item => item}
          horizontal
        />
      )}
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
  </TopicsListContainer>
);
