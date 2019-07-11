import React from 'react'
import Orientation from 'react-native-orientation'
import { SafeAreaView, StyleSheet, Image, ImageBackground, TouchableOpacity, View, Platform, ScrollView, FlatList, Text, Alert } from 'react-native'
import { Header, Input, Button, Avatar } from 'react-native-elements'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import PropTypes from 'prop-types';
import { AppContext, Navbar } from '../components';
import { cStyles, screenWidth } from './styles';
import firebase from 'react-native-firebase';
import FastImage from 'react-native-fast-image'

const auth = firebase.auth()
const firestore = firebase.firestore()
const createToken = firebase.functions().httpsCallable('createToken');

const IMAGE_BACKGROUND = require('app/assets/images/interests.png');
const IMAGE_BOTTOM_TAB = require('app/assets/images/fanmain_tab.png');
const IMAGE_RECT = require('app/assets/images/fanmain_rect.png');
const IMAGE_SAMPLE = require('app/assets/images/fanmain_sample1.png');
const ICON_BELL = require('app/assets/images/ic_bell.png');
const ICON_LIVE = require('app/assets/images/ic_live.png');
const ICON_CAMERA = require('app/assets/images/ic_camera.png');
const ICON_HOME = require('app/assets/images/ic_tab_home.png');
const ICON_SEARCH = require('app/assets/images/ic_search.png');
const ICON_GROUP = require('app/assets/images/ic_tab_group.png');
const ICON_PERSON = require('app/assets/images/ic_tab_person.png');

const IMAGE_KANGANA = require('app/assets/images/image_kangana.png');

const COLOR_TAB = '#F8D099'
const COLOR_TAB_TEXT = '#0F0614'
const COLOR_POST = '#5e4d64'

