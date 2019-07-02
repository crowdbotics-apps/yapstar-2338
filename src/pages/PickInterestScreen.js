import React from 'react'
import Orientation from 'react-native-orientation'
import { SafeAreaView, StyleSheet, Image, ImageBackground, TouchableOpacity, View, ScrollView, FlatList, Text } from 'react-native'
import { Header, Input, Button } from 'react-native-elements'
import PropTypes from 'prop-types';
import { AppContext, Navbar } from '../components';
import { cStyles, isiOS, screenWidth } from './styles';
import { alert } from '../utils/Alert';
import Authentication from '../services/Authentication';

const IMAGE_BACKGROUND = require('app/assets/images/interests.png');
const IMAGE_BUTTON = require('app/assets/images/interests_btn.png');
const IMAGE_GRADIENT = require('app/assets/images/interests_gradient.png');
const ICON_SEARCH = require('app/assets/images/ic_search.png');
const ICON_BACK = require('app/assets/images/ic_back.png');

const IMAGE_CRICKET = require('app/assets/images/image_cricket.png');
const IMAGE_ART = require('app/assets/images/image_art.png');
const IMAGE_BOLLYWOOD = require('app/assets/images/image_bollywood.png');
const IMAGE_DANCE = require('app/assets/images/image_dance.png');
const IMAGE_FILM = require('app/assets/images/image_film.png');
const IMAGE_SPORTS = require('app/assets/images/image_sports.png');
const IMAGE_STANDUP = require('app/assets/images/image_standup.png');

