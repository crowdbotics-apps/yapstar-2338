import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import firebase from 'react-native-firebase'
import Orientation from 'react-native-orientation'
import { RNCamera } from 'react-native-camera'
import { Header, Input, Button, Avatar } from 'react-native-elements'
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import { AppContext, Navbar } from '../components'
import { cStyles, screenWidth } from './styles'

const auth = firebase.auth();
const firestore = firebase.firestore();
const createSessionId = firebase.functions().httpsCallable('createSessionId');

const COLOR_BUTTON = '#C9AD6F'
const COLOR_BUTTON_BORDER = '#F8D099'
const ICON_MORE = require('app/assets/images/ic_more.png');
const ICON_CLOSE = require('app/assets/images/ic_close.png');


export default class StarPrepareRoomScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    Orientation.lockToPortrait()
  }
  onCreateSession() {
    var starTime = new Date()
    var endTime = moment(starTime).add(1, 'day').format('YYYY-MM-DD')
    starTime = moment(starTime).format('YYYY-MM-DD')
    try {
      this.context.showLoading();
      var data = {
        uid: auth.currentUser.uid,
        type: 0, // type => 0: routed, 1: relayed
        role: 2  // role => 0: subscriber, 1: publisher, 2: moderator
      }
      createSessionId(data)
      .then(result => {
        console.warn(result)
        if (result.data.success) {
          this.setState({
            token: result.data.token,
            apiKey: result.data.apiKey,
            sessionId: result.data.sessionId,
          },() => {
            firestore.collection('sessions').where('publisherId', '==', auth.currentUser.uid).get()
            .then(session => {
              if (session.docs.length > 0) {
                firestore.doc(`sessions/${session.docs[0].id}`).delete()
              } 
              firestore.collection('sessions').add({
                apiKey: result.data.apiKey,
                apiSecret: result.data.apiSecret,
                publisherId: auth.currentUser.uid,
                sessionId: result.data.sessionId,
                token: result.data.token,
                type: result.data.type,
                limit: result.data.limit,
                starTime: starTime,
                endTime: endTime,
                isChatting: false,
              })
              .then(created_session => {
                this.context.hideLoading();
                this.props.navigation.navigate('starlive', {
                  'sid': created_session.id,
                  'token': result.data.token,
                  'apiKey': result.data.apiKey, 
                  'sessionId': result.data.sessionId, 
                })
              })
              .catch(create_err => {
                this.context.hideLoading();
                console.warn(create_err)
              })
            })
            .catch(session_get_err => {
              this.context.hideLoading();
              console.warn('session_get_err: ', session_get_err)
            })
          })
        } else {
          this.context.hideLoading();
          console.warn('return false: ', result.data)
        }
      })
      .catch(firebase_err => {
        this.context.hideLoading();
        console.warn('firebase_err: ', firebase_err)
      })
    } catch (e) {
      this.context.hideLoading();
      console.warn(e)
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <RNCamera
          ref={ref => { this.camera = ref; }}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          style={styles.camera}/>
        <Header
          containerStyle={cStyles.headerContainer_room}
          placement="right"          
          rightComponent= {
            <TouchableOpacity onPress={()=>console.warn('click more')}>
              <Image
                style={{width:20, height:20}}
                source={ICON_MORE}
                resizeMode='contain'/>
            </TouchableOpacity>
          }
        />
        <View style={styles.view_main}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('star_main')}>
           <Image
              style={{width:45, height:45}}
              source={ICON_CLOSE}
              resizeMode='contain'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onCreateSession()} style={styles.view_button}>
            <Text style={{color: 'black', fontSize: 16}}>START LIVE STREAM</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'  
  },
  camera: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  view_main: {
    flex: 1, 
    width: '100%', 
    alignItems: 'center', 
    paddingHorizontal: 25, 
    justifyContent: 'flex-end'
  },
  view_button: {
    width: '100%', 
    height: 50, 
    borderWidth: 1,
    borderRadius: 25, 
    marginVertical: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLOR_BUTTON_BORDER,
    backgroundColor: COLOR_BUTTON,
  }
})

StarPrepareRoomScreen.contextType = AppContext;

StarPrepareRoomScreen.propTypes = {
  navigation: PropTypes.object
};
