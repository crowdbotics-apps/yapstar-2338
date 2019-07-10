import React, { Component } from 'react';
import { OTPublisher } from 'opentok-react-native';

class OTPublisherStream extends Component {
  publisherEventHandlers = {
    streamCreated: (event) => {
      console.log('Publisher stream created!', event);
    },
    streamDestroyed: (event) => {
      console.log('Publisher stream destroyed!', event);
    }
  };

  render() {
    return (
      <OTPublisher style={this.props.style} eventHandlers={this.publisherEventHandlers} />
    );
  }
}

export default OTPublisherStream;