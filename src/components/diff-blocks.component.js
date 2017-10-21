// @flow

import React from 'react';
import styled from 'styled-components/native';
// import { View, TouchableOpacity } from 'react-native';

import { colors, fonts } from 'config';

type Props = {
  additions: number,
  deletions: number,
  showNumbers: boolean,
  onPress: Function,
};

const Container = styled.Component`
  flex-direction: 'row';
  align-items: 'center';
`;

const LinesChanged = styled.View`
  flex-direction: 'row';
  align-items: 'center';
`;

const NumAdditions = styled.Text`
  margin-right: 3;
  color: colors.green;
  letter-spacing: 1;
  font-family: ${fonts.fontPrimarySemiBold};
`;

const NumDeletions = styled.Text`
  margin-right: 2,
  color: colors.red,
  letter-spacing: 1,
  font-family: ${fonts.fontPrimarySemiBold};
`;

const Block = styled.View`
  width: 7;
  height: 7;
  margin-left: 1;
`;

const GreenBlock = Block.extend`
  background-color: ${colors.green};
`;

const RedBlock = Block.extend`
  background-color: ${colors.darkRed};
`;

const GreyBlock = Block.extend`
  background-color: ${colors.greyMid};
`;

export const DiffBlocks = ({
  additions,
  deletions,
  showNumbers,
  onPress,
}: Props) => {
  const linesChanged = additions + deletions;

  let greenBlocks = null;
  let redBlocks = null;
  let greyBlocks = null;

  if (linesChanged <= 5) {
    greenBlocks = additions;
    redBlocks = deletions;
    greyBlocks = 5 - (greenBlocks + redBlocks);
  } else {
    greenBlocks = Math.floor(additions / linesChanged * 5);
    redBlocks = Math.floor(deletions / linesChanged * 5);
    greyBlocks = 5 - (greenBlocks + redBlocks);
  }

  // const Container = onPress ? TouchableOpacity : View; TODO: Implement this conditional with styled components

  return (
    <Container onPress={onPress}>
      {showNumbers && (
        <LinesChanged>
          <NumAdditions>{`+${additions}`}</NumAdditions>
          <NumDeletions>{`-${deletions}`}</NumDeletions>
        </LinesChanged>
      )}

      {[...Array(greenBlocks)].map((item, index) => {
        return <GreenBlock key={index} />; // eslint-disable-line react/no-array-index-key
      })}

      {[...Array(redBlocks)].map((item, index) => {
        return <RedBlock key={index} />; // eslint-disable-line react/no-array-index-key
      })}

      {[...Array(greyBlocks)].map((item, index) => {
        return <GreyBlock key={index} />; // eslint-disable-line react/no-array-index-key
      })}
    </Container>
  );
};
