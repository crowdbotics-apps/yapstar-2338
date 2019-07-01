import React from 'react'
import { 
  SafeAreaView, 
  StyleSheet, 
  Image, 
  ImageBackground, 
  TouchableOpacity, 
  Text, 
  View } from 'react-native'
import PropTypes from 'prop-types';
import Orientation from 'react-native-orientation'
import { AppContext, Navbar } from 'app/components';
import FastImage from 'react-native-fast-image'

const IMAGE_BACKGROUND = require('app/assets/images/welcome3.png');
const IMAGE_TEXT = require('app/assets/images/welcome3_txt.png');
const IMAGE_RECT = require('app/assets/images/welcome3_rect.png');
const IMAGE_TAB = require('app/assets/images/welcome3_tab.png');
const IMAGE_TAB_IMG = require('app/assets/images/welcome3_tab_image.png');

export default class WelcomeScreen3 extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      uid: '',
      displayName: '',
      email: '',
      phoneNumber: '',
      photoURL: '',
      providerId: ''
    }
  }
  componentDidMount() {
    Orientation.lockToPortrait();
    this.setState({
      uid: this.props.navigation.getParam('uid', ''),
      displayName: this.props.navigation.getParam('displayName', ''),
      email: this.props.navigation.getParam('email', ''),
      phoneNumber: this.props.navigation.getParam('phoneNumber', ''),
      photoURL: this.props.navigation.getParam('photoURL', ''),
      providerId: this.props.navigation.getParam('providerId', '')
    })
  }
  
  onPress() {
    this.props.navigation.navigate('nickname', {
      uid: this.state.uid,
      displayName: this.state.displayName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      photoURL: this.state.photoURL,
      providerId: this.state.providerId
    });
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <ImageBackground source={IMAGE_BACKGROUND} style={styles.background} resizeMode='cover'>
          <View style={styles.view_photo}>
            <FastImage source={this.state.photoURL!=''?{uri: this.state.photoURL}: {}} style={styles.image_photo} resizeMode='cover'/>
          </View>
          <View style={styles.view_rect}>
            <Image source={IMAGE_RECT} style={styles.image_rect} resizeMode='stretch'/>
          </View>
          <View style={styles.view_text}>
            <Text style={styles.text_name}>{`Hi ${this.state.displayName}`}</Text>
            <Image source={IMAGE_TEXT} style={styles.text}/>
          </View>
          <TouchableOpacity style={styles.view_bottom_tab} onPress={()=>this.onPress()}>
            <ImageBackground source={IMAGE_TAB} style={styles.button_tab} resizeMode='stretch'>
              <Image source={IMAGE_TAB_IMG} style={{height: 25}} resizeMode='contain'/>
            </ImageBackground>
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
    aspectRatio: 654 / 326,
    marginTop: 25,
  },
  view_text: {
    width: '100%', 
    height: '60%',
    position: 'absolute',
    alignItems: 'center', 
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
  text_name: {
    color:'white', 
    fontSize: 30, 
    fontStyle: 'normal', 
    fontWeight: '300', 
    marginTop: 20
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

WelcomeScreen3.contextType = AppContext;

WelcomeScreen3.propTypes = {
  navigation: PropTypes.object
};