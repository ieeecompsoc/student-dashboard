import React, { Component } from 'react';
import { hashHistory } from 'react-router';

class NotFound extends Component {
  componentWillMount() {
    hashHistory.push('/')
  }

  render() {
    return null;
  }
}

export default NotFound;
