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
    const { language } = navigation.state.params.language;

    return (
      <ViewContainer>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>
              {translate('auth.privacyPolicy.effectiveDate', language)}
            </Text>

            <View style={styles.section}>
              <Text style={styles.text}>
                {translate('auth.privacyPolicy.introduction', language)}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {translate('auth.privacyPolicy.userDataTitle', language)}
              </Text>

              <Text style={styles.text}>
                {translate('auth.privacyPolicy.userData1', language)}
              </Text>

              <Text style={styles.text}>
                {translate('auth.privacyPolicy.userData2', language)}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {translate('auth.privacyPolicy.analyticsInfoTitle', language)}
              </Text>

              <Text style={styles.text}>
                {translate('auth.privacyPolicy.analyticsInfo1', language)}
              </Text>

              <Text style={styles.text}>
                {translate('auth.privacyPolicy.analyticsInfo2', language)}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {translate('auth.privacyPolicy.openSourceTitle', language)}
              </Text>

              <Text style={styles.text}>
                {translate('auth.privacyPolicy.openSource1', language)}
              </Text>

              <Text style={styles.text}>
                {translate('auth.privacyPolicy.openSource2', language)}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {translate('auth.privacyPolicy.contactTitle', language)}
              </Text>

              <Text style={styles.text}>
                {translate('auth.privacyPolicy.contact1', language)}
              </Text>

              <Text style={styles.text}>
                {translate('auth.privacyPolicy.contact2', language)}{' '}
                <Text
                  style={styles.link}
                  onPress={() =>
                    navigation.navigate('Repository', {
                      repositoryUrl: `${v3.root}/repos/gitpoint/git-point`,
                    })}
                >
                  {translate('auth.privacyPolicy.contactLink', language)}
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </ViewContainer>
    );
  }
}