export default class FanMainScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 0,
      placeholder: 'Post something new ...',
      liveStars: [],
      stars: [
        {
          name: 'VIRAT KOHLI',
          image: IMAGE_SAMPLE,
          selected: false
        },
        {
          name: 'PRIYANKA CHOPRA',
          image: IMAGE_SAMPLE,
          selected: false
        },
        {
          name: 'AMITABH BACHCHAN',
          image: IMAGE_SAMPLE,
          selected: false
        },
        {
          name: 'PRIYANKA CHOPRA',
          image: IMAGE_SAMPLE,
          selected: false
        },
        {
          name: 'AMITABH BACHCHAN',
          image: IMAGE_SAMPLE,
          selected: false
        },
      ],
    }
  }

  componentWillUnmount() {
    if (this.unsubscript) {
      this.unsubscript()
    }
  }

  componentDidMount() {
    Orientation.lockToPortrait();
    this.onLoadingLiveStars()
  }

  onLoadingLiveStars() {
    if (this.unsubscript) {
      this.unsubscript()
      this.unsubscript = null
    }
    this.context.showLoading();
    this.unsubscript = firestore.collection('users').where('role', '==', 1).where('isLive', '==', true).onSnapshot(
      stars => {
        this.context.hideLoading();
        this.setState({liveStars: stars.docs})
      }
    )
  }

  gotoChatRoom(item) {
    this.context.showLoading();
    firestore.collection('sessions').where('publisherId', '==', item.id).get()
    .then(session => {      
      var data = {sessionId: session.docs[0].data().sessionId, role: 0}
      createToken(data)
      .then(result => {
        this.context.hideLoading();
        console.warn(result)
        this.props.navigation.navigate('fanView', {
          'starId': item.id, 
          'apiKey': session.docs[0].data().apiKey, 
          'sessionId': session.docs[0].data().sessionId, 
          'token': result.data.token})
      })
      .catch(err => {
        this.context.hideLoading();
        console.warn(err)
      })
    })
    .catch(err => {
      this.context.hideLoading();
      Alert.alert('notice', 'Star closed connection.')
    })
  }
 
  renderItemStar({item, index}) {
    console.warn(item.data().photoURL)
    return(
      <TouchableOpacity style={styles.view_stars_item} onPress={() => this.gotoChatRoom(item)}>
        <FastImage source={{uri: item.data().photoURL}} style={styles.image_item} resizeMode='cover'/>
        <Image source={IMAGE_RECT} style={styles.image_item} resizeMode='stretch'/>
        <View style={{width: '100%', height: '100%', padding: 5, justifyContent:'space-between'}}>
          <View style={{height: 20, justifyContent:'space-between', flexDirection:'row'}}>
            <Image
              style={styles.image_live}
              source={ICON_LIVE}
            />
            <Text style={{color: COLOR_TAB}}>15K watching</Text>
          </View>
          <Text style={{color: 'white'}}>11:22</Text>
        </View>
      </TouchableOpacity>
    )
  }
  renderItemChatList({item, index}) {
    return(
      <TouchableOpacity style={styles.view_chatlist_item} onPress={() => console.warn(index)}>
        <Image source={item.image} style={{width: 80, height: 80, alignSelf: 'center', marginRight: 20, borderRadius: 5}} resizeMode='cover'/>
        <View style={{flex:1, height: 80, justifyContent: 'space-between'}}>
          <Text style={{color: 'white', fontSize: 16}} numberOfLines={1}>Priyanka Chopra</Text>
          <Text style={{color: '#595558', fontSize: 13}} numberOfLines={1}>I`m atthe airport for an hour. AMA!</Text>
          <Text style={{color: '#454244', fontSize: 12, marginTop: 10}} numberOfLines={1}>Started streaming 20 mins ago</Text>
          <Text style={{color: COLOR_TAB, fontSize: 14}} numberOfLines={1}>5K watching *Premium</Text>
        </View>
      </TouchableOpacity>
    )
  }
  onChangeType(selectedIndex) {
    this.setState({type: selectedIndex})
  }
  render() {
    return(
      <ImageBackground source={IMAGE_BACKGROUND} style={styles.container} >
        <Header
          containerStyle={cStyles.headerContainer}
          placement="right"
          centerComponent= {
            <TouchableOpacity onPress={()=>console.warn('click bell')}>
              <Image
                style={{width:20, height:20}}
                source={ICON_BELL}
                resizeMode='contain'
              />
            </TouchableOpacity>
          }
          rightComponent={{ icon: 'menu', color: '#fff', onPress: ()=> this.props.navigation.openDrawer()}}
        />
          <View style={styles.view_main}>            
            <ScrollView>
              <View style={styles.view_tab}>
                <SegmentedControlTab
                  values={['LIVE', 'UPCOMING']}
                  selectedIndex={this.state.type}
                  onTabPress={this.onChangeType.bind(this)}
                  tabStyle={{borderColor: COLOR_TAB, backgroundColor: 'transparent'}}
                  tabTextStyle={{color: COLOR_TAB}}
                  activeTabStyle={{backgroundColor: COLOR_TAB}}
                  activeTabTextStyle={{color: COLOR_TAB_TEXT}}
                />
              </View>
              <View style={styles.view_stars}>
                <FlatList
                  horizontal
                  keyExtractor={(item, index) => `${index}`}
                  data={this.state.liveStars}
                  renderItem={this.renderItemStar.bind(this)}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              <View style={styles.view_post}  >
                <Avatar
                  rounded
                  size={58}
                  marginLeft = {10}
                  alignSelf='center'
                  source={IMAGE_KANGANA}
                />
                <Input
                  containerStyle={{flex:1, marginHorizontal: 10, alignSelf: 'center'}}
                  inputContainerStyle={{borderBottomWidth: 0}}
                  inputStyle={{color: 'white', fontSize: 15}}
                  // onChangeText={(nickName) => this.setState({nickName: nickName.toLowerCase()})}
                  underlineColorAndroid='transparent'
                  editable={false}
                  placeholder={this.state.placeholder}
                  placeholderTextColor='grey'
                />
                <TouchableOpacity style={{width:20, height:20, alignSelf: 'center'}}>
                  <Image 
                    style={{width:20, height:20}}
                    source={ICON_CAMERA}
                    resizeMode='contain'/>
                </TouchableOpacity>
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
        
          <ImageBackground source={IMAGE_BOTTOM_TAB} style={styles.button_tab} resizeMode='stretch'>
            <TouchableOpacity>
              <Image
                style={{width:25, height:25}}
                source={ICON_HOME}
                resizeMode='contain'
              />              
            </TouchableOpacity>
            <TouchableOpacity> 
              <Image
                style={{width:25, height:25}}
                source={ICON_SEARCH}
                resizeMode='contain'
              />             
            </TouchableOpacity>
            <TouchableOpacity> 
              <Image
                style={{width:30, height:30}}
                source={ICON_GROUP}
                resizeMode='contain'
              />             
            </TouchableOpacity>
            <TouchableOpacity>   
              <Image
                style={{width:25, height:25}}
                source={ICON_PERSON}
                resizeMode='contain'
              />           
            </TouchableOpacity>
          </ImageBackground>
        </ImageBackground>
    )
  }  
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
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
  button_tab: {
    width: screenWidth-30,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    justifyContent: 'space-around',
  },
  view_tab: {
    width: '70%',
    alignSelf: 'center'
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
  view_post: {
    width: screenWidth-25,
    height: 78,
    marginVertical: 20,
    marginLeft: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 25,
    backgroundColor: COLOR_POST,
    borderBottomLeftRadius: 39,
    borderTopLeftRadius: 39
  },
  view_chatlist: {
    flex:1, 
    width: '100%', 
    backgroundColor: 'rgba(0,0,0, 0.4)'
  },
  view_chatlist_item: {
    width: '100%', 
    height: 116, 
    alignItems: 'center', 
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(255,255,255, 0.1)',
  },
})

FanMainScreen.contextType = AppContext;

FanMainScreen.propTypes = {
  navigation: PropTypes.object
};