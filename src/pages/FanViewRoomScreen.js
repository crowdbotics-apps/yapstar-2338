import React from 'react'
import Orientation from 'react-native-orientation'
import { StyleSheet, Image, ImageBackground, TouchableOpacity, View, ScrollView, FlatList, Text, Alert } from 'react-native'
import { Header, Input, Button, Avatar } from 'react-native-elements'
import PropTypes from 'prop-types';
import { AppContext, RoomHeader } from '../components';
import { cStyles, screenWidth } from './styles';
import { OTPublisher, OTSession, OTSubscriber, OT } from 'opentok-react-native'
import firebase from 'react-native-firebase';

const auth = firebase.auth()
const firestore = firebase.firestore()
const createToken = firebase.functions().httpsCallable('createToken');

const IMAGE_BACKGROUND = require('app/assets/images/interests.png');
const IMAGE_BAR = require('app/assets/images/chatview_bar.png');
const IMAGE_GRAD1 = require('app/assets/images/chatview_grad1.png');
const IMAGE_GRAD2 = require('app/assets/images/chatview_grad2.png');
const IMAGE_KANGANA = require('app/assets/images/image_kangana.png');

const ICON_LIVE = require('app/assets/images/ic_live.png');
const ICON_MORE = require('app/assets/images/ic_more.png');
const ICON_JEWEL = require('app/assets/images/ic_gewel.png');
const ICON_CALL = require('app/assets/images/ic_call.png');
const ICON_AUDIO = require('app/assets/images/ic_audio.png');
const ICON_VIDEO = require('app/assets/images/ic_video.png');
const ICON_DOT = require('app/assets/images/ic_reddot.png');

const COLOR_TAB = '#222222'
const COLOR_GOLD = '#F8D099'
const COLOR_TEXT_GRAY = '#595558'

