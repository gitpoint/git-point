import React, { Component } from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

import { ViewContainer } from 'components';
import { translate } from 'utils';
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
    const { locale } = navigation.state.params.locale;

    return (
      <ViewContainer>
        <ScrollView>
          <Container>
            <Title>
              {translate('auth.privacyPolicy.effectiveDate', locale)}
            </Title>

            <Section>
              <StyledText>
                {translate('auth.privacyPolicy.introduction', locale)}
              </StyledText>
            </Section>

            <Section>
              <SectionTitle>
                {translate('auth.privacyPolicy.userDataTitle', locale)}
              </SectionTitle>

              <StyledText>
                {translate('auth.privacyPolicy.userData1', locale)}
              </StyledText>

              <StyledText>
                {translate('auth.privacyPolicy.userData2', locale)}
              </StyledText>
            </Section>

            <Section>
              <SectionTitle>
                {translate('auth.privacyPolicy.analyticsInfoTitle', locale)}
              </SectionTitle>

              <StyledText>
                {translate('auth.privacyPolicy.analyticsInfo1', locale)}
              </StyledText>

              <StyledText>
                {translate('auth.privacyPolicy.analyticsInfo2', locale)}
              </StyledText>
            </Section>

            <Section>
              <SectionTitle>
                {translate('auth.privacyPolicy.openSourceTitle', locale)}
              </SectionTitle>

              <StyledText>
                {translate('auth.privacyPolicy.openSource1', locale)}
              </StyledText>

              <StyledText>
                {translate('auth.privacyPolicy.openSource2', locale)}
              </StyledText>
            </Section>

            <Section>
              <SectionTitle>
                {translate('auth.privacyPolicy.contactTitle', locale)}
              </SectionTitle>

              <StyledText>
                {translate('auth.privacyPolicy.contact1', locale)}
              </StyledText>

              <StyledText>
                {translate('auth.privacyPolicy.contact2', locale)}{' '}
                <Link
                  onPress={() =>
                    navigation.navigate('Repository', {
                      repositoryUrl: `${v3.root}/repos/gitpoint/git-point`,
                    })}
                >
                  {translate('auth.privacyPolicy.contactLink', locale)}
                </Link>
              </StyledText>
            </Section>
          </Container>
        </ScrollView>
      </ViewContainer>
    );
  }
}
