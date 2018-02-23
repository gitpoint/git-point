import React from 'react';
import { ActivityIndicator } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import styled from 'styled-components';

import { colors, fonts } from 'config';

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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const SectionTitle = styled.Text`
  color: ${colors.black};
  padding: 15px;
  ${fonts.fontPrimaryBold};
`;
const TitleView = styled.View`
  padding: 15px;
`;
const StyledList = styled(List).attrs({
  containerStyle: {
    marginTop: 0,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
})``;
const StyledListItem = styled(ListItem).attrs({
  titleStyle: {
    color: colors.black,
    ...fonts.fontPrimary,
  },
})``;
const LoadingIcon = styled(ActivityIndicator)`
  margin: 20px 0;
`;
const StyledButton = styled(Button).attrs({
  textStyle: {
    ...fonts.fontPrimaryBold,
  },
  fontSize: 13,
  color: colors.primaryDark,
  buttonStyle: {
    backgroundColor: colors.white,
    borderColor: colors.primaryDark,
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
})``;

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
    listDisplay = <LoadingIcon animating={loading} />;
  } else if (noItems) {
    listDisplay = <StyledListItem title={noItemsMessage} hideChevron />;
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
            <StyledButton title={buttonTitle} onPress={buttonAction} />
          )}
      </Header>
      <StyledList>{listDisplay}</StyledList>
    </Section>
  );
};

SectionList.defaultProps = {
  children: null,
};