export default class FanViewRoomScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 0,
      placeholder: 'Post something new ...',
      stars: [
        {
          name: 'VIRAT KOHLI',
          image: IMAGE_KANGANA,
          selected: false
        },
        {
          name: 'PRIYANKA CHOPRA',
          image: IMAGE_KANGANA,
          selected: false
        },
        {
          name: 'AMITABH BACHCHAN',
          image: IMAGE_KANGANA,
          selected: false
        },
        {
          name: 'PRIYANKA CHOPRA',
          image: IMAGE_KANGANA,
          selected: false
        },
        {
          name: 'AMITABH BACHCHAN',
          image: IMAGE_KANGANA,
          selected: false
        },
      ],
    }
  }
  componentDidMount() {
    Orientation.lockToPortrait();
    const sid = this.props.navigation.getParam('sid', '')
    const token = this.props.navigation.getParam('token', '')
    const starId = this.props.navigation.getParam('starId', '')
    const apiKey = this.props.navigation.getParam('apiKey', '')
    const sessionId = this.props.navigation.getParam('sessionId', '')
    this.setState({
      sid: sid,
      token, token,
      starId: starId,
      apiKey: apiKey,
      sessionId: sessionId,
    })
  }
 
  renderItemChatList({item, index}) {
    return(
      <TouchableOpacity style={styles.view_chatlist_item} onPress={() => console.warn(index)}>
        <Avatar
          rounded
          size={58}
          marginRight={20}
          source={IMAGE_KANGANA}
        />
        <View style={{flex:1, height: 70, justifyContent: 'space-around'}}>
          <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={{color: COLOR_GOLD, fontSize: 16}} numberOfLines={1}>Harshita Choudhary</Text>
            <Text style={{color: COLOR_TEXT_GRAY, fontSize: 13}} numberOfLines={1}>4:36PM</Text>
          </View>
          <Text style={{color: 'white', fontSize: 13}} numberOfLines={2}>Upcoming auction for a one-to-one meeting with the one and only Bollywood icon.</Text>
        </View>
      </TouchableOpacity>
    )
  }
  gotoReview() {
    this.props.navigation.navigate('review', {
      starId: this.state.starId
    })
  }
  gotoMain() {
    this.props.navigation.navigate('fanStack')
  }

  gotoChatroom() {
    this.context.showLoading();
    firestore.collection('sessions').where('publisherId', '==', this.state.starId).get()
    .then(session => {
      if (session.docs[0].data().isChatting) {
        this.context.hideLoading();
        Alert.alert('notice', 'Star is on chatting with other fan.')
      } else {
        var data = {sessionId: session.docs[0].data().sessionId, role: 1}
        createToken(data)
        .then(result => {
          this.context.hideLoading();
          console.warn(result)
          this.props.navigation.navigate('fanChat', {
            'sid': session.docs[0].id,
            'starId': item.id, 
            'apiKey': session.docs[0].data().apiKey, 
            'sessionId': session.docs[0].data().sessionId, 
            'token': result.data.token})
        })
        .catch(err => {
          this.context.hideLoading();
          console.warn(err)
        })
      }     
    })
    .catch(err => {
      this.context.hideLoading();
      Alert.alert('notice', 'Star closed connection.')
    })
  }

  render() {
    return(
      <ImageBackground style={styles.container} source={IMAGE_BACKGROUND}>
        <View style={styles.view_main}>
          <ScrollView style={{width: '100%'}}>
            <View style={styles.view_video}>
              <View style={{width: '100%', height: '100%', flexDirection: 'row', position: 'absolute'}}>
                {this.state.apiKey && this.state.token && this.state.sessionId &&
                  <OTSession apiKey={this.state.apiKey} sessionId={this.state.sessionId} token={this.state.token} >
                    <View style={{width: '100%', height: '100%', flexDirection: 'row'}}> 
                      {/* <OTPublisher style={{flex: 1, height: '100%'}}/> */}
                      <OTSubscriber containerStyle={{flexDirection: 'row', width: '100%', height: '100%', justifyContent: 'flex-end'}} style={{flex: 1, height: '100%'}} />
                    </View>
                  </OTSession>
                }
              </View>
              <View style={{width: '100%', height: '100%', position:'absolute', justifyContent: 'space-between'}}>
                <Image
                  style={{width: '100%', height: '40%'}}
                  source={IMAGE_GRAD1}
                  resizeMode='stretch'
                />
                <Image
                  style={{width: '100%', height: '50%'}}
                  source={IMAGE_GRAD2}
                  resizeMode='stretch'
                />
              </View>
              <View style={styles.view_control}>
                <TouchableOpacity onPress={()=>this.gotoChatroom()}>
                  <Image
                    style={styles.image_button}
                    source={ICON_JEWEL}
                    resizeMode='stretch'
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={styles.image_button}
                    source={ICON_VIDEO}
                    resizeMode='stretch'
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.gotoMain()}>
                  <Image
                    style={styles.image_button}
                    source={ICON_CALL}
                    resizeMode='stretch'
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={styles.image_button}
                    source={ICON_AUDIO}
                    resizeMode='stretch'
                  />
                </TouchableOpacity>
              </View>
            </View>
            <RoomHeader
              eTime='03 m 1 s'
              eTimeTag='elapsed time'
              onPressRight={()=>console.warn('menu')}
            />
            <Image
              style={styles.view_bar}
              source={IMAGE_BAR}
              resizeMode='cover'
            />
            <View style={styles.view_tab}>
              <View>
                <Text style={{color: 'white', marginBottom: 10, fontSize: 16}}>Chat room</Text>
                <View style={{flexDirection:'row'}}>
                  <Text style={{color: COLOR_GOLD, fontSize: 13}}>44,000</Text>
                  <Text style={{color: COLOR_TEXT_GRAY, fontSize: 13, marginLeft: 5}}>FANS IN THE ROOM</Text>
                </View>
              </View>
              <View style={{flexDirection:'row', alignItems: 'center'}}>
                <Image
                  style={{width:10, height:10}}
                  source={ICON_DOT}
                  resizeMode='contain'
                />
                <Text style={{color: 'white', fontSize: 16, marginLeft: 10}}>Live</Text>
              </View>
            </View>
            <View style={styles.view_chatlist}>
              <FlatList
                keyExtractor={(item, index) => `${index}`}
                data={this.state.stars}
                renderItem={this.renderItemChatList.bind(this)}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.bottom_tab}  >
          <Avatar
            rounded
            size={58}
            alignSelf='center'
            source={IMAGE_KANGANA}
          />
          <Input
            containerStyle={{flex:1, marginHorizontal: 10, alignSelf: 'center'}}
            inputContainerStyle={{borderBottomWidth: 0}}
            inputStyle={{color: 'white', fontSize: 15}}
            // onChangeText={(nickName) => this.setState({nickName: nickName.toLowerCase()})}
            underlineColorAndroid='transparent'
            // editable={false}
            placeholder={this.state.placeholder}
            placeholderTextColor='grey'
          />
        </View>
      </ImageBackground>
    )
  }  
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  image_background: {
    width: '100%',
    height: undefined,
    aspectRatio: 750 / 2602,
    position: 'absolute'
  },
  view_main: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center', 
  },
  view_video: {
    width: '100%',
    height: screenWidth*738/752,
    justifyContent: 'flex-end'
  },
  bottom_tab: {
    width: '100%',
    height: 78,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 25,
    backgroundColor: COLOR_TAB
  },
  view_stars: {
    width: '100%',
    height: (screenWidth*0.5)*(388/484),
    marginTop: 20,
    paddingLeft: 25
  },
  view_stars_item: {
    width: screenWidth*0.5, 
    height:(screenWidth*0.5)*(388/484), 
    marginRight: 15,
    borderRadius: 10, 
    marginBottom: 60,
    alignItems: 'center', 
    flexDirection: 'row'
  },
  image_item: {
    width:'100%', 
    height: '100%', 
    position: 'absolute', 
    borderRadius: 5
  },
  image_live: {
    width: screenWidth*0.1,
    height: screenWidth*0.1*44/80
  },
  view_bar: {
    width: '100%',
    height: 14
  },
  view_tab: {
    width: '100%',
    height: 78,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: COLOR_TAB,
  },
  view_chatlist: {
    flex:1, 
    width: '100%', 
    backgroundColor: 'rgba(0,0,0, 0.4)'
  },
  view_chatlist_item: {
    width: '100%', 
    height: 95, 
    alignItems: 'center', 
    flexDirection: 'row',
    paddingHorizontal: 25,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(255,255,255, 0.1)',
  },
  view_control: {
    width: '100%',
    height: '20%', 
    alignItems: 'center', 
    justifyContent: 'center', 
    flexDirection: 'row'
  },
  image_button: {
    width: 46,
    height: 46, 
    marginHorizontal: 15
  }
})

FanViewRoomScreen.contextType = AppContext;

FanViewRoomScreen.propTypes = {
  navigation: PropTypes.object
};