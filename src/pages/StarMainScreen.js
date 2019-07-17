import React from 'react'
import Orientation from 'react-native-orientation'
import { SafeAreaView, StyleSheet, Image, ImageBackground, TouchableOpacity, View, Platform, ScrollView, FlatList, Text, } from 'react-native'
import { Header, Input, Button, Avatar } from 'react-native-elements'
import PropTypes from 'prop-types';
import { AppContext, Navbar } from '../components';
import { cStyles, screenWidth } from './styles';
import firebase from 'react-native-firebase'
const auth = firebase.auth();
const firestore = firebase.firestore()

const historyArchive = firebase.functions().httpsCallable('historyArchive');
const downloadArchive = firebase.functions().httpsCallable('downloadArchive');

const IMAGE_BACKGROUND = require('app/assets/images/starmain_bg.png');
const IMAGE_BOTTOM_TAB = require('app/assets/images/starmain_bottom.png');
const IMAGE_KANGANA = require('app/assets/images/image_kangana.png');
const IMAGE_THUMBS= require('app/assets/images/starmain_thumbs.png');
const IMAGE_UPCOMING= require('app/assets/images/starmain_upcoming.png');

const IMAGE_RECT = require('app/assets/images/chatview_grad2.png');
const IMAGE_SAMPLE = require('app/assets/images/image_priyanka.png');

const ICON_BELL = require('app/assets/images/ic_bell.png');
const ICON_RECODER = require('app/assets/images/ic_recoder.png');
const ICON_CAMERA = require('app/assets/images/ic_camera.png');
const ICON_HOME = require('app/assets/images/ic_tab_home.png');
const ICON_SEARCH = require('app/assets/images/ic_search.png');
const ICON_GROUP = require('app/assets/images/ic_tab_group.png');
const ICON_PERSON = require('app/assets/images/ic_tab_person.png');
const ICON_BROADCAST = require('app/assets/images/ic_broadcast.png');
const ICON_PENCIL = require('app/assets/images/ic_pencil.png');
const ICON_PLUS = require('app/assets/images/ic_plus.png');
const ICON_MORE = require('app/assets/images/ic_more.png');
const ICON_HEART = require('app/assets/images/ic_heart.png');
const ICON_MAIL = require('app/assets/images/ic_mail.png');
const ICON_EYE = require('app/assets/images/ic_eye.png');
const ICON_SHARE = require('app/assets/images/ic_share.png');
const ICON_PLAY = require('app/assets/images/ic_play.png');

const COLOR_GOLD = '#F8D099'
const COLOR_POST = '#5e4d64'
const COLOR_STAR_BORDER = '#707070'
const COLOR_TEXT = '#5e4d64'

