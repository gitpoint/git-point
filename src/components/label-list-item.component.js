import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-native-elements';
import { LabelButton } from 'components';
import { colors } from 'config';

type Props = {
  label: Object,
  removeLabel: Function,
};

const LabelListItemContainer = styled.View`
  border-bottom-color: ${colors.greyLight};
  border-bottom-width: 1;
`;

const Wrapper = styled.View`
  padding: 10px;
  margin-left: 5;
  flex-direction: row;
`;

const LabelInfo = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const IconContainer = styled.TouchableOpacity`
  flex: 0.15;
  align-items: flex-end;
  justify-content: center;
`;

IconContainer.displayName = 'IconContainer';

export const LabelListItem = ({ label, removeLabel }: Props) => (
  <LabelListItemContainer>
    <Wrapper>
      <LabelInfo>
        <LabelButton label={label} largeWithTag />
      </LabelInfo>

      <IconContainer onPress={() => removeLabel(label)}>
        <Icon color={colors.grey} name="x" type="octicon" />
      </IconContainer>
    </Wrapper>
  </LabelListItemContainer>
);
