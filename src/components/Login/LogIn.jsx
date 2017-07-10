import React, { Component } from 'react';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestFailed: false,
      isLoading: false,
      loginStatus: false,
      data: []
    }

    this.authenticate = this.authenticate.bind(this);
    this.authSuccess = this.authSuccess.bind(this);
  }

  authSuccess = (token) => {

    // const Token = {'token': token};

    fetch("http://localhost:3000/api/v1/getUsers",
    {
        method: "GET",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': token
        },
        mode: 'cors'
    })
    .then(function(res){return res.json() })
    .then((data) => {
      this.setState({loginStatus: true});
      this.setState({data: data})
    }, () => {
      console.log("Token Expired");
    })
  }

  authenticate = (e) => {
    e.preventDefault();
    console.log("authenticating")

    const authSuccess = this.authSuccess;

    const payload = {
    enrollment: this.refs.enrollment.value,
    password: this.refs.password.value
    };

    fetch("http://localhost:3000/api/v1/authenticate",
    {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        mode: 'cors',
        body: JSON.stringify(payload)
    })
    .then(function(res){return res.json() })
    .then(function(data){ console.log(data.token); if(data.token) {
      authSuccess(data.token);
    } }, () => {
      console.log("Request Failed");
    })

    // var myHeaders = new Headers();
    // myHeaders.append('Access-Control-Allow-Origin', '*');
    //
    // const myInit = { method: 'GET',
    //                  headers: myHeaders,
    //                  mode: 'no-cors',
    //                  cache: 'default' };
    //
    // fetch('http://122.162.84.195:4000/api/authenticate', myInit)
    //   .then(response => {
    //     if(!response.ok) {
    //       throw Error("Network Request Failed")
    //     }
    //     return response;
    //   })
    //   .then(d => d.json())
    //   .then(d => {
    //     this.setState({
    //       data: d,
    //       loginStatus: true
    //     })
    //     console.log(d);
    //   },() => {
    //     this.setState({
    //       requestFailed: true
    //     })
    //     console.log("Error")
    //   })

  }

  checkAuthentication = () => {

    if(this.state.loginStatus) {
      return(
        this.props.children && React.cloneElement(this.props.children, {
          data: this.state.data
        })
      )
    }
    else {
      return(
        <div>
          <form onSubmit={this.authenticate}>
            <label htmlFor="enrollment">Enrollment No. </label>
            <input type="text" id="enrollment" ref="enrollment" name="enrollment" /><br />
            <label htmlFor="password">Password </label>
            <input type="password" id="password" ref="password" name="password" /><br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )
    }
  }

  render() {
    return(
        this.checkAuthentication()
    )
  }
}

export default LogIn;
