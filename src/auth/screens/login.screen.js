import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Linking, View, StyleSheet, Text, Platform, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import SafariView from 'react-native-safari-view';
import Swiper from 'react-native-swiper';
import queryString from 'query-string';

import { ViewContainer, LoadingContainer } from 'components';
import { colors, fonts, normalize } from 'config';
import { CLIENT_ID } from 'api';
import { auth } from 'auth';
import { openURLInView } from 'utils';

const stateRandom = Math.random().toString();

const mapStateToProps = state => ({
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
  logo: {
    width: 90,
    height: 90,
  },
  miniSection: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
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
  auth: (code, state) => dispatch(auth(code, state)),
});

class Login extends Component {
  props: {
    isAuthenticated: boolean,
    isLoggingIn: boolean,
    auth: Function,
    navigation: Object,
  };

  constructor() {
    super();

    this.state = {
      code: null,
      asyncStorageChecked: false,
    };
  }

  // Set up Linking
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.navigation.navigate('Main');
    } else {
      // FIXME
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ asyncStorageChecked: true });

      Linking.addEventListener('url', this.handleOpenURL);
      Linking.getInitialURL().then(url => {
        if (url) {
          this.handleOpenURL({ url });
        }
      });
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = ({ url }) => {
    const [, queryStringFromUrl] = url.match(/\?(.*)/);
    const { state, code } = queryString.parse(queryStringFromUrl);

    if (stateRandom === state) {
      this.setState({ code });

      this.props.auth(code, state);
    }

    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  signIn = () =>
    openURLInView(
      `https://github.com/login/oauth/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=gitpoint://welcome&scope=user%20repo&state=${stateRandom}`
    );

  render() {
    const { isLoggingIn, isAuthenticated } = this.props;

    return (
      <ViewContainer barColor="light">
        {!isAuthenticated &&
          this.state.asyncStorageChecked &&
          <View style={styles.container}>
            <View style={styles.miniSection}>
              <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
              />
            </View>

            <View style={styles.contentSection}>
              <Swiper activeDotColor={colors.white}>
                <View style={[styles.slide, styles.slide1]}>
                  <Image
                    style={styles.logo}
                    source={require('../../assets/logo.png')}
                  />
                  <Text style={styles.title}>Welcome to GitPoint</Text>
                  <Text style={styles.message}>
                    The most feature-rich GitHub client that is 100% free
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
                  <Text style={styles.title}>Control notifications</Text>
                  <Text style={styles.message}>
                    View and control all of your unread and participating
                    notifications
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
                  <Text style={styles.title}>Repositories and Users</Text>
                  <Text style={styles.message}>
                    Easily obtain repository, user and organization information
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
                  <Text style={styles.title}>Issues and Pull Requests</Text>
                  <Text style={styles.message}>
                    Communicate on conversations, merge pull requests and more
                  </Text>
                </View>
              </Swiper>
            </View>

            <View style={styles.miniSection}>
              <Button
                raised
                title="SIGN IN"
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                onPress={() => this.signIn()}
              />
            </View>
          </View>}

        {isAuthenticated && <LoadingContainer animating={isLoggingIn} center />}
      </ViewContainer>
    );
  }
}

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);
