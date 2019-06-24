import React from 'react'
import { SafeAreaView, StyleSheet, View, Image, ImageBackground, TouchableOpacity, TextInput, Text } from 'react-native'
import { Input, colors } from 'react-native-elements'
import PropTypes from 'prop-types';
import Orientation from 'react-native-orientation'
import { AppContext, Navbar } from '../components';

const IMAGE_BACKGROUND = require('app/assets/images/profile.png');
const IMAGE_TEXT = require('app/assets/images/profile_txt.png');
const IMAGE_BUTTON = require('app/assets/images/profile_btn.png');
const IMAGE_EDIT = require('app/assets/images/profile_editbox.png');
const IMAGE_SUCCESS = require('app/assets/images/success.png');

export default class NicknameScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
      nickName: '',
      placeholder:'@the_best_fan' ,
      uid: this.props.navigation.getParam('uid'),
      displayName: this.props.navigation.getParam('displayName'),
      email: this.props.navigation.getParam('email'),
      phoneNumber: this.props.navigation.getParam('phoneNumber'),
      photoURL: this.props.navigation.getParam('photoURL'),
      providerId: this.props.navigation.getParam('providerId')
    };
  }
  componentDidMount() {
    Orientation.lockToPortrait();
  }
  // onPresNext() {
  //   console.warn('press next')
  // }
  onPresNext = async () => {
    if (this.state.nickName === '') {
      alert('Please enter Nick Name');
      return;
    }
    this.props.navigation.navigate('signin')
    // this.props.navigation.navigate('signupphone', {
    //   nickName: this.state.nickName,
    //   uid: this.props.navigation.getParam('uid'),
    //   displayName: this.props.navigation.getParam('displayName'),
    //   email: this.props.navigation.getParam('email'),
    //   phoneNumber: this.props.navigation.getParam('phoneNumber'),
    //   photoURL: this.props.navigation.getParam('photoURL'),
    //   providerId: this.props.navigation.getParam('providerId')
    // });
  };
  // onPressSkip() {
  //   console.warn('press skip')
  // }
  onPressSkip = async () => {
    this.props.navigation.navigate('signin')
    // this.props.navigation.navigate('signupphone', {
    //   nickName: this.state.nickName,
    //   uid: this.props.navigation.getParam('uid'),
    //   displayName: this.props.navigation.getParam('displayName'),
    //   email: this.props.navigation.getParam('email'),
    //   phoneNumber: this.props.navigation.getParam('phoneNumber'),
    //   photoURL: this.props.navigation.getParam('photoURL'),
    //   providerId: this.props.navigation.getParam('providerId')
    // });
  };

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <ImageBackground source={IMAGE_BACKGROUND} style={styles.background} resizeMode='stretch'>
          <View style={styles.view_tab}>
            <TouchableOpacity onPress={()=>this.onPressSkip()}>
              <Text style={styles.skip}> Skip </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.view_middle}>
            <Image source={IMAGE_TEXT} style={styles.text}/>
            <Input
              containerStyle={styles.input}
              inputContainerStyle={{borderBottomWidth: 0}}
              inputStyle={{color: 'white'}}
              onChangeText={(nickName) => this.setState({nickName})}
              underlineColorAndroid='transparent'
              placeholder={this.state.placeholder}
              placeholderTextColor='white'
              value={this.state.text}
              rightIcon={
                <Image source={IMAGE_SUCCESS} style={{width: 20, height: 20, paddingRight: 10}}/>
              }
            />
          </View>
          <TouchableOpacity onPress={()=>this.onPresNext()}>
            <Image source={IMAGE_BUTTON} style={styles.button}/>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    )
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%',
    height: '100%',
  },
  background: {
    width: '100%',
    height: '100%',
    alignItems: 'center', 
    justifyContent: 'flex-end', 
  },
  text: {
    width: '80%',
    height: undefined,
    aspectRatio: 650 / 132,
    marginBottom: 20,
  },
  button: {
    width: '82%',
    height: undefined,
    aspectRatio: 702 / 166,
  },
  view_tab: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-end', 
    justifyContent: 'flex-start',
    position: 'absolute',
  },
  view_middle: {
    width: '100%',
    height: '50%',
    alignItems: 'center', 
    justifyContent: 'flex-start',
    position: 'absolute',
  },
  skip: {
    color:'white', 
    fontSize: 18, 
    marginRight: 20, 
    marginTop: 20
  },
  input: {
    width: '80%', 
    height: 55, 
    borderColor: '#ECD39A', 
    borderWidth: 2, 
    borderRadius: 5, 
  }
})

NicknameScreen.contextType = AppContext;

NicknameScreen.propTypes = {
  navigation: PropTypes.object
};