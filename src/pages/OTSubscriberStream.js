import React, { Component } from 'react';
import { OTSubscriber } from 'opentok-react-native';

class OTSubscriberStream extends Component {
  subscriberProperties = {
    subscribeToAudio: true,
    subscribeToVideo: true,
  };

  subscriberEventHandler = {
    connected(event) {
      console.log('connected', event);
    },
    disconnected(event) {
      console.log('disconnected', event);
    },
    videoDataReceived(event) {
      console.log('videoDataReceived', event);
    },
    videoEnabled(event) {
      console.log('videoEnabled', event);
    },
    videoNetworkStats(event) {
      console.log('videoNetworkStats', event);
    }
  };

  render() {
    return (
      <OTSubscriber
        properties={this.subscriberProperties}
        eventHandlers={this.subscriberEventHandler}
        style={this.props.style}
      />
    );
  }
}

export default OTSubscriberStream;