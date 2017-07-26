import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import { ViewContainer } from 'components';
import { colors, fonts, normalize } from 'config';

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
    ...fonts.fontPrimarySemiBold,
    marginBottom: 15,
  },
  text: {
    fontSize: normalize(11),
    color: colors.primaryDark,
    ...fonts.fontPrimaryLight,
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

    return (
      <ViewContainer>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Last updated: July 15, 2017</Text>

            <View style={styles.section}>
              <Text style={styles.text}>
                We&apos;re glad you decided to use GitPoint. This Privacy Policy
                is here to inform you about what we do — and do not do — with
                our user&apos;s data.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>USER DATA</Text>

              <Text style={styles.text}>
                We do not do anything with your GitHub information. After
                authenticating, the user&apos;s OAuth token is persisted
                directly on their device storage. It is not possible for us to
                retrieve that information. We never view a user&apos;s access
                token nor store it whatsoever.
              </Text>

              <Text style={styles.text}>
                This means that in no way, shape or form do we ever view, use or
                share a user&apos;s GitHub data. If private data ever becomes
                visible at any point we will not record or view it. If it
                happens to be accidentally recorded, we will delete it
                immediately using secure erase methods. Again, we&apos;ve set up
                authentication specifically so that this never happens.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ANALYTICS INFORMATION</Text>

              <Text style={styles.text}>
                We currently use Google Analytics and iTunes App Analytics to
                help us measure traffic and usage trends for the GitPoint. These
                tools collect information sent by your device including device
                and platform version, region and referrer. This information
                cannot reasonably be used to identify any particular individual
                user and no personal information is extracted.
              </Text>

              <Text style={styles.text}>
                If we happen to include another third party platform to collect
                stack traces, error logs or more analytics information,
                we&apos;ll make sure that user data remains anonymized and
                encrypted.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>OPEN SOURCE</Text>

              <Text style={styles.text}>
                GitPoint is open source and the history of contributions to the
                platform will always be visible to the public.
              </Text>

              <Text style={styles.text}>
                With each contribution to the app, code review is always
                performed to prevent anybody from including malicious code of
                any kind.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>CONTACT</Text>

              <Text style={styles.text}>
                Thank you for reading our Privacy Policy. We hope you enjoy
                using GitPoint as much as we enjoyed building it.
              </Text>

              <Text style={styles.text}>
                If you have any questions about this Privacy Policy or GitPoint
                in general, please file an issue in the{' '}
                <Text
                  style={styles.link}
                  onPress={() =>
                    navigation.navigate('Repository', {
                      repositoryUrl:
                        'https://api.github.com/repos/gitpoint/git-point',
                    })}
                >
                  GitPoint repository.
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </ViewContainer>
    );
  }
}
