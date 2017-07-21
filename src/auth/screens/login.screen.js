import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Dimensions,
  Linking,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import { Button } from 'react-native-elements';
import SafariView from 'react-native-safari-view';
import queryString from 'query-string';

import { ViewContainer, LoadingContainer } from 'components';
import { fonts, normalize } from 'config';
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
    backgroundColor: 'rgba(105,105,105,0.8)',
    borderRadius: 5,
    paddingVertical: 15,
    width: window.width - 30,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 35,
    shadowColor: 'transparent',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  buttonText: {
    ...fonts.fontPrimaryBold,
    fontSize: normalize(16),
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
          <View>
            <ImageBackground
              style={styles.imageContainer}
              imageStyle={styles.imageBackground}
              source={require('../../assets/login-background.png')}
            >
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require('../../assets/logo.png')}
                />
              </View>
            </ImageBackground>

            <Button
              raised
              title="Sign In"
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              onPress={() => this.signIn()}
            />
          </View>}

        {isAuthenticated && <LoadingContainer animating={isLoggingIn} center />}
      </ViewContainer>
    );
  }
}

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);
