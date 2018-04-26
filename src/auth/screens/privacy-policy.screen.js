import React, { Component } from 'react';
import styled from 'styled-components';
import { ScrollView } from 'react-native';

import { ViewContainer } from 'components';
import { t } from 'utils';
import { colors, fonts, normalize } from 'config';

const Container = styled.View`
  flex: 1;
  padding: 15px;
`;

const Title = styled.Text`
  font-size: ${normalize(14)};
  color: ${colors.primaryDark};
  ${fonts.fontPrimarySemiBold};
  margin-bottom: 15;
`;

const Section = styled.View`
  border-top-color: ${colors.greyLight};
  border-top-width: 3;
  padding-vertical: 15;
`;

const SectionTitle = styled.Text`
  font-size: ${normalize(12)};
  color: ${colors.primaryDark};
  ${fonts.fontPrimaryBold};
  margin-bottom: 15;
`;

const StyledText = styled.Text`
  font-size: ${normalize(12)};
  color: ${colors.primaryDark};
  ${fonts.fontPrimary};
  margin-bottom: 15;
`;

const Link = styled.Text`
  ${fonts.fontPrimarySemiBold};
`;

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
          <Container>
            <Title>{t('Last updated: July 15, 2017', locale)}</Title>

            <Section>
              <StyledText>
                {t(
                  "We're glad you decided to use GitPoint. This Privacy Policy is here to inform you about what we do \u2014 and do not do \u2014 with our user's data.",
                  locale
                )}
              </StyledText>
            </Section>

            <Section>
              <SectionTitle>{t('USER DATA', locale)}</SectionTitle>

              <StyledText>
                {t(
                  "We do not do anything with your GitHub information. After authenticating, the user's OAuth token is persisted directly on their device storage. It is not possible for us to retrieve that information. We never view a user's access token nor store it whatsoever.",
                  locale
                )}
              </StyledText>

              <StyledText>
                {t(
                  "This means that in no way, shape or form do we ever view, use or share a user's GitHub data. If private data ever becomes visible at any point we will not record or view it. If it happens to be accidentally recorded, we will delete it immediately using secure erase methods. Again, we've set up authentication specifically so that this never happens.",
                  locale
                )}
              </StyledText>
            </Section>

            <Section>
              <SectionTitle>{t('ANALYTICS INFORMATION', locale)}</SectionTitle>

              <StyledText>
                {t(
                  'We currently use Google Analytics and iTunes App Analytics to help us measure traffic and usage trends for the GitPoint. These tools collect information sent by your device including device and platform version, region and referrer. This information cannot reasonably be used to identify any particular individual user and no personal information is extracted.',
                  locale
                )}
              </StyledText>

              <StyledText>
                {t(
                  "If we happen to include another third party platform to collect stack traces, error logs or more analytics information, we'll make sure that user data remains anonymized and encrypted.",
                  locale
                )}
              </StyledText>
            </Section>

            <Section>
              <SectionTitle>{t('OPEN SOURCE', locale)}</SectionTitle>

              <StyledText>
                {t(
                  'GitPoint is open source and the history of contributions to the platform will always be visible to the public.',
                  locale
                )}
              </StyledText>

              <StyledText>
                {t(
                  'With each contribution to the app, code review is always performed to prevent anybody from including malicious code of any kind.',
                  locale
                )}
              </StyledText>
            </Section>

            <Section>
              <SectionTitle>{t('CONTACT', locale)}</SectionTitle>

              <StyledText>
                {t(
                  'Thank you for reading our Privacy Policy. We hope you enjoy using GitPoint as much as we enjoyed building it.',
                  locale
                )}
              </StyledText>

              <StyledText>
                {t(
                  'If you have any questions about this Privacy Policy or GitPoint in general, please file an issue in the',
                  locale
                )}{' '}
                <Link
                  onPress={() =>
                    navigation.navigate('Repository', {
                      repoId: 'gitpoint/git-point',
                    })
                  }
                >
                  {t('GitPoint repository', locale)}
                </Link>
              </StyledText>
            </Section>
          </Container>
        </ScrollView>
      </ViewContainer>
    );
  }
}
