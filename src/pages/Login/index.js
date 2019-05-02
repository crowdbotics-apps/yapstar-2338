import React from 'react';
import {
  View,
  Image,
  NativeModules,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { AuthController } from 'app/services';
import { AppContext, Button } from 'app/components';
import { alert } from 'app/utils/Alert';
import { GOOGLE_AUTH, TwitterKeys } from '../../constant';
import Authentication from '../../services/Authentication';
import styles from './style';

const IMAGE_LOGO = require('app/assets/images/app_logo.png');
const IMAGE_BACKGROUND = require('app/assets/images/background.png');
const ICON_FB = require('app/assets/images/facebook.png');
const ICON_TW = require('app/assets/images/twitter.png');
const ICON_GL = require('app/assets/images/google.png');

const { RNTwitterSignIn } = NativeModules;
const { TwitterAuthProvider } = firebase.auth;

GoogleSignin.configure();
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  goToSignUp = () => {
    this.props.navigation.navigate('signup');
  };

  facebookLogin = async () => {
    try {
      await this.context.showLoading();

      const result = await LoginManager.logInWithReadPermissions([
        'public_profile',
        'email'
      ]);

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        console.log('User cancelled request');
      }

      console.log(
        `Login success with permissions: ${result.grantedPermissions.toString()}`
      );

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        alert('Something went wrong obtaining the users access token');
      }

      const credential = await firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      return this.nextStep(credential);
    } catch (e) {
      await this.context.hideLoading();
      console.error(e);
    }
  };

  twitterLogin = () => {
    this.context.showLoading();

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
        return this.nextStep(credential);
      })
      .catch((error) => {
        this.context.hideLoading();
        console.log(error);
      });
  };

  async googleLogin() {
    try {
      await this.context.showLoading();
      await GoogleSignin.configure(GOOGLE_AUTH);

      const data = await GoogleSignin.signIn();

      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );

      return this.nextStep(credential);
    } catch (e) {
      this.context.hideLoading();
      console.error(e);
    }
  }

  nextStep = async (credential) => {
    const firebaseUserCredential = await firebase
      .auth()
      .signInWithCredential(credential);

    const user = firebaseUserCredential.user._user;

    console.log(user);
    await this.setState({
      uid: user.uid
    });
    const exist = await Authentication.checkUser(user.uid);
    await this.context.hideLoading();
    if (exist) {
      return this.props.navigation.navigate('main', {
        uid: this.state.uid
      });
    } else {
      alert("You didn't registered. Please register first.");
      return this.props.navigation.navigate('signup');
    }
  };

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
                      <Text style={styles.signup}>Sign Up</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
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
