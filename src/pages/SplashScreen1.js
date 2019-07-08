import React from 'react'
import firebase from 'react-native-firebase'
import Splash from 'react-native-splash-screen'
import { View, StyleSheet } from 'react-native'
import Orientation from 'react-native-orientation'

const firestore = firebase.firestore()

export default class SplashScreen1 extends React.Component {
  constructor (props) {
		super(props)
    setTimeout(() => {
      this.gotoNextScreen()
    }, 1000)
  }
  
  componentDidMount() {
    Orientation.lockToPortrait()
  }
  gotoNextScreen() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
        firestore.doc(`users/${user.uid}`).get()
        .then(userinfo => {
          Splash.hide()
          if (userinfo.data().role && userinfo.data().role === 1) {
            this.props.navigation.navigate('starStack')
          } else {
            this.props.navigation.navigate('fanStack')
          }
        })
        .catch(error => {
          Splash.hide()
          console.warn(error)
          this.props.navigation.navigate('fanStack');
        })
			} else {
        Splash.hide()
				this.props.navigation.navigate('welcome1');
      }
    });
    // this.props.navigation.navigate('signin');
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