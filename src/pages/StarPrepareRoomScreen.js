import React from 'react'


import Orientation from 'react-native-orientation'
import { RNCamera } from 'react-native-camera'
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import { AppContext, Navbar } from '../components';
import Authentication from '../services/Authentication';
import { Header, Input, Button, Avatar } from 'react-native-elements'
import { cStyles, screenWidth } from './styles';
import moment from 'moment'
import firebase from 'react-native-firebase'
const auth = firebase.auth();
const firestore = firebase.firestore()

const createSessionId = firebase.functions().httpsCallable('createSessionId');
const checkHealth = firebase.functions().httpsCallable('checkHealth');

const IMAGE_SAMPLE = require('app/assets/images/prepareroom_sample.png');
const ICON_MORE = require('app/assets/images/ic_more.png');
const ICON_CLOSE = require('app/assets/images/ic_close.png');
const COLOR_BUTTON = '#C9AD6F'
const COLOR_BUTTON_BORDER = '#F8D099'


export default class StarPrepareRoomScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  
  componentDidMount() {
    Orientation.lockToPortrait()
  }

  onCreateSession() {
    const starTime = new Date()
    const endTime= moment(starTime).add(1, 'day')
    try {
      this.context.showLoading();
      var data = {
        uid: auth.currentUser.uid,
        type: 0,
      }
      createSessionId(data)
      .then(result => {
        console.warn(result)
        this.context.hideLoading();
        if (result.data.success) {
          this.setState({
            apiKey: result.data.apiKey,
            sessionId: result.data.sessionId,
            token: result.data.token
          },() => {
            firestore.collection('sessions').where('publisherId', '==', auth.currentUser.uid).get()
            .then(session => {
              if (session.docs.length>0) {
                this.context.hideLoading();
                this.props.navigation.navigate('starlive', {'apiKey': session.docs[0].data().apiKey, 'sessionId': session.docs[0].data().sessionId, 'token': session.docs[0].data().token})
              } else {
                firestore.collection('sessions').add({
                  apiKey: result.data.apiKey,
                  apiSecret: result.data.apiSecret,
                  publisherId: auth.currentUser.uid,
                  sessionId: result.data.sessionId,
                  token: result.data.token,
                  type: result.data.type,
                  limit: result.data.limit,
                  starTime: starTime,
                  endTime: endTime
                })
                .then(() => {
                  this.context.hideLoading();
                  this.props.navigation.navigate('starlive', {'apiKey': result.data.apiKey, 'sessionId': result.data.sessionId, 'token': result.data.token})
                })
                .catch(err2 => {
                  this.context.hideLoading();
                  console.warn(err2)
                })
              }
            })
            .catch(err1 => {
              this.context.hideLoading();
              console.warn(err1)
            })
          })
        } else {
          console.warn(result.data)
        }
      })
      .catch(err => {
        this.context.hideLoading();
      })


      // firestore.collection('sessions').where('publisherId', '==', auth.currentUser.uid).get()
      // .then(session => {
      //   if (session.docs.length>0) {
      //     this.context.hideLoading();
      //     this.props.navigation.navigate('starlive', {'apiKey': session.docs[0].data().apiKey, 'sessionId': session.docs[0].data().sessionId, 'token': session.docs[0].data().token})
      //   } else {
      //     firestore.collection('sessions').add({
      //       apiKey: this.state.apiKey,
      //       publisherId: auth.currentUser.uid,
      //       sessionId: this.state.sessionId, //result.data.sessionId,
      //       token: this.state.token, // result.data.token,
      //       type: 'routed', //result.data.type,
      //       limit: 0, //result.data.limit,
      //       starTime: starTime,
      //       endTime: endTime
      //     })
      //     .then(() => {
      //       this.context.hideLoading();
      //       this.props.navigation.navigate('starlive', {'apiKey': this.state.apiKey, 'sessionId': this.state.sessionId, 'token': this.state.token})
      //     })
      //     .catch(err2 => {
      //       this.context.hideLoading();
      //       console.warn(err2)
      //     })
      //       // this.props.navigation.navigate('starlive')
      //   }
      // })
      // .catch(err1 => {
      //   this.context.hideLoading();
      //   console.warn(err1)
      // })

    } catch (e) {
      this.context.hideLoading();
      console.warn(e)
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          style={styles.camera}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}/>
        
        <Header
          containerStyle={cStyles.headerContainer_room}
          placement="right"          
          rightComponent= {
            <TouchableOpacity onPress={()=>console.warn('click more')}>
              <Image
                style={{width:20, height:20}}
                source={ICON_MORE}
                resizeMode='contain'
              />
            </TouchableOpacity>
          }
        />
        <View style={styles.view_main}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('star_main')}>
           <Image
              style={{width:45, height:45}}
              source={ICON_CLOSE}
              resizeMode='contain'
            />
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
    paddingHorizontal: 25, 
    alignItems: 'center', 
    justifyContent: 'flex-end'
  },
  view_button: {
    width: '100%', 
    height: 50, 
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 25, 
    overflow: 'hidden',
    borderColor: COLOR_BUTTON_BORDER,
    backgroundColor: COLOR_BUTTON,
    alignItems: 'center',
    justifyContent: 'center'
  }
  
})

StarPrepareRoomScreen.contextType = AppContext;

StarPrepareRoomScreen.propTypes = {
  navigation: PropTypes.object
};
