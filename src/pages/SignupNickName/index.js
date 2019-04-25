import React from 'react';
import {
  View,
  Image,
  NativeModules,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Linking
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'react-native-firebase';
import PhoneInput from 'react-native-phone-input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthController } from 'app/services';
import { AppContext, Navbar } from 'app/components';
import { alert } from 'app/utils/Alert';
import styles from './style';
import { TextInput } from 'react-native-gesture-handler';

const IMAGE_BACKGROUND_GRADIENT = require('app/assets/images/gradient.png');
const ICON_GL = require('app/assets/images/google.png');

class SignupNickNameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      agreeTerms: false
    };
  }

  leftHandler = () => {
    this.props.navigation.goBack();
  };

  rightHandler = async () => {
    this.props.navigation.navigate('signupcategory');
  };

  updateInfo() {
    this.setState({
      valid: this.phone.isValidNumber(),
      type: this.phone.getNumberType(),
      value: this.phone.getValue()
    });
  }

  render() {
    return (
      <ImageBackground
        source={IMAGE_BACKGROUND_GRADIENT}
        style={styles.background}
      >
        <Navbar
          left="ios-arrow-back"
          right="Skip"
          leftHandler={this.leftHandler}
          rightHandler={this.rightHandler}
        />
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <SafeAreaView style={styles.container}>
            <View style={styles.container}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.avatarContainer}>
                  <View style={styles.avatarCircle}>
                    <Image source={ICON_GL} style={styles.avatar} />
                  </View>
                </View>
                <View style={[styles.titleContainer]}>
                  <Text style={styles.title}>
                    {'Congrats! Priya Ranjan, welcome to your Stardom'}
                  </Text>
                  <Text
                    style={[
                      styles.title,
                      {
                        fontSize: 14,
                        marginTop: 10,
                        fontWeight: '500',
                        lineHeight: 22,
                        color: '#ffffff40'
                      }
                    ]}
                  >
                    {'How about specifying a cool nickname'}
                  </Text>
                </View>
              </View>

              <View style={[styles.titleContainer]}>
                <Text
                  style={[
                    styles.title,
                    {
                      fontSize: 13,
                      fontWeight: '500',
                      fontStyle: 'normal',
                      letterSpacing: -0.31
                    }
                  ]}
                >
                  {'NICK NAME'}
                </Text>
              </View>
              <View style={[styles.phoneContainer, { width: '100%' }]}>
                <TextInput
                  style={styles.input}
                  value={this.state.nickName}
                  onChangeText={(value) => this.setState({ nickName: value })}
                />
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAwareScrollView>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={this.next}>
            <Text style={styles.button}>
              {'Next Step  '}
              <Ionicons
                name={'ios-arrow-forward'}
                style={[styles.button]}
                size={24}
                color="#450d42"
              />
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
SignupNickNameScreen.contextType = AppContext;

SignupNickNameScreen.propTypes = {
  navigation: PropTypes.object
};

export default SignupNickNameScreen;
