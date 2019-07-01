import React from 'react'
import { 
  SafeAreaView, 
  StyleSheet, 
  Image, 
  View, 
  TouchableOpacity,
  NativeModules,
 } from 'react-native'
import PropTypes from 'prop-types';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { AppContext, Button } from '../components';
import { alert } from '../utils/Alert';
import { GOOGLE_AUTH, TwitterKeys } from '../constant';
import Authentication from '../services/Authentication';
import Orientation from 'react-native-orientation'

const firestore = firebase.firestore()
const { RNTwitterSignIn } = NativeModules;
const { TwitterAuthProvider } = firebase.auth;
const IMAGE_BACKGROUND = require('app/assets/images/signin.png');
const IMAGE_MARK = require('app/assets/images/signin_mark.png');
const IMAGE_GOOGLE = require('app/assets/images/signin_google.png');
const IMAGE_FACEBOOK = require('app/assets/images/signin_facebook.png');
const IMAGE_TWITTER = require('app/assets/images/signin_twitter.png');
const IMAGE_POLICY = require('app/assets/images/signin_policy.png');

GoogleSignin.configure();

export default class SigninScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state ={
      userName: '',
    }
  }

  componentDidMount() {
    Orientation.lockToPortrait();
  }

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
        const { authToken, authTokenSecret, userName } = loginData;
        if (authToken && authTokenSecret && userName) {
          this.setState({
            isLoggedIn: true,
            userName: userName
          });
          return TwitterAuthProvider.credential(authToken, authTokenSecret);
        }
      })
      .then((credential) => {
        return this.nextStep(credential);
      })
      .catch((error) => {
        this.context.hideLoading();
        alert('Please check your internet connection state.')
        console.warn('twitter error:', error);
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
    console.warn(credential)
    const firebaseUserCredential = await firebase
      .auth()
      .signInWithCredential(credential);
    const user = await firebaseUserCredential.user._user;
    console.warn(user)
    const exist = await Authentication.checkUser(user.uid);
    await this.context.hideLoading();
    if (exist) {
      this.props.navigation.navigate('fanStack', {
        'uid': user.uid,
      });
    } else {
      this.props.navigation.navigate('welcome3', {
        'uid': user.uid,
        'displayName': user.displayName,
        'email': user.email,
        'phoneNumber': user.providerData[0].phoneNumber,
        'photoURL': `https://twitter.com/${this.state.userName}/profile_image?size=original`,
        'providerId': user.providerData[0].providerId
      });
    }
  };
  
  onPressPolicy() {
    // this.props.navigation.navigate('welcome3');
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <Image source={IMAGE_BACKGROUND} style={styles.background}/>
        <View style={styles.view_main}>
          <Image source={IMAGE_MARK} style={styles.mark}/>
          <TouchableOpacity>
            <Image source={IMAGE_GOOGLE} style={styles.google}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={IMAGE_FACEBOOK} style={styles.facebook}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.twitterLogin()}>
            <Image source={IMAGE_TWITTER} style={styles.twitter}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onPressPolicy()}>
            <Image source={IMAGE_POLICY} style={styles.policy}/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  background: {
    width: '100%',
    height: undefined,
    position: 'absolute',
    aspectRatio: 750/1624,
  },
  view_main: {
    width: '100%',
    height: '100%',
    alignItems: 'center', 
    justifyContent: 'flex-end', 
  },
  policy: {
    width: '75%',
    height: undefined,
    aspectRatio: 652 / 54,
    marginTop: 20,
    marginBottom: 25,
  },
  twitter: {
    width: '80%',
    height: undefined,
    aspectRatio: 652 / 112,
  },
  facebook: {
    width: '80%',
    height: undefined,
    aspectRatio: 652 / 112,
    marginBottom: 10,
  },
  google: {
    width: '80%',
    height: undefined,
    aspectRatio: 652 / 112,
    marginBottom: 10,
  },
  mark: {
    width: '30%',
    height: undefined,
    aspectRatio: 280 / 236,
    marginBottom: 25,
  },
})
SigninScreen.contextType = AppContext;

SigninScreen.propTypes = {
  navigation: PropTypes.object
};