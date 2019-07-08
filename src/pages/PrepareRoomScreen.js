import React from 'react'
import firebase from 'react-native-firebase'

import Orientation from 'react-native-orientation'
import { RNCamera } from 'react-native-camera'
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'
import { OT, OTPublisher, OTSession, OTSubscriber } from 'opentok-react-native'
import { AppContext, Navbar } from '../components';
import Authentication from '../services/Authentication';
import { OPENTOK } from '../utils/Constants'
import { Header, Input, Button, Avatar } from 'react-native-elements'
import { cStyles, screenWidth } from './styles';

const createSessionId = firebase.functions().httpsCallable('createSessionId');
const checkHealth = firebase.functions().httpsCallable('checkHealth');

const IMAGE_SAMPLE = require('app/assets/images/prepareroom_sample.png');
const ICON_MORE = require('app/assets/images/ic_more.png');
const ICON_CLOSE = require('app/assets/images/ic_close.png');
const COLOR_BUTTON = '#C9AD6F'
const COLOR_BUTTON_BORDER = '#F8D099'


export default class PrepareRoomScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sessionId: '1_MX40NjM1NDkyMn5-MTU2MjMyMDIzOTAzOX5lNWx5eitwcE5Ocy9zUElVMmlRWTZ6QVN-fg',
      token: 'T1==cGFydG5lcl9pZD00NjM1NDkyMiZzaWc9NTJhMTA0NWZhZDM1MWY1YjU1ZTk0OTQ1YmQ2MDQ0M2Q2Mzc2NTZmMjpzZXNzaW9uX2lkPTFfTVg0ME5qTTFORGt5TW41LU1UVTJNak15TURJek9UQXpPWDVsTld4NWVpdHdjRTVPY3k5elVFbFZNbWxSV1RaNlFWTi1mZyZjcmVhdGVfdGltZT0xNTYyMzIwMjczJm5vbmNlPTAuNzAyMTEyODExNDcxMjAzOSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTYyNDA2NjcyJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9'
    }
  }
  
  componentDidMount() {
    Orientation.lockToPortrait()
    createSessionId({test:'test'})
    .then(result => {
      console.warn(result.data)
    })

  }

  render() {
    return (
      <View style={styles.container} >
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          type={RNCamera.Constants.Type.back}
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
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('chatview')} style={styles.view_button}>
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

PrepareRoomScreen.contextType = AppContext;

PrepareRoomScreen.propTypes = {
  navigation: PropTypes.object
};
