import React from 'react'
import Orientation from 'react-native-orientation'
import { SafeAreaView, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'

const IMAGE_BACKGROUND = require('app/assets/images/welcome2.png');
const IMAGE_TEXT = require('app/assets/images/welcome2_txt.png');
const IMAGE_TAB = require('app/assets/images/welcome2_tab.png');
const IMAGE_TAB_IMG = require('app/assets/images/welcome2_tab_image.png');

export default class WelcomeScreen2 extends React.Component {
  constructor (props) {
		super(props)
  }
  
  componentDidMount() {
    Orientation.lockToPortrait();
  }
  onPress() {
    this.props.navigation.navigate('splash2');
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <ImageBackground source={IMAGE_BACKGROUND} style={styles.background} resizeMode='cover'>
          <Image source={IMAGE_TEXT} style={styles.text}/>
          <TouchableOpacity style={styles.view_bottom_tab} onPress={()=>this.onPress()}>
            <ImageBackground source={IMAGE_TAB} style={styles.button_tab} resizeMode='stretch'>
              <Image source={IMAGE_TAB_IMG} style={{height: 30}} resizeMode='contain'/>
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
    aspectRatio: 654 / 404,
    marginBottom: 30,
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