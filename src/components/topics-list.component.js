import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { colors, fonts } from 'config';
import { InlineLabel } from 'components';

type Props = {
  title: string,
  topics: Array,
};

const styles = {
  scrollGradient: {
    position: 'absolute',
    width: 15,
    height: 30,
  },
};

const TopicsFlatList = styled.FlatList`
  marginleft: 15;
  marginright: 15;
`;

const TopicsListContainer = styled.View`
  margintop: 30;
`;

const TopicsListLabel = styled.Text`
  color: ${colors.black};
  ${{ ...fonts.fontPrimaryBold }};
  marginbottom: 10;
  paddingleft: 15;
`;

export const TopicsList = ({ title, topics }: Props) => (
  <TopicsListContainer>
    <TopicsListLabel>{title}</TopicsListLabel>
    {topics.length > 0 && (
      <TopicsFlatList
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
  </TopicsListContainer>
);
