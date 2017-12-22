import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import { ViewContainer } from 'components';
import { translate } from 'utils';
import { colors, fonts, normalize } from 'config';
import { v3 } from 'api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: normalize(14),
    color: colors.primaryDark,
    ...fonts.fontPrimarySemiBold,
    marginBottom: 15,
  },
  section: {
    borderTopColor: colors.greyLight,
    borderTopWidth: 3,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: normalize(12),
    color: colors.primaryDark,
    ...fonts.fontPrimaryBold,
    marginBottom: 15,
  },
  text: {
    fontSize: normalize(12),
    color: colors.primaryDark,
    ...fonts.fontPrimary,
    marginBottom: 15,
  },
  link: {
    ...fonts.fontPrimarySemiBold,
  },
});

export class PrivacyPolicyScreen extends Component {
  props: {
    navigation: Object,
  };

  render() {
    const { navigation } = this.props;
    const { locale } = navigation.state.params.locale;

    return (
      <ViewContainer>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>
              {translate('auth.privacyPolicy.effectiveDate', locale)}
            </Text>

            <View style={styles.section}>
              <Text style={styles.text}>
                {translate('auth.privacyPolicy.introduction', locale)}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {translate('auth.privacyPolicy.userDataTitle', locale)}
              </Text>

              <Text style={styles.text}>
                {translate('auth.privacyPolicy.userData1', locale)}
              </Text>

              <Text style={styles.text}>
                {translate('auth.privacyPolicy.userData2', locale)}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {translate('auth.privacyPolicy.analyticsInfoTitle', locale)}
              </Text>

              <Text style={styles.text}>
                {translate('auth.privacyPolicy.analyticsInfo1', locale)}
              </Text>

              <Text style={styles.text}>
                {translate('auth.privacyPolicy.analyticsInfo2', locale)}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {translate('auth.privacyPolicy.openSourceTitle', locale)}
              </Text>

              <Text style={styles.text}>
                {translate('auth.privacyPolicy.openSource1', locale)}
              </Text>

              <Text style={styles.text}>
                {translate('auth.privacyPolicy.openSource2', locale)}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {translate('auth.privacyPolicy.contactTitle', locale)}
              </Text>

              <Text style={styles.text}>
                {translate('auth.privacyPolicy.contact1', locale)}
              </Text>

              <Text style={styles.text}>
                {translate('auth.privacyPolicy.contact2', locale)}{' '}
                <Text
                  style={styles.link}
                  onPress={() =>
                    navigation.navigate('Repository', {
                      repositoryUrl: `${v3.root}/repos/gitpoint/git-point`,
                    })
                  }
                >
                  {translate('auth.privacyPolicy.contactLink', locale)}
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </ViewContainer>
    );
  }
}
