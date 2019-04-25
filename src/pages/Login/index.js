import React from 'react';
import {
  View,
  Image,
  NativeModules,
  Text,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import InstagramLogin from 'react-native-instagram-login';
import { AuthController } from 'app/services';
import { AppContext, Button } from 'app/components';
import { alert } from 'app/utils/Alert';

import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
const IMAGE_LOGO = require('app/assets/images/app_logo.png');
const IMAGE_BACKGROUND = require('app/assets/images/background.png');
const ICON_FB = require('app/assets/images/facebook.png');
const ICON_TW = require('app/assets/images/twitter.png');
const ICON_GL = require('app/assets/images/instagram.png');

const { RNTwitterSignIn } = NativeModules;
const { TwitterAuthProvider } = firebase.auth;

const TwitterKeys = {
  TWITTER_CONSUMER_KEY: 'D4l2twTmZr4031COwB8yJo9cE',
  TWITTER_CONSUMER_SECRET: 'KUqeSgJ9WIv4n4Ah6eC3E04n97goCUV1MEUl2g04DTOSrYEFXU'
};
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  goToSignUp = () => {
    this.props.navigation.navigate('signup');
  };

  goToForgotpswd = () => {
    this.props.navigation.navigate('forgotpassword');
  };

  facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions([
        'public_profile',
        'email'
      ]);

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        throw new Error('User cancelled request');
      }

      console.log(
        `Login success with permissions: ${result.grantedPermissions.toString()}`
      );

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        throw new Error(
          'Something went wrong obtaining the users access token'
        );
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));

      this.props.navigation.navigate('main');
    } catch (e) {
      console.error(e);
    }
  };

  twitterLogin = () => {
    console.log('twitter login');
    RNTwitterSignIn.init(
      TwitterKeys.TWITTER_CONSUMER_KEY,
      TwitterKeys.TWITTER_CONSUMER_SECRET
    );

    RNTwitterSignIn.logIn()
      .then((loginData) => {
        const { authToken, authTokenSecret } = loginData;
        if (authToken && authTokenSecret) {
          this.setState({
            isLoggedIn: true
          });
          return TwitterAuthProvider.credential(authToken, authTokenSecret);
        }
      })
      .then((credential) => {
        console.log('firebase auth credential', credential);
        firebase.auth().signInWithCredential(credential);
        return this.props.navigation.navigate('main');
      })
      // .then((firebaseUserCredential) => {
      //   console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));
      //   // this.props.navigation.navigate('main');
      // })
      .catch((error) => {
        console.log(error);
      });
  };

  googleLogin() {}

  render() {
    return (
      <ImageBackground source={IMAGE_BACKGROUND} style={styles.background}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <SafeAreaView style={styles.container}>
            <View style={styles.container}>
              <View style={styles.content}>
                <Image
                  source={IMAGE_LOGO}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.content}>
                <Text style={styles.desc}>
                  Sign In with your social media acoount
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => this.facebookLogin()}
                    style={styles.button}
                  >
                    <Image
                      source={ICON_FB}
                      style={styles.btnImg}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.twitterLogin()}
                    style={styles.button}
                  >
                    <Image
                      source={ICON_TW}
                      style={styles.btnImg}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.googleLogin()}
                    style={styles.button}
                  >
                    <Image
                      source={ICON_GL}
                      style={styles.btnImg}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.signupContainer}>
                  <TouchableOpacity onPress={() => this.goToSignUp()}>
                    <Text style={styles.description}>
                      Do not have an account?{' '}
                      <Text style={styles.signup}>Sign up</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <InstagramLogin
                ref={(ref) => (this.instagramLogin = ref)}
                clientId="5d40831591bc467d835d3bfa61884cf4"
                redirectUrl="http://bolthill.com"
                scopes={['public_content', 'follower_list']}
                onLoginSuccess={(token) => this.setState({ token })}
                onLoginFailure={(data) => console.log(data)}
              /> */}
            </View>
          </SafeAreaView>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}
LoginScreen.contextType = AppContext;

LoginScreen.propTypes = {
  navigation: PropTypes.object
};

export default LoginScreen;
