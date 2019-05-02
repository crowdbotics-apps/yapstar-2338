import React, { Component } from 'react';
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Authentication from '../../services/Authentication';
import { AppContext, Navbar } from 'app/components';
import styles from './style';

let dm = Dimensions.get('screen');
class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.navigation.getParam('uid')
    };
  }

  async componentDidMount() {
    this.reload();
  }

  reload = async () => {
    await this.context.showLoading();

    this.context.hideLoading();
  };

  leftHandler = () => {
    this.props.navigation.toggleDrawer();
  };

  logout() {
    Authentication.logout();
    this.props.navigation.navigate('auth');
  }

  render() {
    console.log(this.state.uid);
    return (
      <View style={styles.container}>
        <Navbar
          left="ios-menu"
          leftHandler={this.leftHandler}
          title="Dashboard"
        />

        <TouchableOpacity onPress={() => this.logout()}>
          <Text> Log out </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

MainScreen.contextType = AppContext;

MainScreen.propTypes = {
  navigation: PropTypes.object
};

export default MainScreen;
