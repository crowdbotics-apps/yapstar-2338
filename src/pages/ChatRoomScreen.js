import React from 'react'
import firebase from 'react-native-firebase'
import Orientation from 'react-native-orientation'
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { OT, OTPublisher, OTSession, OTSubscriber } from 'opentok-react-native'
import { AppContext, Navbar } from '../components';
import Authentication from '../services/Authentication';
import { OPENTOK } from '../utils/Constants'

export default class ChatRoomScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sessionId: '2_MX40NjM1NTQ4Mn5-MTU2MTYzMTQzNjgzOH5LdytGT0JudnZveE5iY0psSDhhV093ZkR-fg',
      token: 'T1==cGFydG5lcl9pZD00NjM1NTQ4MiZzaWc9MjdkYWY2NzMzMTRjM2YzZjllMmEwYTIzZmVmZGU2MTJiMzVhZThlNTpzZXNzaW9uX2lkPTJfTVg0ME5qTTFOVFE0TW41LU1UVTJNVFl6TVRRek5qZ3pPSDVMZHl0R1QwSnVkblp2ZUU1aVkwcHNTRGhoVjA5M1prUi1mZyZjcmVhdGVfdGltZT0xNTYxNjMxNTExJm5vbmNlPTAuODE5NzA4ODczODUwMjkzMSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTYxNzE3OTA5JmNvbm5lY3Rpb25fZGF0YT1zdGFyJTIwY2hhdCUyMHJvb20xJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9'

    }
  }
  
  componentDidMount() {
    Orientation.lockToPortrait()
    // var opentok = OT(OPENTOK.API_KEY, OPENTOK.API_SECRET);
    // var sessionId;
    // var token;
    // opentok.createSession({}, function(error, session) {
    //   if (error) {
    //     console.warn("Error creating session:", error)
    //   } else {
    //     sessionId = session.sessionId;
    //     console.warn("Session ID: " + sessionId);
    //     //  Use the role value appropriate for the user:
    //     var tokenOptions = {};
    //     tokenOptions.role = "publisher";
    //     tokenOptions.data = "username=bob";
    
    //     // Generate a token.
    //     token = opentok.generateToken(sessionId, tokenOptions);
    //     console.warn(token);
    //     this.setstate({
    //       sessionId: sessionId,
    //       token: token
    //     })
    //   }
    // });
  }

  logout() {
    Authentication.logout();
    this.props.navigation.navigate('auth');
  }

  render() {
    return (
      <View style={styles.container} >
        <TouchableOpacity onPress={() => this.logout()}>
          <Text> Log out </Text>
        </TouchableOpacity>
        <OTSession apiKey={OPENTOK.API_KEY} sessionId={this.state.sessionId} token={this.state.token}>
          <OTPublisher style={{ width: 200, height: 200 }} />
          <OTSubscriber style={{ width: 200, height: 200 }} />
        </OTSession>
      </View>
    )
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'   
  }
})

ChatRoomScreen.contextType = AppContext;

ChatRoomScreen.propTypes = {
  navigation: PropTypes.object
};
