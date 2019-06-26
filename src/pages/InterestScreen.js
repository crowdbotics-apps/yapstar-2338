import React from 'react'
import Orientation from 'react-native-orientation'
import { SafeAreaView, StyleSheet, Image, ImageBackground, TouchableOpacity, View, Platform, ScrollView, FlatList, Text } from 'react-native'
import { Header, Input, Button } from 'react-native-elements'
import PropTypes from 'prop-types';
import { AppContext, Navbar } from '../components';
import { cStyles, screenWidth } from './styles';

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

export default class InterestScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      keyword: '',
      placeholder: 'Search your interests, hobbies etc',
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
    this.props.navigation.navigate('stars')
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
        <View style={styles.view_text_item}>
          <Text style={styles.text_item}>
            {item.name}
          </Text>
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
        <View style={styles.view_text_item}>
          <Text style={styles.text_item}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    return(
      <SafeAreaView style={styles.container} >
        <Image source={IMAGE_BACKGROUND} style={styles.image_background}/>
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
            rightComponent={{ icon: 'menu', color: '#fff', onPress: ()=>console.warn('reeeeeeeeeeee') }}
          />
          <Text style={styles.text_search}>
            SEARCH YOUR INTERESTS
          </Text>
          <View style={styles.view_input}>
            <Input
              containerStyle={styles.input}
              inputContainerStyle={{borderBottomWidth: 0}}
              inputStyle={{color: 'white'}}
              onChangeText={(keyword) => this.onSearchBy(keyword)}
              underlineColorAndroid='transparent'
              placeholder={this.state.placeholder}
              placeholderTextColor='grey'
              value={this.state.keyword}
              leftIcon={
                <Image source={ICON_SEARCH} style={{width: 20, height: 20, marginRight: 10}}/>
              }
            />
          </View>
          <ScrollView
            style={{flex:1, width: '100%', marginTop: 20}}>
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
        <View style={styles.view_button}>
          <TouchableOpacity onPress={()=>this.onPressNextButton()}>
            <Image source={IMAGE_BUTTON} style={styles.button}/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }  
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
    width: '82%',
    height: undefined,
    aspectRatio: 702 / 166,
  },
  text_search: {
    color: '#F8D099', 
    marginLeft: 25, 
    marginTop: 20, 
    fontSize: 16, 
    textAlign: 'left', 
    alignSelf: 'flex-start'
  },
  view_input: {
    width: '100%', 
    marginTop: 20,
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
    borderColor:'#F8D099'
  },
  image_item: {
    width:'100%', 
    height: '100%', 
    position: 'absolute', 
    borderRadius: 5
  },
  view_text_item: {
    width: '100%', 
    height: '100%', 
    alignItems: 'center', 
    justifyContent: 'flex-end'
  },
  text_item: {
    width: '90%', 
    textAlign: 'center',
    paddingVertical: 10,
    marginBottom: 15, 
    backgroundColor: '#666A', 
    borderRadius: 5, 
    color: 'white', 
  }
})

InterestScreen.contextType = AppContext;

InterestScreen.propTypes = {
  navigation: PropTypes.object
};