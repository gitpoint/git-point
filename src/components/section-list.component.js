import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import styled from 'styled-components/native';

import { colors, fonts } from 'config';

type Props = {
  loading: boolean,
  title: React.Element,
  children?: React.Element<*>,
  showButton: boolean,
  buttonTitle: string,
  noOuterBorders: boolean,
  noItems: boolean,
  noItemsMessage: string,
  buttonAction: Function,
};

const Section = styled.View`
  margin-top: 15px;
`;
const SectionTitle = styled.Text`
  color: ${colors.black};
  padding: 15px;
  ${fonts.fontPrimaryBold};
`;
const StyledTitleView = styled.View`
  padding: 15px;
`;
const LoadingIcon = styled(ActivityIndicator)`
  margin: 20px 0px;
`;
const StyledButton = styled(Button)`
  background-color: ${colors.white};
  border-color: ${colors.primaryDark};
  border-width: 1px;
  border-radius: 3px;
  padding: 5px 10px;
`;
const styles = StyleSheet.create({
  topHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listTitle: {
    color: colors.black,
    ...fonts.fontPrimary,
  },
  list: {
    marginTop: 0,
  },
  noOuterBorders: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});

export const SectionList = ({
  loading,
  title,
  showButton,
  buttonTitle,
  buttonAction,
  noOuterBorders,
  noItems,
  noItemsMessage,
  children,
}: Props) => {
  let listDisplay;

  if (loading) {
    listDisplay = <LoadingIcon animating={loading} />;
  } else if (noItems) {
    listDisplay = (
      <ListItem
        title={noItemsMessage}
        titleStyle={styles.listTitle}
        hideChevron
      />
    );
  } else {
    listDisplay = children;
  }

  let sectionTitle = '';

  if (typeof title === 'string') {
    sectionTitle = <SectionTitle>{title}</SectionTitle>;
  } else {
    sectionTitle = <StyledTitleView>{title}</StyledTitleView>;
  }

  return (
    <Section>
      <View style={styles.topHeader}>
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
      </View>
      <List
        containerStyle={[styles.list, noOuterBorders && styles.noOuterBorders]}
      >
        {listDisplay}
      </List>
    </Section>
  );
};

SectionList.defaultProps = {
  children: null,
};
