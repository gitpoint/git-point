import React, { Component } from 'react';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import { Trans } from '@lingui/react';

import { ViewContainer } from 'components';
import { colors, fonts, normalize } from 'config';

import { v3 } from 'api';

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

    return (
      <ViewContainer>
        <ScrollView>
          <Container>
            <Title>
              <Trans>Last updated: July 15, 2017</Trans>
            </Title>
            <Section>
              <StyledText>
                <Trans>
                  We're glad you decided to use GitPoint. This Privacy Policy is
                  here to inform you about what we do — and do not do — with our
                  user's data.
                </Trans>
              </StyledText>
            </Section>
            <Section>
              <SectionTitle>
                <Trans>USER DATA</Trans>
              </SectionTitle>

              <StyledText>
                <Trans>
                  We do not do anything with your GitHub information. After
                  authenticating, the user's OAuth token is persisted directly
                  on their device storage. It is not possible for us to retrieve
                  that information. We never view a user's access token nor
                  store it whatsoever.
                </Trans>
              </StyledText>

              <StyledText>
                <Trans>
                  This means that in no way, shape or form do we ever view, use
                  or share a user's GitHub data. If private data ever becomes
                  visible at any point we will not record or view it. If it
                  happens to be accidentally recorded, we will delete it
                  immediately using secure erase methods. Again, we've set up
                  authentication specifically so that this never happens.
                </Trans>
              </StyledText>
            </Section>
            <Section>
              <SectionTitle>
                <Trans>ANALYTICS INFORMATION</Trans>
              </SectionTitle>

              <StyledText>
                <Trans>
                  We currently use Google Analytics and iTunes App Analytics to
                  help us measure traffic and usage trends for the GitPoint.
                  These tools collect information sent by your device including
                  device and platform version, region and referrer. This
                  information cannot reasonably be used to identify any
                  particular individual user and no personal information is
                  extracted.
                </Trans>
              </StyledText>

              <StyledText>
                <Trans>
                  If we happen to include another third party platform to
                  collect stack traces, error logs or more analytics
                  information, we'll make sure that user data remains anonymized
                  and encrypted.
                </Trans>
              </StyledText>
            </Section>

            <Section>
              <SectionTitle>
                <Trans>OPEN SOURCE</Trans>
              </SectionTitle>

              <StyledText>
                <Trans>
                  GitPoint is open source and the history of contributions to
                  the platform will always be visible to the public.
                </Trans>
              </StyledText>

              <StyledText>
                <Trans>
                  With each contribution to the app, code review is always
                  performed to prevent anybody from including malicious code of
                  any kind.
                </Trans>
              </StyledText>
            </Section>
            <Section>
              <SectionTitle>
                <Trans>CONTACT</Trans>
              </SectionTitle>

              <StyledText>
                <Trans>
                  Thank you for reading our Privacy Policy. We hope you enjoy
                  using GitPoint as much as we enjoyed building it.
                </Trans>
              </StyledText>

              <StyledText>
                <Trans>
                  If you have any questions about this Privacy Policy or
                  GitPoint in general, please file an issue in the{' '}
                  <Link
                    onPress={() =>
                      navigation.navigate('Repository', {
                        repositoryUrl: `${v3.root}/repos/gitpoint/git-point`,
                      })
                    }
                  >
                    <Trans>GitPoint repository</Trans>
                  </Link>
                </Trans>
              </StyledText>
            </Section>
          </Container>
        </ScrollView>
      </ViewContainer>
    );
  }
}
