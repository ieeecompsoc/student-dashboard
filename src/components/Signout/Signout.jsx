import React, { Component } from 'react';
import { hashHistory } from 'react-router';

class Profile extends Component {

  componentWillMount() {
    localStorage.removeItem('access_token');
    hashHistory.push('/');
    location.reload();
  }
}

export default Profile;
