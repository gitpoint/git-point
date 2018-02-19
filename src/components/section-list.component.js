import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import styled from 'styled-components';

import { colors, fonts, normalize } from 'config';

type Props = {
  loading: boolean,
  title: React.Element,
  children?: React.Element<*>,
  showButton: boolean,
  buttonTitle: string,
  noItems: boolean,
  noItemsMessage: string,
  buttonAction: Function,
};

const Section = styled.View`
  margin-top: 15;
`;
const Header = styled.View`
  flex: 1;
  flex-direction: 'row';
  justify-content: 'space-between';
  align-items: 'center';
`;
const SectionTitle = styled.Text`
  color: ${colors.black};
  padding: 15px;
  ${fonts.fontPrimaryBold};
`;
const TitleView = styled.View`
  padding: 15px;
`;
const SectionList = styled(List).attrs({
  containerStyle: {
    margin-top: 0;
    border-bottom-color: ${colors.grey},
    border-bottom-width: 1,
  },
})``;
const SectionListItem = styled(ListItem).attrs({
  titleStyle: {
     color: colors.black,
      ${fonts.fontPrimary},
  }
})``;
const LoadingIcon = styled(ActivityIndicator)`
  margin: 20px 0;
`;
const StyledButton = styled(Button)`
  background-color: ${colors.white};
  border-color: ${colors.primaryDark};
  border-width: 1;
  border-radius: 3;
  padding: 5px 10px;
`;

export const SectionList = ({
  loading,
  title,
  showButton,
  buttonTitle,
  buttonAction,
  noItems,
  noItemsMessage,
  children,
}: Props) => {
  let listDisplay;

  if (loading) {
    listDisplay = (
      <LoadingIcon animating={loading}
      />
    );
  } else if (noItems) {
    listDisplay = (
      <SectionListItem title={noItemsMessage} hideChevron />
    );
  } else {
    listDisplay = children;
  }

  let sectionTitle = '';
  if (typeof title === 'string') {
    sectionTitle = <SectionTitle>{title}</SectionTitle>;
  } else {
    sectionTitle = <TitleView>{title}</TitleView>;
  }

  return (
    <Section>
      <Header>
        {sectionTitle}

        {showButton &&
          !loading && (
            <StyledButton
              title={buttonTitle}
              textStyle={fonts.fontPrimarySemiBold}
              fontSize={13}
              color={showButton ? colors.primaryDark : colors.white}
              onPress={buttonAction}
            />
          )}
      </Header>
      <SectionList>{listDisplay}</SectionList>
    </Section>
  );
};

SectionList.defaultProps = {
  children: null,
};
