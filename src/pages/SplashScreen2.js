import React from 'react'
import { SafeAreaView, StyleSheet, Image } from 'react-native'

const IMAGE_BACKGROUND = require('app/assets/images/splash2.png');

export default class SplashScreen2 extends React.Component {
  constructor (props) {
		super(props)
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('auth');
    }, 1000);
  }

  render() {
    return(
      <SafeAreaView style={styles.container}>
        <Image source={IMAGE_BACKGROUND} style={styles.background}/>
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
    height: undefined,
    aspectRatio: 750/1624,
  },
})