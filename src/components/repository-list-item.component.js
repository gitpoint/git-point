import React from 'react';
import styled from 'styled-components';
import { ListItem, Icon } from 'react-native-elements';

import { emojifyText, abbreviateNumber } from 'utils';
import { colors, languageColors, fonts, normalize } from 'config';

type Props = {
  repository: Object,
  showFullName: boolean,
  navigation: Object,
};

const ListItemWrapper = styled.View`
  margin-top: 5;
  margin-bottom: 5;
  margin-left: 5;
`;

const RepoContainer = styled.View`
  justify-content: center;
  flex: 1;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ColoredText = styled.Text`
  color: ${colors.primaryDark};
`;

const TitleText = ColoredText.extend`
  ${fonts.fontPrimarySemiBold};
`;

const PrivateIconContainer = styled.View`
  margin-left: 6;
`;

const DescriptionText = ColoredText.extend`
  ${fonts.fontPrimaryLight};
`;

const ExtraInfoWrapper = styled.View`
  flex-direction: row;
  flex: 1;
  padding-top: 5;
`;

const ExtraInfoText = styled.Text`
  color: ${colors.greyDark};
  padding-left: 3;
  padding-top: 2;
  margin-right: 15;
  ${fonts.fontPrimary};
  font-size: ${normalize(10)};
`;

const ExtraInfoForksText = ExtraInfoText.extend`
  padding-left: 0;
  margin-right: 13;
`;

const renderTitle = (repository, showFullName) => (
  <ListItemWrapper>
    <RepoContainer>
      <TitleWrapper>
        <TitleText>
          {showFullName ? repository.full_name : repository.name}
        </TitleText>
        {repository.private && (
          <PrivateIconContainer>
            <Icon
              size={16}
              name="lock"
              type="octicon"
              color={colors.greyDarkest}
            />
          </PrivateIconContainer>
        )}
      </TitleWrapper>
      <DescriptionText>{emojifyText(repository.description)}</DescriptionText>
    </RepoContainer>
    <ExtraInfoWrapper>
      <Icon name="star" type="octicon" size={15} color={colors.greyDark} />

      <ExtraInfoText>
        {abbreviateNumber(repository.stargazers_count)}
      </ExtraInfoText>

      <Icon
        name="repo-forked"
        type="octicon"
        size={15}
        color={colors.greyDark}
      />

      <ExtraInfoForksText>
        {abbreviateNumber(repository.forks_count)}
      </ExtraInfoForksText>

      {repository.language !== null && (
        <Icon
          name="fiber-manual-record"
          size={15}
          color={languageColors[repository.language]}
        />
      )}

      <ExtraInfoText>{repository.language}</ExtraInfoText>
    </ExtraInfoWrapper>
  </ListItemWrapper>
);

const Repository = styled(ListItem).attrs({
  titleStyle: {
    color: colors.primaryDark,
    fontFamily: fonts.fontPrimarySemiBold.fontFamily,
  },
  underlayColor: colors.greyLight,
  containerStyle: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
})``;

export const RepositoryListItem = ({
  repository,
  showFullName,
  navigation,
}: Props) => (
  <Repository
    key={repository.id}
    title={renderTitle(repository, showFullName)}
    rightIcon={{
      name: repository.fork ? 'repo-forked' : 'repo',
      color: colors.grey,
      type: 'octicon',
    }}
    onPress={() =>
      navigation.navigate('Repository', { repoId: repository.full_name })
    }
  />
);

RepositoryListItem.defaultProps = {
  showFullName: true,
};
