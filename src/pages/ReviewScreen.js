import React from 'react'
import Orientation from 'react-native-orientation'
import { StyleSheet, Image, ImageBackground, TouchableOpacity, View, Text, findNodeHandle, Platform } from 'react-native'
import StarRating from 'react-native-star-rating';
import { Input } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types';
import { AppContext } from '../components';
import { isiOS, screenWidth, screenHeight } from './styles';

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
      viewRef: null
    }
  }
  componentDidMount() {
    Orientation.lockToPortrait();
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
      feedback: '',
    });
  }
  onSubmit() {
    console.warn('submit')
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) }, ()=>{console.warn(this.state.viewRef)});
  }

  onTextViewLoaded() {
    this.setState({ viewRef: findNodeHandle(this.viewRef) });
  }
 
  render() {
    return(
      
      <ImageBackground source={IMAGE_BACKGROUND} style={styles.container} blurRadius={30} >
          <View style={styles.view_main}>
            <View style={{height: screenHeight*0.1}}/>
            <ImageBackground style={styles.view_board}>
              <Image
                style={{width:55, height:57, marginTop: 30}}
                source={IMAGE_MARK}
                resizeMode='contain'
              /> 
              <Text style={{color: COLOR_GOLD, fontSize: 16, marginTop: 20}}>Please rate your experience</Text>
              <StarRating
                containerStyle={{marginTop: 20}}
                starStyle={{marginHorizontal: 10}}
                maxStars={5}
                emptyStarColor={'white'}
                fullStarColor={COLOR_GOLD}
                halfStarColor={COLOR_GOLD}
                starSize={30}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
              <Text style={{width: '75%', color: 'white', fontSize: 14, marginTop: 30, textAlign: 'center'}}>
                Your feedback will help improve the overall experience of the platform.
              </Text>
              <Input
                containerStyle={{marginTop: 25, borderRadius: 2, width: '80%', height: 100, backgroundColor: COLOR_INPUT_BG, borderWidth: 1, borderColor: COLOR_INPUT_BORDER}}
                inputContainerStyle={{borderBottomWidth: 0}}
                inputStyle={{color: 'white', padding: isiOS? 5:5, fontSize: 14}}
                onChangeText={(feedback) => this.setState({feedback: feedback})}
                underlineColorAndroid='transparent'
                placeholder={this.state.placeholder}
                placeholderTextColor='grey'
                multiline={true}
                value={this.state.feedback}
              />
              <TouchableOpacity style={{width:'80%', height: (screenWidth-50)*0.8*73/510, marginTop: 30,}}  onPress={()=>this.onSubmit()}>
                <ImageBackground
                  style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}
                  source={IMAGE_BUTTON}
                  resizeMode='contain'
                >
                  <Text style={{color:'white', fontSize: 16}}>Submit</Text>
                </ImageBackground>
              </TouchableOpacity>
            </ImageBackground>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('chatlive')}>
              <Image
                style={{width:50, height:50, marginTop: 30}}
                source={ICON_CLOSE}
                resizeMode='contain'
              />              
            </TouchableOpacity>
          </View>
        
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
    height: '100%',
    alignItems: 'center', 
    paddingHorizontal: 25
  },
  view_board: {
    width: '100%', 
    height: screenHeight*0.6, 
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