import React from 'react'
import firebase from 'react-native-firebase'
import Splash from 'react-native-splash-screen'
import { View, StyleSheet } from 'react-native'
import Orientation from 'react-native-orientation'

export default class SplashScreen1 extends React.Component {
  constructor (props) {
		super(props)
		this.unsubscriber = null;
    setTimeout(() => {
      this.gotoNextScreen()
    }, 1000)
  }
  
  componentDidMount() {
    Orientation.lockToPortrait()
  }
  gotoNextScreen() {
		// this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
		// 	Splash.hide()
		// 	if (user) {
		// 		this.props.navigation.navigate('main');
		// 	} else {
		// 		this.props.navigation.navigate('welcome1');
		// 	}
    // });
    Splash.hide()
    this.props.navigation.navigate('interest');
  }

  render() {
    return (
      <View style={styles.container} />
    )
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1   
  }
})