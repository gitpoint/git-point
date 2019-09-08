/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActivityIndicator, Linking, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { Button, Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import queryString from 'query-string';
import CookieManager from 'react-native-cookies';
import { SafeAreaView } from 'react-navigation';

import { ViewContainer, ErrorScreen } from 'components';
import { colors, fonts, normalize } from 'config';
import { CLIENT_ID } from 'api';
import { auth, getUser } from 'auth';
import { openURLInView, t, resetNavigationTo } from 'utils';
import styled from 'styled-components';

let stateRandom = Math.random().toString();

const mapStateToProps = state => ({
  locale: state.auth.locale,
  isLoggingIn: state.auth.isLoggingIn,
  isAuthenticated: state.auth.isAuthenticated,
  hasInitialUser: state.auth.hasInitialUser,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      auth,
      getUser,
    },
    dispatch
  );

const Modal = styled.Modal`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.View`
  flex: 1;
  background-color: ${colors.githubDark}
`;

// https://github.com/facebook/react-native/issues/9090
const StyledSafeAreaView = styled(SafeAreaView).attrs({
  forceInset: Platform.select({
    ios: { top: 'always', bottom: 'never' },
    android: { top: 'never', bottom: 'never' },
  }),
})`
  background-color: ${colors.githubDark};
`;

const Slide = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 50;
`;

const SlideWelcome = Slide.extend`
  background-color: ${colors.lightBlue};
`;

const SlideNotifications = Slide.extend`
  background-color: ${colors.lightPurple};
`;

const SlideReposAndUsers = Slide.extend`
  background-color: ${colors.orange};
`;
const SlideIssuesAndPrs = Slide.extend`
  background-color: ${colors.darkGreen};
`;

const SlideTitle = styled.Text`
  font-size: ${normalize(20)};
  text-align: center;
  color: ${colors.white};
  ${fonts.fontPrimarySemiBold};
  margin-top: 45;
  margin-bottom: 15;
`;

const SlideText = styled.Text`
  font-size: ${normalize(14)};
  text-align: center;
  color: ${colors.white};
  ${fonts.fontPrimaryLight};
`;

const SlideIcon = styled(Icon).attrs({
  size: 85,
  type: 'octicon',
  color: colors.white,
  containerStyle: {
    paddingLeft: 20,
  },
})``;

const GitPointLogo = styled.Image.attrs({
  source: require('../../assets/logo.png'),
})`
  width: 90;
  height: 90;
`;

const SignInContainer = styled.View`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 80;
  justify-content: center;
  align-items: center;
`;

const TroublesLink = styled.Text`
  color: ${colors.greyLight};
  padding-top: 20;
  font-style: italic;
`;

const BrowserLoader = styled.View`
  flex: 1;
  position: absolute;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${colors.githubDark};
`;

const BrowserLoadingLabel = styled.Text`
  font-size: ${normalize(20)};
  color: ${colors.white};
  ${fonts.fontPrimarySemiBold};
  padding-bottom: 20;
`;

const MiniSection = styled.View`
  flex: 1.5;
  justify-content: center;
  align-items: center;
`;

const BrowserSection = styled.View`
  flex: 5;
`;

const BaseButton = styled(Button).attrs({
  buttonStyle: {
    backgroundColor: colors.transparent,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 30,
    shadowColor: colors.transparent,
  },
  textStyle: {
    ...fonts.fontPrimaryBold,
    fontSize: normalize(12),
  },
})``;

const SignInButton = BaseButton.extend.attrs({
  containerViewStyle: {
    backgroundColor: colors.transparent,
  },
})``;

class Login extends Component {
  props: {
    isAuthenticated: boolean,
    isLoggingIn: boolean,
    hasInitialUser: boolean,
    locale: string,
    auth: Function,
    getUser: Function,
    navigation: Object,
  };

  constructor(props) {
    super(props);

    this.state = {
      code: null,
      modalVisible: false,
      cancelDisabled: false,
      showLoader: true,
      loaderText: t('Connecting to GitHub...', props.locale),
      asyncStorageChecked: false,
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.navigation.navigate('Main');
    } else {
      // FIXME
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ asyncStorageChecked: true });

      if (Platform.OS === 'android') {
        Linking.addEventListener('url', this.handleOpenURL);
        Linking.getInitialURL().then(url => {
          if (url) {
            this.handleOpenURL({ url });
          }
        });
      }
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      Linking.removeEventListener('url', this.handleOpenURL);
    }
  }

  onNavigationStateChange = navState => {
    const url = navState.url;

    this.handleOpenURL({ url });
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  toggleCancelButton = (e, disabled) => {
    const url = e.nativeEvent.url;

    if (url === 'https://github.com/session') {
      this.setState({ cancelDisabled: disabled });
    }
  };

  handleOpenURL = ({ url }) => {
    if (url && url.substring(0, 11) === 'gitpoint://') {
      const [, queryStringFromUrl] = url.match(/\?(.*)/);
      const { state, code } = queryString.parse(queryStringFromUrl);
      const { auth, getUser, navigation, locale } = this.props;

      if (stateRandom === state) {
        this.setState({
          code,
          showLoader: true,
          loaderText: t('Preparing GitPoint...', locale),
        });

        stateRandom = Math.random().toString();

        CookieManager.clearAll().then(() => {
          auth(code, state).then(() => {
            getUser().then(() => {
              resetNavigationTo('Main', navigation);
            });
          });
        });
      }
    }
  };

  shouldDisplayIntro() {
    const { isLoggingIn, isAuthenticated } = this.props;

    return !isAuthenticated && !isLoggingIn && this.state.asyncStorageChecked;
  }

  renderLoading() {
    return (
      <BrowserLoader>
        <BrowserLoadingLabel>{this.state.loaderText}</BrowserLoadingLabel>
        <ActivityIndicator color={colors.white} size="large" />
      </BrowserLoader>
    );
  }

  render() {
    const { locale, isLoggingIn, hasInitialUser } = this.props;
    const loginUrl = `https://github.com/login/oauth/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=gitpoint://welcome&scope=user%20repo&state=${stateRandom}`;

    return (
      <ViewContainer>
        {this.shouldDisplayIntro() && (
          <Swiper
            loop={false}
            dotColor="#FFFFFF55"
            activeDotColor={colors.white}
          >
            <SlideWelcome>
              <GitPointLogo />
              <SlideTitle>{t('Welcome to GitPoint', locale)}</SlideTitle>
              <SlideText>
                {t(
                  'One of the most feature-rich GitHub clients that is 100% free',
                  locale
                )}
              </SlideText>
            </SlideWelcome>
            <SlideNotifications>
              <SlideIcon name="bell" />
              <SlideTitle>{t('Control notifications', locale)}</SlideTitle>
              <SlideText>
                {t(
                  'View and control all of your unread and participating notifications',
                  locale
                )}
              </SlideText>
            </SlideNotifications>
            <SlideReposAndUsers>
              <SlideIcon name="repo" />
              <SlideTitle>{t('Repositories and Users', locale)}</SlideTitle>
              <SlideText>
                {t(
                  'Easily obtain repository, user and organization information',
                  locale
                )}
              </SlideText>
            </SlideReposAndUsers>
            <SlideIssuesAndPrs>
              <SlideIcon name="git-pull-request" />
              <SlideTitle>{t('Issues and Pull Requests', locale)}</SlideTitle>
              <SlideText>
                {t(
                  'Communicate on conversations, merge pull requests and more',
                  locale
                )}
              </SlideText>
            </SlideIssuesAndPrs>
          </Swiper>
        )}
        {this.shouldDisplayIntro() && (
          <SignInContainer>
            <SignInButton
              raised
              title={t('SIGN IN', locale)}
              onPress={() => this.setModalVisible(true)}
            />
          </SignInContainer>
        )}
        {this.shouldDisplayIntro() && (
          <Modal
            animationType="slide"
            onRequestClose={() => null}
            visible={this.state.modalVisible}
          >
            <ModalWrapper>
              <StyledSafeAreaView />
              <BrowserSection>
                <WebView
                  source={{
                    uri: loginUrl,
                  }}
                  renderError={() => <ErrorScreen locale={locale} />}
                  onLoadStart={e => this.toggleCancelButton(e, true)}
                  onLoadEnd={e => this.toggleCancelButton(e, false)}
                  onNavigationStateChange={e => this.onNavigationStateChange(e)}
                  renderLoading={() => this.renderLoading()}
                  startInLoadingState
                  javaScriptEnabled
                />
              </BrowserSection>
              <MiniSection>
                <BaseButton
                  title={t('CANCEL', locale)}
                  disabled={this.state.cancelDisabled}
                  onPress={() => this.setModalVisible(!this.state.modalVisible)}
                />
                {Platform.OS === 'android' && (
                  <TroublesLink onPress={() => openURLInView(loginUrl)}>
                    {t("Can't login?", locale)}
                  </TroublesLink>
                )}
              </MiniSection>
            </ModalWrapper>
          </Modal>
        )}
        {isLoggingIn &&
          !hasInitialUser && (
            <BrowserLoader>
              <BrowserLoadingLabel>{this.state.loaderText}</BrowserLoadingLabel>
              <ActivityIndicator
                animating={isLoggingIn}
                color={colors.white}
                size="large"
              />
            </BrowserLoader>
          )}
      </ViewContainer>
    );
  }
}

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);
