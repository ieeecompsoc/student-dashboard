import React, { Component } from 'react';

class Profile extends Component {

  componentWillMount() {
    this.props.changeComponent("Profile");
  }

  render() {
    return <h1>Profile :)</h1>
  }
}

export default Profile;
