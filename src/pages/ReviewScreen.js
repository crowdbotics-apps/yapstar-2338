import React from 'react'
import Orientation from 'react-native-orientation'
import { StyleSheet, Image, ImageBackground, TouchableOpacity, View, Text, findNodeHandle, Platform, Alert, ScrollView } from 'react-native'
import StarRating from 'react-native-star-rating';
import { Input } from 'react-native-elements'
import PropTypes from 'prop-types';
import { AppContext } from '../components';
import { isiOS, screenWidth, screenHeight } from './styles';
import firebase from 'react-native-firebase';

const auth = firebase.auth();
const firestore = firebase.firestore()

const IMAGE_BACKGROUND = require('app/assets/images/interests.png');
const IMAGE_BOTTOM_TAB = require('app/assets/images/tab_bottom.png');
const IMAGE_MARK = require('app/assets/images/review_mark.png');
const IMAGE_BUTTON = require('app/assets/images/review_button.png');

const ICON_CLOSE = require('app/assets/images/ic_close.png');
const ICON_HOME = require('app/assets/images/ic_tab_home.png');
const ICON_SEARCH = require('app/assets/images/ic_search.png');
const ICON_GROUP = require('app/assets/images/ic_tab_group.png');
const ICON_PERSON = require('app/assets/images/ic_tab_person.png');

const COLOR_BACKGROUND = '#101010' 
const COLOR_BORDER = '#707070'
const COLOR_GOLD = '#F8D099'
const COLOR_INPUT_BG = '#222222'
const COLOR_INPUT_BORDER = '#394848'

export default class ReviewScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      starCount: 3,
      placeholder: 'Please type in your feedback here',
      feedback: '',
      receiverid: this.props.navigation.getParam('starId', ''),
    }
  }
  componentDidMount() {
    Orientation.lockToPortrait();
    this.context.hideLoading();
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  onSubmit() {
    console.warn('submit')
    this.context.showLoading()
    firestore.collection('reviews').add({
      senderid: auth.currentUser.uid,
      receiverid: this.state.receiverid,
      rating: this.state.starCount,
      feedback: this.state.feedback,
      created_at: new Date()
    })
    .then(() => {
      this.context.hideLoading()
      Alert.alert('Notice', 'You give a feedback successfully.')
      this.props.navigation.navigate('fanStack')
    })
    .catch(() => {
      this.context.hideLoading()
      Alert.alert('Notice', 'Error occurs. Please try again.')
    })

  }
  onClose() {
    this.props.navigation.navigate('fanStack');
  }
 
  render() {
    return(
      <ImageBackground source={IMAGE_BACKGROUND} style={styles.container} blurRadius={30} >
        <ScrollView style={{width: '100%', height: screenHeight-80}}>
          <View style={styles.view_main}>
            <ImageBackground style={styles.view_board}>
              <Image
                style={{width:40, height:57*40/55, marginTop: 30}}
                source={IMAGE_MARK}
                resizeMode='contain'
              /> 
              <Text style={{color: COLOR_GOLD, fontSize: 15, marginTop: 15}}>Please rate your experience</Text>
              <StarRating
                containerStyle={{marginTop: 20}}
                starStyle={{marginHorizontal: 10}}
                maxStars={5}
                emptyStarColor={'white'}
                fullStarColor={COLOR_GOLD}
                halfStarColor={COLOR_GOLD}
                starSize={25}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
              <Text style={{width: '75%', color: 'white', fontSize: 14, marginTop: 20, textAlign: 'center'}}>
                Your feedback will help improve the overall experience of the platform.
              </Text>
              <Input
                containerStyle={{marginTop: 20, borderRadius: 2, width: '80%', height: 80, backgroundColor: COLOR_INPUT_BG, borderWidth: 1, borderColor: COLOR_INPUT_BORDER}}
                inputContainerStyle={{borderBottomWidth: 0}}
                inputStyle={{color: 'white', padding: isiOS? 5:5, fontSize: 14}}
                onChangeText={(feedback) => this.setState({feedback: feedback})}
                underlineColorAndroid='transparent'
                placeholder={this.state.placeholder}
                placeholderTextColor='grey'
                multiline={true}
                value={this.state.feedback}
              />
              <TouchableOpacity style={{width:'80%', height: (screenWidth-50)*0.8*73/510, marginTop: 20, marginBottom: 30}}  onPress={()=>this.onSubmit()}>
                <ImageBackground
                  style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}
                  source={IMAGE_BUTTON}
                  resizeMode='contain'
                >
                  <Text style={{color:'white', fontSize: 14}}>Submit</Text>
                </ImageBackground>
              </TouchableOpacity>
            </ImageBackground>
            <TouchableOpacity onPress={()=>this.onClose()}>
              <Image
                style={{width: 40, height: 40, marginTop: 20}}
                source={ICON_CLOSE}
                resizeMode='contain'
              />              
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ImageBackground source={IMAGE_BOTTOM_TAB} style={styles.button_tab} resizeMode='stretch' > 
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
    height: screenHeight-80,
    alignItems: 'center', 
    justifyContent: 'center',
    paddingHorizontal: 25
  },
  view_board: {
    width: '100%', 
    // height: screenHeight*0.6, 
    backgroundColor: COLOR_BACKGROUND, 
    borderWidth: 1, 
    borderRadius: 5, 
    borderColor: COLOR_BORDER, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  button_tab: {
    width: screenWidth-30,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    justifyContent: 'space-around',
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})

ReviewScreen.contextType = AppContext;

ReviewScreen.propTypes = {
  navigation: PropTypes.object
};