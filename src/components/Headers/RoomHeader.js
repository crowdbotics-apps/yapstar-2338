import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Platform, Text, Image } from 'react-native'
import { Header } from 'react-native-elements'

const isiOS = Platform.OS === 'ios';
const ICON_LIVE = require('app/assets/images/ic_live.png');
const ICON_MORE = require('app/assets/images/ic_more.png');
const ICON_CAST = require('app/assets/images/ic_cast.png');

const COLOR_GOLD = '#F8D099'
const COLOR_GRAY = '#707070'

export class RoomHeader extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      style,
      containerStyle,
      showCast,
      showLeft,
      showRight,
      eTime,
      eTimeTag,
      ...otherProps
    } = this.props    

    return(
      <Header
        containerStyle={styles.containerStyle}
        placement='center'
        leftComponent={
          <View>
            { this.props.showLeft && 
              <Image
              style={{width:25*80/44, height:25}}
              source={ICON_LIVE}
              resizeMode='contain'
            />}
          </View>
          
        }
        centerComponent= {
          <View style={styles.view_center}>
            <Text style={styles.text_time}>{this.props.eTime}</Text>
            <Text style={styles.text_timetag}>{this.props.eTimeTag}</Text>
          </View>
        }
        rightComponent={
          <View style={styles.view_right}>
            { this.props.showCast && this.props.showRight &&
              <TouchableOpacity onPress={this.props.onPressCast}>
                <Image
                  style={{width:25, height:25, marginRight: 15}}
                  source={ICON_CAST}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            }
            { this.props.showRight &&
              <TouchableOpacity onPress={this.props.onPressRight}>
                <Image
                  style={{width:20, height:20}}
                  source={ICON_MORE}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            }
          </View>
        }
    />
  )
  }
}

RoomHeader.defaultProps = {
  style: {},
  containerStyle: {},
  showCast: false,
  showLeft: true,
  showRight: true
}

RoomHeader.propTypes = {
  style: PropTypes.any,
  containerStyle: PropTypes.any,
  onPressCast: PropTypes.func,
  onPressRight: PropTypes.func,
  showCast: PropTypes.bool,
  eTime: PropTypes.string,
  eTimeTag: PropTypes.string,
}

styles = {
  containerStyle: {
    width: '100%',
    paddingHorizontal: 25,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    paddingBottom: 10,
    position: 'absolute'
  },
  view_center: {
    width: '100%', 
    height: '100%', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  view_right: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  text_time: {
    color: COLOR_GOLD,
    fontSize: 20.
  },
  text_timetag: {
    color:COLOR_GRAY, 
    paddingTop: 50, 
    position: 'absolute', 
    fontSize: 18
  }
}