import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Dimensions,
  Linking,
  View,
  StyleSheet,
  Text,
  Platform,
  Image,
} from 'react-native';
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
const window = Dimensions.get('window');

const mapStateToProps = state => ({
  isLoggingIn: state.auth.isLoggingIn,
  isAuthenticated: state.auth.isAuthenticated,
});

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: window.height,
    width: window.width,
  },
  imageBackground: {
    height: window.height,
    width: window.width,
  },
  button: {
    backgroundColor: colors.primaryDark,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: 'transparent',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  buttonText: {
    ...fonts.fontPrimaryBold,
    fontSize: normalize(12),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  title: {
    fontSize: normalize(20),
    color: colors.primaryDark,
    ...fonts.fontPrimarySemiBold,
    marginVertical: 15,
  },
  message: {
    fontSize: normalize(14),
    textAlign: 'center',
    color: colors.primaryDark,
    ...fonts.fontPrimaryLight,
    paddingHorizontal: 50,
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
                source={require('../../assets/logo-black.png')}
              />
            </View>

            <View style={styles.contentSection}>
              <Swiper>
                <View style={styles.slide}>
                  <Text style={styles.title}>Welcome to GitPoint</Text>
                  <Text style={styles.message}>
                    The most feature-rich GitHub{' '}
                    {Platform.OS === 'android' ? 'Android' : 'iOS'} client that
                    is 100% free.
                  </Text>
                </View>
                <View style={styles.slide}>
                  <Icon
                    color={colors.blue}
                    size={82}
                    name="bell"
                    type="octicon"
                  />
                  <Text style={styles.title}>Welcome to GitPoint</Text>
                  <Text style={styles.message}>
                    The most feature-rich GitHub{' '}
                    {Platform.OS === 'android' ? 'Android' : 'iOS'} client that
                    is 100% free
                  </Text>
                </View>
                <View style={styles.slide}>
                  <Text style={styles.text}>And simple</Text>
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

// {!isAuthenticated &&
//           this.state.asyncStorageChecked &&
//           <View>
//             <ImageBackground
//               style={styles.imageContainer}
//               imageStyle={styles.imageBackground}
//               source={require('../../assets/login-background.png')}
//             >
//               <View style={styles.logoContainer}>
//                 <Image
//                   style={styles.logo}
//                   source={require('../../assets/logo.png')}
//                 />
//               </View>
//             </ImageBackground>

//             <Button
//               raised
//               title="Sign In"
//               buttonStyle={styles.button}
//               textStyle={styles.buttonText}
//               onPress={() => this.signIn()}
//             />
//           </View>}
