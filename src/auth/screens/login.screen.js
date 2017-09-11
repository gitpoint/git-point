import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  Image,
  WebView,
  Modal,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AppIntro from 'react-native-app-intro';
import queryString from 'query-string';

import { ViewContainer, LoadingContainer } from 'components';
import { colors, fonts, normalize } from 'config';
import { CLIENT_ID } from 'api';
import { auth } from 'auth';
import { translate } from 'utils';

const stateRandom = Math.random().toString();

const mapStateToProps = state => ({
  language: state.auth.language,
  isLoggingIn: state.auth.isLoggingIn,
  isAuthenticated: state.auth.isAuthenticated,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.transparent,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 30,
    shadowColor: 'transparent',
  },
  buttonText: {
    ...fonts.fontPrimaryBold,
    fontSize: normalize(12),
  },
  browserDismiss: {
    flex: 1,
  },
  browserLoader: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#1f2327',
    zIndex: 1,
  },
  browserLoadingLabel: {
    fontSize: normalize(20),
    color: colors.white,
    ...fonts.fontPrimarySemiBold,
    paddingBottom: 20,
  },
  browserSection: {
    flex: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 90,
  },
  miniSection: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#1f2327',
  },
  contentSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  slide1: {
    backgroundColor: colors.lightBlue,
  },
  slide2: {
    backgroundColor: colors.lightPurple,
  },
  slide3: {
    backgroundColor: colors.orange,
  },
  slide4: {
    backgroundColor: colors.darkGreen,
  },
  title: {
    fontSize: normalize(20),
    textAlign: 'center',
    color: colors.white,
    ...fonts.fontPrimarySemiBold,
    marginTop: 45,
    marginBottom: 15,
  },
  message: {
    fontSize: normalize(14),
    textAlign: 'center',
    color: colors.white,
    ...fonts.fontPrimaryLight,
  },
  iconMargin: {
    marginLeft: 20,
  },
});

const mapDispatchToProps = dispatch => ({
  authByDispatch: (code, state, navigation) =>
    dispatch(auth(code, state, navigation)),
});

class Login extends Component {
  props: {
    isAuthenticated: boolean,
    isLoggingIn: boolean,
    language: string,
    authByDispatch: Function,
    navigation: Object,
  };

  constructor() {
    super();

    this.state = {
      code: null,
      modalVisible: false,
      showLoader: true,
      loaderText: translate('auth.login.connectingToGitHub', this.language),
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
    }
  }

  onNavigationStateChange = navState => {
    const url = navState.url;

    this.handleOpenURL({ url });
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
    if (!visible) {
      this.setWebViewVisible(false);
    }
  };

  setWebViewVisible = visible => {
    if (this.state.code === null) {
      this.setState({ showLoader: !visible });
    }
  };

  handleOpenURL = ({ url }) => {
    if (url && url.substring(0, 11) === 'gitpoint://') {
      const [, queryStringFromUrl] = url.match(/\?(.*)/);
      const { state, code } = queryString.parse(queryStringFromUrl);
      const { authByDispatch, navigation } = this.props;

      if (stateRandom === state) {
        this.setState({
          code,
          showLoader: true,
          loaderText: translate('auth.login.preparingGitPoint', this.language),
        });

        authByDispatch(code, state, navigation);
      }
    }
  };

  render() {
    const { language, isLoggingIn, isAuthenticated } = this.props;

    return (
      <ViewContainer barColor="light">
        {!isAuthenticated &&
          this.state.asyncStorageChecked &&
          <View style={styles.container}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              style={styles.container}
            >
              <View style={styles.modalContainer}>
                <View style={styles.browserSection && { flex: 4 }}>
                  {this.state.showLoader
                    ? <View style={styles.browserLoader}>
                        <Text style={styles.browserLoadingLabel}>
                          {this.state.loaderText}
                        </Text>
                        <ActivityIndicator color="#ffffff" size="large" />
                      </View>
                    : null}
                  <WebView
                    style={{ flex: 1, zIndex: 0 }}
                    source={{
                      uri: `https://github.com/login/oauth/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=gitpoint://welcome&scope=user%20repo&state=${stateRandom}`,
                    }}
                    onLoadEnd={() => this.setWebViewVisible(true)}
                    onNavigationStateChange={e =>
                      this.onNavigationStateChange(e)}
                  />
                </View>
                <View style={styles.miniSection}>
                  <Button
                    title={translate('auth.login.cancel', language)}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    onPress={() =>
                      this.setModalVisible(!this.state.modalVisible)}
                  />
                </View>
              </View>
            </Modal>
            <View style={styles.miniSection}>
              <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
              />
            </View>

            <View style={styles.contentSection}>
              <AppIntro
                activeDotColor={colors.white}
                showSkipButton={false}
                showDoneButton={false}
              >
                <View style={[styles.slide, styles.slide1]}>
                  <Image
                    style={styles.logo}
                    source={require('../../assets/logo.png')}
                  />
                  <Text style={styles.title}>
                    {translate('auth.login.welcomeTitle', language)}
                  </Text>
                  <Text style={styles.message}>
                    {translate('auth.login.welcomeMessage', language)}
                  </Text>
                </View>

                <View style={[styles.slide, styles.slide2]}>
                  <Icon
                    style={styles.icon}
                    color={colors.white}
                    size={85}
                    name="bell"
                    type="octicon"
                  />
                  <Text style={styles.title}>
                    {translate('auth.login.notificationsTitle', language)}
                  </Text>
                  <Text style={styles.message}>
                    {translate('auth.login.notificationsMessage', language)}
                  </Text>
                </View>

                <View style={[styles.slide, styles.slide3]}>
                  <Icon
                    containerStyle={styles.iconMargin}
                    style={styles.icon}
                    color={colors.white}
                    size={85}
                    name="repo"
                    type="octicon"
                  />
                  <Text style={styles.title}>
                    {translate('auth.login.reposTitle', language)}
                  </Text>
                  <Text style={styles.message}>
                    {translate('auth.login.reposMessage', language)}
                  </Text>
                </View>

                <View style={[styles.slide, styles.slide4]}>
                  <Icon
                    containerStyle={styles.iconMargin}
                    style={styles.icon}
                    color={colors.white}
                    size={85}
                    name="git-pull-request"
                    type="octicon"
                  />
                  <Text style={styles.title}>
                    {translate('auth.login.issuesTitle', language)}
                  </Text>
                  <Text style={styles.message}>
                    {translate('auth.login.issuesMessage', language)}
                  </Text>
                </View>
              </AppIntro>
            </View>

            <View style={styles.miniSection}>
              <Button
                raised
                title={translate('auth.login.signInButton', language)}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                onPress={() => this.setModalVisible(true)}
              />
            </View>
          </View>}

        {isAuthenticated && <LoadingContainer animating={isLoggingIn} center />}
      </ViewContainer>
    );
  }
}

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);
