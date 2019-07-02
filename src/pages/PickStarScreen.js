import React from 'react'
import Orientation from 'react-native-orientation'
import { SafeAreaView, StyleSheet, Image, ImageBackground, TouchableOpacity, View, Platform, ScrollView, FlatList, Text } from 'react-native'
import { Header, Input, Button } from 'react-native-elements'
import PropTypes from 'prop-types';
import { AppContext, Navbar } from '../components';
import { cStyles, isiOS, screenWidth } from './styles';

const IMAGE_BACKGROUND = require('app/assets/images/interests.png');
const IMAGE_BUTTON = require('app/assets/images/stars_btn.png');
const IMAGE_GRADIENT = require('app/assets/images/interests_gradient.png');
const ICON_SEARCH = require('app/assets/images/ic_search.png');
const ICON_BACK = require('app/assets/images/ic_back.png');

const IMAGE_VIRAT = require('app/assets/images/image_virat.png');
const IMAGE_PRIYANKA = require('app/assets/images/image_priyanka.png');
const IMAGE_AMITABH = require('app/assets/images/image_amitabh.png');
const IMAGE_KANGANA = require('app/assets/images/image_kangana.png');
const IMAGE_AAMIR = require('app/assets/images/image_aamir.png');
const IMAGE_SALMAN = require('app/assets/images/image_salman.png');

export default class PickStarScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      keyword: '',
      placeholder: 'Search Virat Kohli, Priyanka Chopra etc',
      categories_: [
        {
          name: 'VIRAT KOHLI',
          image: IMAGE_VIRAT,
          selected: false
        },
        {
          name: 'PRIYANKA CHOPRA',
          image: IMAGE_PRIYANKA,
          selected: false
        },
        {
          name: 'AMITABH BACHCHAN',
          image: IMAGE_AMITABH,
          selected: false
        },
        {
          name: 'AAMIR KHAN',
          image: IMAGE_AAMIR,
          selected: false
        },
        {
          name: 'SALMAN KHAN',
          image: IMAGE_SALMAN,
          selected: false
        },
        {
          name: 'KANGANA',
          image: IMAGE_KANGANA,
          selected: false
        },
        {
          name: 'VIRAT KOHLI',
          image: IMAGE_VIRAT,
          selected: false
        },
        {
          name: 'PRIYANKA CHOPRA',
          image: IMAGE_PRIYANKA,
          selected: false
        }
      ],
      categories: [
        {
          name: 'VIRAT KOHLI',
          image: IMAGE_VIRAT,
          selected: false
        },
        {
          name: 'PRIYANKA CHOPRA',
          image: IMAGE_PRIYANKA,
          selected: false
        },
        {
          name: 'AMITABH BACHCHAN',
          image: IMAGE_AMITABH,
          selected: false
        },
        {
          name: 'AAMIR KHAN',
          image: IMAGE_AAMIR,
          selected: false
        },
        {
          name: 'SALMAN KHAN',
          image: IMAGE_SALMAN,
          selected: false
        },
        {
          name: 'KANGANA',
          image: IMAGE_KANGANA,
          selected: false
        },
        {
          name: 'VIRAT KOHLI',
          image: IMAGE_VIRAT,
          selected: false
        },
        {
          name: 'PRIYANKA CHOPRA',
          image: IMAGE_PRIYANKA,
          selected: false
        }
      ],
    }
  }
  componentDidMount() {
    Orientation.lockToPortrait();
  }
  onPressNextButton() {
    this.props.navigation.navigate('fanStack')
    // console.warn('dddddddddddddd')
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
      <ImageBackground style={styles.container} source={IMAGE_BACKGROUND} >
        <View style={styles.view_main}>
          <Header
            containerStyle={cStyles.headerContainer}
            placement="left"
            leftComponent= {
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('pick_interest')}>
                <Image
                  style={{width:20, height:20}}
                  source={ICON_BACK}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            }
            centerComponent={{ text: 'Your Stars', style: cStyles.headerText }}
            rightComponent={{ icon: 'menu', color: '#fff', onPress: ()=>console.warn('reeeeeeeeeeee') }}
          />
          <Text style={styles.text_search}>
            SEARCH YOUR STARS YOU WANT TO FOLLOW
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
        {/* <View style={styles.view_button}>
          <TouchableOpacity onPress={()=>this.onPressNextButton()}>
            <Image source={IMAGE_BUTTON} style={styles.button}/>
          </TouchableOpacity>
        </View> */}
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
    width: '82%',
    height: undefined,
    aspectRatio: 702 / 166,
  },
  text_search: {
    color: '#F8D099', 
    marginLeft: 25, 
    marginTop: 10, 
    fontSize: 15, 
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
    marginBottom: 60,
    alignItems: 'center', 
  },
  view_item_select: {
    width: (screenWidth-65)/2, 
    height:((screenWidth-65)/2)*(350/312), 
    borderRadius: 10, 
    marginBottom: 60,
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
  view_text: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  view_text_item: {
    width: '90%', 
    height: 50,
    alignItems: 'center',
    marginBottom: -25,
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

PickStarScreen.contextType = AppContext;

PickStarScreen.propTypes = {
  navigation: PropTypes.object
};