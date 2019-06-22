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
import { AppContext, Navbar } from 'app/components';

const IMAGE_BACKGROUND = require('app/assets/images/welcome3.png');
const IMAGE_TEXT = require('app/assets/images/welcome3_txt.png');
const IMAGE_BUTTON = require('app/assets/images/welcome3_btn.png');
const IMAGE_RECT = require('app/assets/images/welcome3_rect.png');

export default class WelcomeScreen3 extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      uid: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      photoUrl: '',
      provider: ''
    }
  }
  componentDidMount() {
    console.warn(this.props.navigation.getParam('photoUrl'))
    this.setState({
      uid: this.props.navigation.getParam('uid'),
      fullName: this.props.navigation.getParam('fullName'),
      email: this.props.navigation.getParam('email'),
      phoneNumber: this.props.navigation.getParam('phoneNumber'),
      photoUrl: this.props.navigation.getParam('photoUrl'),
      provider: this.props.navigation.getParam('provider')
    })
  }
  
  onPress() {
    this.props.navigation.navigate('nickname', {
      uid: this.state.uid,
      fullName: this.state.fullName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      photoUrl: this.state.photoUrl,
      provider: this.state.provider
    });
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <ImageBackground source={IMAGE_BACKGROUND} style={styles.background} resizeMode='cover'>
          <View style={styles.view_photo}>
            <Image source={{uri: this.state.photoUrl}} style={styles.image_photo} resizeMode='cover'/>
          </View>
          <View style={styles.view_rect}>
            <Image source={IMAGE_RECT} style={styles.image_rect} resizeMode='stretch'/>
          </View>
          <View style={styles.view_text}>
            <Text style={styles.text_name}>{`Hi ${this.state.fullName}`}</Text>
            <Image source={IMAGE_TEXT} style={styles.text}/>
          </View>
          <TouchableOpacity onPress={()=>this.onPress()}>
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
    aspectRatio: 654 / 326,
    marginTop: 25,
  },
  button: {
    width: '82%',
    height: undefined,
    aspectRatio: 702 / 166,
  },
  view_text: {
    width: '100%', 
    height: '50%',
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
  }
})

WelcomeScreen3.contextType = AppContext;

WelcomeScreen3.propTypes = {
  navigation: PropTypes.object
};