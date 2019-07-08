import React from 'react'
import { SafeAreaView, StyleSheet, View, Image, ImageBackground, TouchableOpacity, TextInput, Text, ScrollView } from 'react-native'
import { Input, colors } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types';
import Orientation from 'react-native-orientation'
import FastImage from 'react-native-fast-image'
import { AppContext, Navbar } from '../components'
import { cStyles, isiOS, screenWidth, screenHeight } from './styles';

const IMAGE_BACKGROUND = require('app/assets/images/profile.png');
const IMAGE_TEXT = require('app/assets/images/profile_txt.png');
const IMAGE_SUCCESS = require('app/assets/images/ic_check.png');
const IMAGE_RECT = require('app/assets/images/welcome3_rect.png');
const IMAGE_TAB = require('app/assets/images/profile_tab.png');
const IMAGE_TAB_IMG = require('app/assets/images/profile_tab_image.png');

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
  onPresNext = async () => {
    if (this.state.nickName === '') {
      alert('Please enter Nick Name');
      return;
    }
    this.props.navigation.navigate('pick_interest', {
      nickName: this.state.nickName,
      uid: this.props.navigation.getParam('uid'),
      displayName: this.props.navigation.getParam('displayName'),
      email: this.props.navigation.getParam('email'),
      phoneNumber: this.props.navigation.getParam('phoneNumber'),
      photoURL: this.props.navigation.getParam('photoURL'),
      providerId: this.props.navigation.getParam('providerId')
    });
  };

  render() {
    return(
      <View style={styles.container}>
        <ImageBackground source={IMAGE_BACKGROUND} style={styles.background} resizeMode='stretch'>
          <View style={styles.view_photo}>
            <FastImage source={this.state.photoURL!=''?{uri: this.state.photoURL}: {}} style={styles.image_photo} resizeMode='cover'/>
          </View>
          <View style={styles.view_rect}>
            <Image source={IMAGE_RECT} style={styles.image_rect} resizeMode='stretch'/>
          </View>
          <View style={styles.view_middle}>
            <KeyboardAwareScrollView style={{width: '100%', height: '100%'}} extraHeight={200} enableOnAndroid>
              <View style={{height: screenHeight/2}}></View>
              <Image source={IMAGE_TEXT} style={styles.text}/>
              <Input
                containerStyle={styles.input}
                inputContainerStyle={{borderBottomWidth: 0}}
                inputStyle={{color: 'white', paddingTop: isiOS? 10:10}}
                onChangeText={(nickName) => this.setState({nickName: nickName.toLowerCase()})}
                underlineColorAndroid='transparent'
                placeholder={this.state.placeholder}
                placeholderTextColor='grey'
                value={this.state.nickName}
                rightIcon={
                  <Image source={IMAGE_SUCCESS} style={{width: 20, height: 20, paddingRight: 10, marginTop: isiOS? 10:0}}/>
                }
              />
            </KeyboardAwareScrollView>
            <View style={{flex:1, width:'100%', alignItems: 'center', justifyContent: 'flex-end', }}>
              <TouchableOpacity style={styles.view_bottom_tab} onPress={()=>this.onPresNext()}>
                <ImageBackground source={IMAGE_TAB} style={styles.button_tab} resizeMode='stretch'>
                  <Image source={IMAGE_TAB_IMG} style={{height: 25}} resizeMode='contain'/>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
          
        </ImageBackground>
      </View>
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
    width: screenWidth-50,
    height: undefined,
    aspectRatio: 650 / 132,
    marginHorizontal: 25,
    marginBottom: 20,
  },
  button: {
    width: '82%',
    height: undefined,
    aspectRatio: 702 / 166,
  },
  view_middle: {
    width: '100%',
    height: '100%',
    alignItems: 'center', 
    justifyContent: 'flex-start',
  },
  view_keyawarescroll: {
    width: '100%',
    alignItems: 'center', 
  },
  skip: {
    color:'white', 
    fontSize: 18, 
    marginRight: 20, 
    marginTop: 20
  },
  input: {
    width: screenWidth-50,
    height: 55, 
    borderColor: '#ECD39A', 
    borderWidth: 2, 
    borderRadius: 5, 
    marginHorizontal: 25
  },
  view_photo: {
    width: '100%', 
    height: '100%', 
    position: 'absolute',
  },
  view_rect: {
    width: '100%', 
    height: '100%', 
    position: 'absolute',
    paddingTop: '10%'
  },
  image_rect: {
    width: '100%', 
    height: undefined, 
    aspectRatio: 610/1084 
  },
  image_photo: {
    width: '100%', 
    height: '50%'
  },
  view_bottom_tab: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    paddingHorizontal: 15
  },
  button_tab: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },

})

NicknameScreen.contextType = AppContext;

NicknameScreen.propTypes = {
  navigation: PropTypes.object
};