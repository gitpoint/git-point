import React, {Component} from 'react';
import {Dimensions, Linking, View, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-elements';

import LoadingContainer from '../components/LoadingContainer';

import colors from '../config/colors';
import {CLIENT_ID} from '../api';

import queryString from 'query-string';
import {connect} from 'react-redux';
import {auth} from '../actions/auth';

const stateRandom = Math.random() + '';
const window = Dimensions.get('window');

const mapStateToProps = state => ({
  isLoggingIn: state.auth.isLoggingIn,
  isAuthenticated: state.auth.isAuthenticated,
  accessToken: state.auth.accessToken,
});

const mapDispatchToProps = dispatch => ({
  auth: (code, state) => dispatch(auth(code, state)),
});

class Login extends Component {
  constructor() {
    super();

    this.state = {
      code: null,
      asyncStorageChecked: false,
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.navigation.navigate('Main');
    } else {
      this.setState({asyncStorageChecked: true});
    }
  }

  githubOauth(client_id, callback) {
    Linking.addEventListener('url', handleUrl);

    function handleUrl(event) {
      var [, query_string] = event.url.match(/\?(.*)/);
      var query = queryString.parse(query_string);
      if (stateRandom === query.state) {
        callback(null, query.code);
      } else {
        callback(new Error('Oauth2 security error'));
      }
      Linking.removeEventListener('url', handleUrl);
    }

    Linking.openURL(
      `https://github.com/login/oauth/authorize\
?response_type=token\
&client_id=${client_id}\
&redirect_uri=gitpoint://welcome\
&scope=user%20repo\
&state=${stateRandom}`
    );
  }

  signIn() {
    this.githubOauth(CLIENT_ID, (err, code) => {
      if (err) {
        console.log(err);
      }
      this.setState({code});

      this.props.auth(code, stateRandom);
    });
  }

  render() {
    const {isLoggingIn, isAuthenticated, accessToken} = this.props;

    return (
      <View>
        {!isAuthenticated &&
          this.state.asyncStorageChecked &&
          <View>
            <Image
              style={styles.image}
              source={require('../images/login-background.png')}
            >
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require('../images/logo.png')}
                />
              </View>
            </Image>

            <Button
              raised
              title="Sign In"
              buttonStyle={styles.buttonSignIn}
              textStyle={{fontWeight: 'bold', fontSize: 18}}
              onPress={() => this.signIn()}
            />
          </View>}

        {isAuthenticated && <LoadingContainer animating={isLoggingIn} center />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    height: window.height,
    width: window.width,
  },
  loadingContainer: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSignIn: {
    backgroundColor: 'rgba(105,105,105,0.8)',
    borderRadius: 5,
    paddingVertical: 15,
    width: window.width - 30,
    position: 'absolute',
    right: 15,
    bottom: 20,
    shadowColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
  title: {
    fontFamily: 'AvenirNext-Bold',
    color: colors.white,
    marginTop: 20,
    width: 160,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    opacity: 0.9,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
