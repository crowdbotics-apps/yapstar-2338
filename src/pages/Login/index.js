import React from 'react';
import { View, Image, NativeModules, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import InstagramLogin from 'react-native-instagram-login';

import { AuthController } from 'app/services';
import { AppContext, Button } from 'app/components';
import { alert } from 'app/utils/Alert';

import styles from './style';
import LogoIcon from 'app/assets/images/logo.png';

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
        console.log(loginData);
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
        return firebase.auth().signInWithCredential(credential);
      })
      // .then((firebaseUserCredential) => {
      //   console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));
      //   // this.props.navigation.navigate('main');
      // })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <ScrollView>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <View style={styles.container}>
            <Image source={LogoIcon} style={styles.logo} resizeMode="contain" />
            <View style={styles.content}>
              <Button
                containerStyle={styles.loginBtn}
                textStyle={styles.login}
                text="Facebook"
                onPress={this.facebookLogin}
              />
              <Button
                containerStyle={styles.loginBtn}
                textStyle={styles.login}
                text="Twitter"
                onPress={this.twitterLogin}
              />
              <Button
                containerStyle={styles.loginBtn}
                textStyle={styles.login}
                text="Instagram"
                onPress={() => this.instagramLogin.show()}
              />
              <Button
                containerStyle={styles.forgotpswdBtn}
                textStyle={styles.forgotpswd}
                text="Forgot password?"
                onPress={this.goToForgotpswd}
              />
              <View style={styles.signupContainer}>
                <Text style={styles.description}>Do not have an account? </Text>
                <Button
                  containerStyle={styles.signupBtn}
                  textStyle={styles.signup}
                  text="Sign Up"
                  onPress={this.goToSignUp}
                />
              </View>
            </View>
            <InstagramLogin
              ref={(ref) => (this.instagramLogin = ref)}
              clientId="5d40831591bc467d835d3bfa61884cf4"
              redirectUrl="http://bolthill.com"
              scopes={['public_content', 'follower_list']}
              onLoginSuccess={(token) => this.setState({ token })}
              onLoginFailure={(data) => console.log(data)}
            />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  }
}
LoginScreen.contextType = AppContext;

LoginScreen.propTypes = {
  navigation: PropTypes.object
};

export default LoginScreen;