export default class PickInterestScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedItems: [],
      keyword: '',
      placeholder: 'Search your interests, hobbies etc',
      uid: this.props.navigation.getParam('uid'),
      nickName: this.props.navigation.getParam('nickName'),
      displayName: this.props.navigation.getParam('displayName'),
      email: this.props.navigation.getParam('email'),
      phoneNumber: this.props.navigation.getParam('phoneNumber'),
      photoURL: this.props.navigation.getParam('photoURL'),
      providerId: this.props.navigation.getParam('providerId'),
      categories_: [
        {
          name: 'CRICKET',
          image: IMAGE_CRICKET,
          selected: false
        },
        {
          name: 'BOLLYWOOD',
          image: IMAGE_BOLLYWOOD,
          selected: false
        },
        {
          name: 'ART & CRAFT',
          image: IMAGE_ART,
          selected: false
        },
        {
          name: 'DANCE',
          image: IMAGE_DANCE,
          selected: false
        },
        {
          name: 'STAND UP',
          image: IMAGE_STANDUP,
          selected: false
        },
        {
          name: 'SPORTS',
          image: IMAGE_SPORTS,
          selected: false
        },
        {
          name: 'ART & CRAFT',
          image: IMAGE_ART,
          selected: false
        },
        {
          name: 'FILM',
          image: IMAGE_FILM,
          selected: false
        }
      ],
      categories: [
        {
          name: 'CRICKET',
          image: IMAGE_CRICKET,
          selected: false
        },
        {
          name: 'BOLLYWOOD',
          image: IMAGE_BOLLYWOOD,
          selected: false
        },
        {
          name: 'ART & CRAFT',
          image: IMAGE_ART,
          selected: false
        },
        {
          name: 'DANCE',
          image: IMAGE_DANCE,
          selected: false
        },
        {
          name: 'STAND UP',
          image: IMAGE_STANDUP,
          selected: false
        },
        {
          name: 'SPORTS',
          image: IMAGE_SPORTS,
          selected: false
        },
        {
          name: 'ART & CRAFT',
          image: IMAGE_ART,
          selected: false
        },
        {
          name: 'FILM',
          image: IMAGE_FILM,
          selected: false
        }
      ],
    }
  }
  componentDidMount() {
    Orientation.lockToPortrait();
  }
  onPressNextButton() {
    var selectedItems = []
    this.state.categories.map((category, index) => {
      if (category.selected) {
        selectedItems.push(category.name)
      }
    })
    if (selectedItems.length < 2) {
      alert('Please choose at least 2 interests');
      return
    } else {
      this.setState({
        selectedItems: selectedItems
      }, ()=>{
        console.warn(this.state.selectedItems)
        this.signup()
      })
    }
    // this.props.navigation.navigate('stars')
  }

  signup = async () => {
    this.props.navigation.navigate('pick_star')
    // await this.context.showLoading();
    // const done = await Authentication.signup(this.state);
    // await this.context.hideLoading();
    // console.warn(done)
    // if (done) {
    //   this.props.navigation.navigate('pick_star');
    // } else {
    //   alert('Error Occurs. Please try again.')
    // }
  }

  onPressItem(index) {
    this.state.categories[index].selected = !this.state.categories[index].selected
    this.setState({
      categories: this.state.categories
    })
  }

  onSearchBy(keyword) {
    this.context.showLoading();
    this.setState({keyword: keyword})
    if (keyword == '') {
      this.setState({categories: this.state.categories_}, () => {
        this.context.hideLoading()
      })
      return
    }
    var categories = this.state.categories_.filter((item)=>{return item.name.toLowerCase().includes(keyword.toLowerCase())})
    this.setState({categories: categories}, () => {
      this.context.hideLoading()
    })
  }
 
  renderItemLeft({item, index}) {
    return(
      index%2===0 &&
      <TouchableOpacity style={item.selected?styles.view_item_select:styles.view_item} onPress={() => this.onPressItem(index)}>
        <Image source={item.image} style={styles.image_item} resizeMode='stretch'/>
        <Image source={IMAGE_GRADIENT} style={styles.image_item} resizeMode='stretch'/>
        <View style={styles.view_text}>
          <View style={styles.view_text_item}>
            <Text style={styles.text_item}>
              {item.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  renderItemRight({item, index}) {
    return(
      index%2===1 &&
      <TouchableOpacity style={item.selected?styles.view_item_select:styles.view_item} onPress={() => this.onPressItem(index)}>
        <Image source={item.image} style={styles.image_item} resizeMode='stretch'/>
        <Image source={IMAGE_GRADIENT} style={styles.image_item} resizeMode='stretch'/>
        <View style={styles.view_text}>
          <View style={styles.view_text_item}>
            <Text style={styles.text_item}>
              {item.name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    return(
      <ImageBackground style={styles.container} source={IMAGE_BACKGROUND}>
        <View style={styles.view_main}>
          <Header
            containerStyle={cStyles.headerContainer}
            placement="left"
            leftComponent= {
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('nickname')}>
                <Image
                  style={{width:20, height:20}}
                  source={ICON_BACK}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            }
            centerComponent={{ text: 'Your Interests', style: cStyles.headerText }}
            rightComponent={{ icon: 'menu', color: '#fff', }} //onPress: ()=> this.props.navigation.openDrawer()
          />
          <Text style={styles.text_search}>
            SEARCH YOUR INTERESTS
          </Text>
          <View style={styles.view_input}>
            <Input
              containerStyle={styles.input}
              inputContainerStyle={{borderBottomWidth: 0}}
              inputStyle={{color: 'white', paddingTop: isiOS? 10:0, fontSize: 14}}
              onChangeText={(keyword) => this.onSearchBy(keyword)}
              underlineColorAndroid='transparent'
              placeholder={this.state.placeholder}
              placeholderTextColor='grey'
              value={this.state.keyword}
              leftIcon={
                <Image source={ICON_SEARCH} style={{width: 20, height: 20, marginRight: 10, marginTop: isiOS? 10:0}}/>
              }
            />
          </View>
          <ScrollView
            style={{flex:1, width: '100%', marginTop: 10}}>
              <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', paddingHorizontal:25}}>
                <FlatList
                  style={{paddingBottom: 20}}
                  keyExtractor={(item, index) => `${index}`}
                  data={this.state.categories}
                  renderItem={this.renderItemLeft.bind(this)}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                />
                <View style={{width: 15}}/>
                <FlatList
                  style={{marginTop: 40, paddingBottom: 20}}
                  keyExtractor={(item, index) => `${index}`}
                  data={this.state.categories}
                  renderItem={this.renderItemRight.bind(this)}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                />
              </View>
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.view_bottom_tab} onPress={()=>this.onPressNextButton()}>
          <ImageBackground source={IMAGE_BUTTON} style={styles.button_tab} resizeMode='stretch'>
            {/* <Image source={IMAGE_TAB_IMG} style={{height: 30}} resizeMode='contain'/> */}
          </ImageBackground>
        </TouchableOpacity>
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
  view_button: {
    width: '100%',
    height: '100%',
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    position: 'absolute'
  },
  button: {
    width: screenWidth-50,

    height: undefined,
    aspectRatio: 702 / 166,
  },
  text_search: {
    color: '#F8D099', 
    marginLeft: 25, 
    marginTop: 10, 
    fontSize: 16, 
    textAlign: 'left', 
    alignSelf: 'flex-start'
  },
  view_input: {
    width: '100%', 
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 25, 
  },
  input: {
    height: 50, 
    borderColor: 'grey', 
    borderWidth: 2, 
    borderRadius: 5, 
  },
  view_item: {
    width: (screenWidth-65)/2, 
    height:((screenWidth-65)/2)*(350/312), 
    borderRadius: 10, 
    marginBottom: 15,
    alignItems: 'center', 
  },
  view_item_select: {
    width: (screenWidth-65)/2, 
    height:((screenWidth-65)/2)*(350/312), 
    borderRadius: 10, 
    marginBottom: 15,
    alignItems: 'center', 
    borderWidth: 2,
    borderColor:'#F8D099',
  },
  image_item: {
    width:'100%', 
    height: '100%', 
    position: 'absolute', 
    borderRadius: 5
  },
  view_text: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  view_text_item: {
    width: '90%', 
    height: 30,
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#666A', 
    borderRadius: 5, 
    justifyContent: 'center'
  },
  text_item: {
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white', 
  },
  view_bottom_tab: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    paddingHorizontal: 15
  },
  button_tab: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

PickInterestScreen.contextType = AppContext;

PickInterestScreen.propTypes = {
  navigation: PropTypes.object
};