import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Communications from 'react-native-communications';

import { SectionList } from 'components';
import { colors, fonts } from 'config';
import { translate } from 'utils';

type Props = {
  entity: Object,
  orgs: Array,
  language: string,
  navigation: Object,
};

const styles = StyleSheet.create({
  badge: {
    padding: 12,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 20,
  },
  mergedIssue: {
    backgroundColor: colors.purple,
  },
  openIssue: {
    backgroundColor: colors.green,
  },
  closedIssue: {
    backgroundColor: colors.red,
  },
  listTitle: {
    color: colors.black,
    ...fonts.fontPrimary,
  },
  listSubTitle: {
    color: colors.greyDark,
    ...fonts.fontPrimary,
  },
});

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
  orgs.some(org => org.login === getCompanyFormatted(company));

const navigateToCompany = (company, orgs, navigation) => {
  if (companyInOrgs(company, orgs)) {
    navigation.navigate('Organization', {
      organization: orgs.find(
        org => org.login === getCompanyFormatted(company)
      ),
    });
  }
};

export const EntityInfo = ({ entity, orgs, language, navigation }: Props) => {
  return (
    <SectionList title={translate('common.info', language)}>
      {!!entity.company &&
        entity.company !== '' &&
        <ListItem
          title={translate('common.company', language)}
          titleStyle={styles.listTitle}
          leftIcon={{
            name: 'organization',
            color: colors.grey,
            type: 'octicon',
          }}
          subtitle={entity.company}
          subtitleStyle={styles.listSubTitle}
          onPress={() => navigateToCompany(entity.company, orgs, navigation)}
          underlayColor={
            companyInOrgs(entity.company, orgs) ? colors.greyLight : null
          }
          hideChevron={!companyInOrgs(entity.company, orgs)}
        />}

      {!!entity.location &&
        entity.location !== '' &&
        <ListItem
          title={translate('common.location', language)}
          titleStyle={styles.listTitle}
          leftIcon={{
            name: 'location',
            color: colors.grey,
            type: 'octicon',
          }}
          subtitle={entity.location}
          subtitleStyle={styles.listSubTitle}
          onPress={() => Communications.web(getLocationLink(entity.location))}
          underlayColor={colors.greyLight}
        />}

      {!!entity.email &&
        entity.email !== '' &&
        <ListItem
          title={translate('common.email', language)}
          titleStyle={styles.listTitle}
          leftIcon={{
            name: 'mail',
            color: colors.grey,
            type: 'octicon',
          }}
          subtitle={entity.email}
          subtitleStyle={styles.listSubTitle}
          onPress={() =>
            Communications.email([entity.email], null, null, 'Hi!', '')}
          underlayColor={colors.greyLight}
        />}

      {!!entity.blog &&
        entity.blog !== '' &&
        <ListItem
          title={translate('common.website', language)}
          titleStyle={styles.listTitle}
          leftIcon={{
            name: 'link',
            color: colors.grey,
            type: 'octicon',
          }}
          subtitle={entity.blog}
          subtitleStyle={styles.listSubTitle}
          onPress={() => Communications.web(getBlogLink(entity.blog))}
          underlayColor={colors.greyLight}
        />}
    </SectionList>
  );
};
