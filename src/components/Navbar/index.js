import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ICON_LOGO = require('app/assets/images/logo.png');
class Navbar extends Component {
  render() {
    let { left, right, leftHandler, rightHandler, title } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {left && (
            <TouchableOpacity style={styles.btn} onPress={leftHandler}>
              <Ionicons
                name={left}
                style={styles.left}
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.iconContainer}>
          <Image source={ICON_LOGO} style={styles.icon} />
        </View>
        <View style={styles.rightContainer}>
          {right && (
            <TouchableOpacity style={styles.btn} onPress={rightHandler}>
              <Text style={styles.right}>{right}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    marginTop: 24,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  leftContainer: {
    width: 60,
    height: 60,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  btn: {
    padding: 5
  },
  left: {
    fontSize: 24
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    flex: 1,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rightContainer: {
    width: 60,
    height: 60,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  right: {
    fontSize: 17,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.41,
    textAlign: 'right',
    color: '#ffffff'
  }
});

Navbar.propTypes = {
  left: PropTypes.string,
  right: PropTypes.string,
  leftHandler: PropTypes.func,
  rightHandler: PropTypes.func
};

export default Navbar;
