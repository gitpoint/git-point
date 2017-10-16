/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  Linking,
  Image,
  WebView,
  Platform,
  Modal,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AppIntro from 'rn-app-intro';
import queryString from 'query-string';

import { ViewContainer } from 'components';
import { colors, fonts, normalize } from 'config';
import { CLIENT_ID } from 'api';
import { auth } from 'auth';
import { translate } from 'utils';

const stateRandom = Math.random().toString();

const mapStateToProps = state => ({
  locale: state.auth.locale,
  isLoggingIn: state.auth.isLoggingIn,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      auth,
    },
    dispatch
  );

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
    backgroundColor: colors.githubDark,
  },
  browserLoadingLabel: {
    fontSize: normalize(20),
    color: colors.white,
    ...fonts.fontPrimarySemiBold,
    paddingBottom: 20,
  },
  browserSection: {
    flex: 5,
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

class Login extends Component {
  props: {
    isAuthenticated: boolean,
    isLoggingIn: boolean,
    locale: string,
    auth: Function,
    navigation: Object,
  };

  constructor() {
    super();

    this.state = {
      code: null,
      modalVisible: false,
      cancelDisabled: false,
      showLoader: true,
      loaderText: translate('auth.login.connectingToGitHub', this.locale),
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
      const { auth, navigation } = this.props;

      if (stateRandom === state) {
        this.setState({
          code,
          showLoader: true,
          loaderText: translate('auth.login.preparingGitPoint', this.locale),
        });

        auth(code, state, navigation);
      }
    }
  };

  renderLoading() {
    return (
      <View style={styles.browserLoader}>
        <Text style={styles.browserLoadingLabel}>{this.state.loaderText}</Text>
        <ActivityIndicator color={colors.white} size="large" />
      </View>
    );
  }

  render() {
    const { locale, isLoggingIn, isAuthenticated } = this.props;

    return (
      <ViewContainer barColor="light">
        {!isAuthenticated &&
          !isLoggingIn &&
          this.state.asyncStorageChecked && (
            <View style={styles.container}>
              <Modal
                animationType="slide"
                onRequestClose={() => null}
                visible={this.state.modalVisible}
                style={styles.container}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.browserSection}>
                    <WebView
                      source={{
                        uri: `https://github.com/login/oauth/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=gitpoint://welcome&scope=user%20repo&state=${stateRandom}`,
                      }}
                      onLoadStart={e => this.toggleCancelButton(e, true)}
                      onLoadEnd={e => this.toggleCancelButton(e, false)}
                      onNavigationStateChange={e =>
                        this.onNavigationStateChange(e)}
                      renderLoading={() => this.renderLoading()}
                      startInLoadingState
                    />
                  </View>
                  <View style={styles.miniSection}>
                    <Button
                      title={translate('auth.login.cancel', locale)}
                      buttonStyle={styles.button}
                      disabled={this.state.cancelDisabled}
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
                      {translate('auth.login.welcomeTitle', locale)}
                    </Text>
                    <Text style={styles.message}>
                      {translate('auth.login.welcomeMessage', locale)}
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
                      {translate('auth.login.notificationsTitle', locale)}
                    </Text>
                    <Text style={styles.message}>
                      {translate('auth.login.notificationsMessage', locale)}
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
                      {translate('auth.login.reposTitle', locale)}
                    </Text>
                    <Text style={styles.message}>
                      {translate('auth.login.reposMessage', locale)}
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
                      {translate('auth.login.issuesTitle', locale)}
                    </Text>
                    <Text style={styles.message}>
                      {translate('auth.login.issuesMessage', locale)}
                    </Text>
                  </View>
                </AppIntro>
              </View>
              <View style={styles.miniSection}>
                <Button
                  raised
                  title={translate('auth.login.signInButton', locale)}
                  buttonStyle={styles.button}
                  textStyle={styles.buttonText}
                  onPress={() => this.setModalVisible(true)}
                />
              </View>
            </View>
          )}
        {isLoggingIn && (
          <View style={styles.browserLoader}>
            <Text style={styles.browserLoadingLabel}>
              {this.state.loaderText}
            </Text>
            <ActivityIndicator
              animating={isLoggingIn}
              color={colors.white}
              size="large"
            />
          </View>
        )}
      </ViewContainer>
    );
  }
}

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);
