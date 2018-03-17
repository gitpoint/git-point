import React from 'react';
import styled from 'styled-components';
import { ListItem } from 'react-native-elements';
import Communications from 'react-native-communications';

import { SectionList } from 'components';
import { colors, fonts } from 'config';
import { withI18n } from '@lingui/react/cjs/react.development';

type Props = {
  entity: Object,
  orgs: Array,
  i18n: Object,
  navigation: Object,
};

const StyledListItem = styled(ListItem).attrs({
  containerStyle: {
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  titleStyle: {
    color: colors.black,
    ...fonts.fontPrimary,
  },
  subtitleStyle: {
    color: colors.greyDark,
    ...fonts.fontPrimary,
  },
  underlayColor: props => (props.hideChevron ? null : colors.greyLight),
  hideChevron: props => props.hideChevron,
})``;

const getBlogLink = url =>
  url.substr(0, 4) === 'http' ? url : `http://${url}`;

const getLocationLink = location =>
  `https://www.google.com/maps/place/${location.split(' ').join('+')}`;

const getCompanyFormatted = company => {
  const companyFormatted = company.replace(/ /g, '');

  return company.charAt(0) === '@'
    ? companyFormatted.substring(1)
    : companyFormatted;
};

const companyInOrgs = (company, orgs) =>
  orgs.some(
    org =>
      org.login.toLowerCase() === getCompanyFormatted(company).toLowerCase()
  );

const navigateToCompany = (company, orgs, navigation) => {
  if (companyInOrgs(company, orgs)) {
    navigation.navigate('Organization', {
      organization: orgs.find(
        org =>
          org.login.toLowerCase() === getCompanyFormatted(company).toLowerCase()
      ),
    });
  }
};

export const EntityInfo = withI18n()(
  ({ entity, orgs, i18n, navigation }: Props) => {
    const checksKeys = ['company', 'location', 'email', 'blog'];

    if (!checksKeys.filter(key => !!entity[key]).length) {
      return null;
    }

    return (
      <SectionList title={i18n.t`INFO`}>
        {!!entity.company &&
          entity.company !== '' && (
            <StyledListItem
              title={i18n.t`Company`}
              leftIcon={{
                name: 'organization',
                color: colors.grey,
                type: 'octicon',
              }}
              subtitle={entity.company}
              onPress={() =>
                navigateToCompany(entity.company, orgs, navigation)
              }
              hideChevron={!companyInOrgs(entity.company, orgs)}
            />
          )}

        {!!entity.location &&
          entity.location !== '' && (
            <StyledListItem
              title={i18n.t`Location`}
              leftIcon={{
                name: 'location',
                color: colors.grey,
                type: 'octicon',
              }}
              subtitle={entity.location}
              onPress={() =>
                Communications.web(getLocationLink(entity.location))
              }
            />
          )}

        {!!entity.email &&
          entity.email !== '' && (
            <StyledListItem
              title={i18n.t`Email`}
              leftIcon={{
                name: 'mail',
                color: colors.grey,
                type: 'octicon',
              }}
              subtitle={entity.email}
              onPress={() =>
                Communications.email([entity.email], null, null, null, null)
              }
            />
          )}

        {!!entity.blog &&
          entity.blog !== '' && (
            <StyledListItem
              title={i18n.t`Website`}
              leftIcon={{
                name: 'link',
                color: colors.grey,
                type: 'octicon',
              }}
              subtitle={entity.blog}
              onPress={() => Communications.web(getBlogLink(entity.blog))}
            />
          )}
      </SectionList>
    );
  }
);
