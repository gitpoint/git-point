// @flow

import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { colors, fonts } from 'config';

type Props = {
  additions: number,
  deletions: number,
  showNumbers: boolean,
  onPress: Function,
};

const DiffBlocksViewContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const DiffBlocksTouchableContainer = DiffBlocksViewContainer.withComponent(
  TouchableOpacity
);

const Num = styled.Text`
  letter-spacing: 1;
  ${fonts.fontPrimarySemiBold};
`;

const NumAdditions = Num.extend`
  margin-right: 3;
  color: ${colors.green};
`;

const NumDeletions = Num.extend`
  margin-right: 2;
  color: ${colors.red};
`;

const LinesChanged = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Block = styled.View`
  width: 7;
  height: 7;
  margin-left: 1;
`;

const AddedBlock = Block.extend`
  background-color: ${colors.green};
`;

const DeletedBlock = Block.extend`
  background-color: ${colors.darkRed};
`;

const NeutralBlock = Block.extend`
  background-color: ${colors.greyMid};
`;

export const DiffBlocks = ({
  additions,
  deletions,
  showNumbers,
  onPress,
}: Props) => {
  const linesChanged = additions + deletions;

  let addedBlocks = null;
  let deletedBlocks = null;
  let neutralBlocks = null;

  if (linesChanged <= 5) {
    addedBlocks = additions;
    deletedBlocks = deletions;
    neutralBlocks = 5 - (addedBlocks + deletedBlocks);
  } else {
    addedBlocks = Math.floor(additions / linesChanged * 5);
    deletedBlocks = Math.floor(deletions / linesChanged * 5);
    neutralBlocks = 5 - (addedBlocks + deletedBlocks);
  }

  const Container = onPress
    ? DiffBlocksTouchableContainer
    : DiffBlocksViewContainer;

  return (
    <Container onPress={onPress}>
      {showNumbers && (
        <LinesChanged>
          <NumAdditions>{`+${additions}`}</NumAdditions>
          <NumDeletions>{`-${deletions}`}</NumDeletions>
        </LinesChanged>
      )}

      {[...Array(addedBlocks)].map((item, index) => {
        return <AddedBlock key={index} />; // eslint-disable-line react/no-array-index-key
      })}

      {[...Array(deletedBlocks)].map((item, index) => {
        return <DeletedBlock key={index} />; // eslint-disable-line react/no-array-index-key
      })}

      {[...Array(neutralBlocks)].map((item, index) => {
        return <NeutralBlock key={index} />; // eslint-disable-line react/no-array-index-key
      })}
    </Container>
  );
};
