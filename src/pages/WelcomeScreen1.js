import React from 'react'
import { SafeAreaView, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'

const IMAGE_BACKGROUND = require('app/assets/images/welcome1.png');
const IMAGE_TEXT = require('app/assets/images/welcome1_txt.png');
const IMAGE_BUTTON = require('app/assets/images/welcome1_btn.png');

export default class WelcomeScreen1 extends React.Component {
  constructor (props) {
		super(props)
  }
  
  onPress() {
    this.props.navigation.navigate('welcome2');
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <ImageBackground source={IMAGE_BACKGROUND} style={styles.background} resizeMode='cover'>
          <Image source={IMAGE_TEXT} style={styles.text}/>
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
    aspectRatio: 654 / 404,
    marginBottom: 30,
  },
  button: {
    width: '82%',
    height: undefined,
    aspectRatio: 702 / 166,
  }
})