export default class StarMainScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isPlus: true,
      placeholder: 'Post something new ...',
      archiveList: [],
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
  componentDidMount() {
    Orientation.lockToPortrait();
    this.getArchiveList()
  }

  getArchiveList() {
    try {
      this.context.showLoading();
      var data = {
        offset: 0,
        count: 5,
      }
      historyArchive(data)
      .then(result => {
        console.warn(result)
        this.context.hideLoading();
        if (result.data.success) {
          console.warn(result.data)
          this.setState({
            archiveList: result.data.archives
          })
        } else {
          console.warn(result.data)
        }
      })
      .catch(err => {
        this.context.hideLoading();
      })
    } catch (e) {
      this.context.hideLoading();
      console.warn(e)
    }
  }

  getArchiveLink() {
    try {
      this.context.showLoading();
      var data = {
        archiveId: this.state.archiveList[0].id
      }
      downloadArchive(data)
      .then(result => {
        console.warn(result)
        this.context.hideLoading();
        if (result.data.success) {
          console.warn(result.data)
        } else {
          console.warn(result.data)
        }
      })
      .catch(err => {
        this.context.hideLoading();
      })
    } catch (e) {
      this.context.hideLoading();
      console.warn(e)
    }

  }

  renderItemUpcoming({item, index}) {
    return(
      <View style={styles.view_upcoming_item} onPress={() => console.warn(index)}>
        <Image source={IMAGE_UPCOMING} style={styles.image_item} resizeMode='stretch'/>
        <View style={{flex: 1, width: '100%', height: '100%', padding: 10, flexDirection: 'row', justifyContent: 'center'}}>
          <Avatar
            rounded
            size={45}
            alignSelf='center'
            source={IMAGE_KANGANA}
          />
          <View style={{height: '100%', justifyContent: 'center', marginLeft: 10}}>
            <Text style={{color: COLOR_GOLD, fontSize: 13}}>UPCOMING</Text>
            <Text style={{color: COLOR_POST, fontSize: 13, marginTop: 5}}>Harsha</Text>
          </View>
          <View style={{flex:1, height: '100%', alignItems:'flex-end', justifyContent: 'center', paddingRight: 10}}>
            <Text style={{color: COLOR_POST, fontSize: 11}}>Your call stars in:</Text>
            <Text style={{color: COLOR_GOLD, fontSize: 16, marginTop: 5}}>1h 30m 1s</Text>
          </View>
        </View>
      </View>
    )
  }
  renderItemLive({item, index}) {
    return(
      <TouchableOpacity style={styles.view_live_item} onPress={() => console.warn(index)}>
        <Avatar
          rounded
          size={54}
          alignSelf='center'
          source={IMAGE_KANGANA}
        />
        <View style={{width:'100%', height:'100%', position:'absolute', alignItems: 'flex-end'}}>
          {this.state.isPlus && <Image source={ICON_PLUS} style={{width:20, height:20}}/>}
        </View>
      </TouchableOpacity>
    )
  }
  renderItemStar({item, index}) {
    return(
      <TouchableOpacity style={styles.view_stars_item} onPress={() => console.warn(index)}>
        <Image source={item.image} style={styles.image_item} resizeMode='cover'/>
        <Image source={IMAGE_RECT} style={styles.image_rect} resizeMode='stretch'/>
        <View style={{width: '100%', height: '100%', padding: 5, justifyContent:'flex-end'}}>
       
        </View>
      </TouchableOpacity>
    )
  }
  renderItemVideoList({item, index}) {
    return(
      <View style={styles.view_videolist_item}>
        <View style={{width: '100%', height: 34, flexDirection: 'row', justifyContent: 'space-between', marginTop: 15}}>
          <Image source={item.image} style={{width: 34, height: 34, alignSelf: 'center',  borderRadius: 5}} resizeMode='cover'/>
          <View style={{flex: 1, justifyContent: 'center', paddingLeft: 20}}>
            <Text style={{color: 'white', fontSize: 16}} numberOfLines={1}>Ranveer Singh</Text>
          </View>
          <Image
            style={{width:20, height:20}}
            source={ICON_MORE}
            resizeMode='contain'
          />
        </View>
        <Text style={{color: '#595558', fontSize: 16, marginTop: 10}} numberOfLines={2}>Upcoming auction for a one-to-one meeting with the one and only Bollywood icon.</Text>
        <ImageBackground source={IMAGE_THUMBS} style={{width:'100%', height: (screenWidth-50)*367/652,  borderRadius: 5, borderWidth:1, borderColor: COLOR_STAR_BORDER, overflow: 'hidden', marginTop:10, alignItems: 'center', justifyContent: 'space-between'}} resizeMode='stretch'>
          <Text></Text>
          <TouchableOpacity onPress={()=>this.getArchiveLink()}>
          <Image
            style={{width:45, height:45}}
            source={ICON_PLAY}
            resizeMode='contain'
          />
          </TouchableOpacity>
          <Text style={{width: '100%',color: 'white', fontSize: 14, paddingLeft: 5, paddingBottom: 5}} numberOfLines={1}>19:45</Text>
        </ImageBackground>
        <View style={{width:'100%', height: 20, marginTop:20, marginBottom: 15, flexDirection:'row', justifyContent: 'center'}}>
          <Image
            style={{width:25, height:20}}
            source={ICON_HEART}
            resizeMode='contain'
          />
          <Text style={{color: COLOR_GOLD, fontSize: 16, marginLeft: 5}} numberOfLines={1}>12K</Text>
          <Image
            style={{width:25, height:20, marginLeft: 20}}
            source={ICON_MAIL}
            resizeMode='contain'
          />
          <Text style={{color: COLOR_GOLD, fontSize: 16, marginLeft: 5}} numberOfLines={1}>4K</Text>
          <Image
            style={{width:25, height:20, marginLeft: 20}}
            source={ICON_EYE}
            resizeMode='contain'
          />
          <Text style={{color: COLOR_GOLD, fontSize: 16, marginLeft: 5}} numberOfLines={1}>4K</Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Image
              style={{width:25, height:20}}
              source={ICON_SHARE}
              resizeMode='contain'
            />
          </View>
        </View>
      </View>
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
            <View style={styles.view_upcoming}>
              <FlatList
                horizontal
                keyExtractor={(item, index) => `${index}`}
                data={this.state.stars}
                renderItem={this.renderItemUpcoming.bind(this)}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.view_post}>
              <Avatar
                rounded
                size={45}
                marginLeft = {15}
                alignSelf='center'
                source={ICON_PENCIL}
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
              <TouchableOpacity style={{width:20, height:20, alignSelf: 'center', marginRight:20}}>
                <Image 
                  style={{width:20, height:20}}
                  source={ICON_RECODER}
                  resizeMode='contain'/>
              </TouchableOpacity>
              <TouchableOpacity style={{width:20, height:20, alignSelf: 'center'}}>
                <Image 
                  style={{width:20, height:20}}
                  source={ICON_CAMERA}
                  resizeMode='contain'/>
              </TouchableOpacity>
            </View>
            <Text style={{marginTop:20, color:'white', marginLeft:30, fontSize:16}}>
              Live
            </Text>
            <View style={styles.view_live}>
              <FlatList
                horizontal
                keyExtractor={(item, index) => `${index}`}
                data={this.state.stars}
                renderItem={this.renderItemLive.bind(this)}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.view_stars}>
              <FlatList
                horizontal
                keyExtractor={(item, index) => `${index}`}
                data={this.state.stars}
                renderItem={this.renderItemStar.bind(this)}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            
            <View style={styles.view_videolist}>
              <FlatList
                keyExtractor={(item, index) => `${index}`}
                data={this.state.stars}
                renderItem={this.renderItemVideoList.bind(this)}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </ScrollView>
        </View>
      
        <ImageBackground source={IMAGE_BOTTOM_TAB} style={styles.button_tab} resizeMode='stretch'>
          <TouchableOpacity>
            <Image
              style={{width:25, height:25, marginTop:48}}
              source={ICON_HOME}
              resizeMode='contain'
            />              
          </TouchableOpacity>
          <TouchableOpacity> 
            <Image
              style={{width:25, height:25, marginTop:48}}
              source={ICON_SEARCH}
              resizeMode='contain'
            />             
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('starprepare')}> 
            <Image
              style={{width:45, height:45, marginTop:15}}
              source={ICON_BROADCAST}
              resizeMode='contain'
            />             
          </TouchableOpacity>
          <TouchableOpacity> 
            <Image
              style={{width:30, height:30, marginTop:45}}
              source={ICON_GROUP}
              resizeMode='contain'
            />             
          </TouchableOpacity>
          <TouchableOpacity>   
            <Image
              style={{width:25, height:25, marginTop:48}}
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
  button_tab: {
    width: screenWidth-30,
    height: 100,
    flexDirection: 'row',
    // alignItems: 'center',
    marginHorizontal: 15,
    position: 'absolute',
    justifyContent: 'space-around',
  },
  view_upcoming: {
    width: '100%',
    height: 66,
    paddingLeft: 25
  },
  view_upcoming_item: {
    width: 296, 
    height: 66,
    marginRight: 15,
    alignItems: 'center', 
    flexDirection: 'row'
  },
  view_live: {
    width: '100%',
    height: 60,
    marginTop: 5,
    paddingLeft: 25
  },
  view_live_item: {
    width: 60,
    height: 60,
    marginRight: 20,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  view_stars: {
    width: '100%',
    height: 179,
    marginTop: 20,
    paddingLeft: 25
  },
  view_stars_item: {
    width: 143, 
    height:179, 
    marginRight: 15,
    borderRadius: 10, 
    borderWidth: 1,
    borderColor: COLOR_STAR_BORDER,
    overflow: 'hidden',
    marginBottom: 60,
    alignItems: 'center', 
    justifyContent: 'flex-end'
  },
  image_item: {
    width:'100%', 
    height: '100%', 
    position: 'absolute', 
    borderRadius: 5
  },
  image_rect: {
    width:'100%', 
    height: '30%', 
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
    marginTop: 20,
    marginLeft: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 25,
    backgroundColor: COLOR_POST,
    borderBottomLeftRadius: 39,
    borderTopLeftRadius: 39
  },
  view_videolist: {
    flex:1, 
    width: '100%', 
    marginTop: 15,
    backgroundColor: 'rgba(0,0,0, 0.4)'
  },
  view_videolist_item: {
    width: '100%', 
    alignItems: 'center', 
    paddingHorizontal: 25,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(255,255,255, 0.1)',
  },
})

StarMainScreen.contextType = AppContext;

StarMainScreen.propTypes = {
  navigation: PropTypes.object
};