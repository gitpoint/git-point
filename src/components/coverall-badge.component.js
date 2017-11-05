import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import { fonts, normalize } from 'config';

type Props = {
  coverage: number,
};

const Container = styled.View`
  flex-direction: row;
  border-radius: 3;
  width: 102;
  background-color: #5e5e5e;
`;

const LabelContainer = styled(LinearGradient).attrs({
  colors: ['#5e5e5e', '#4d4d4d'],
})`
  width: 63;
  height: 20;
  align-items: center;
  border-radius: 3;
`;

const Label = styled.Text`
  ${{ ...fonts.fontPrimaryBold }};
  font-weight: bold;
  background-color: transparent;
  color: #ffffff;
  text-shadow-color: #00000099;
  padding-left: 3;
  padding-top: 1;
  text-shadow-offset: {
    height: 1;
  }
  font-size: ${normalize(11)};
`;

const ValueContainer = styled(LinearGradient).attrs({
  colors: ['#e05d44', '#BB5C46'],
})`
  width: 36;
  height: 20;
  padding-top: 1;
  align-items: center;
`;

const ValueBorderContainer = ValueContainer.extend`
  width: 20;
  border-radius: 3;
  position: absolute;
  left: 83;
`;

const Value = Label.extend`
  font-size: ${props => normalize(props.value === 100 ? 10 : 11)};
`;

export const CoverallBadge = ({ coverage = 100 }: Props) => (
  <Container>
    <LabelContainer>
      <Label>coverage</Label>
    </LabelContainer>
    <ValueBorderContainer />
    <ValueContainer>
      <Value value={coverage}>{coverage === -1 ? 'ERR' : `${coverage}%`}</Value>
    </ValueContainer>
  </Container>
);
