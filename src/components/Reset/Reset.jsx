import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import classnames from 'classnames';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ViewIcon from 'material-ui/svg-icons/action/visibility';
import HideIcon from 'material-ui/svg-icons/action/visibility-off';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';

class Reset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordType: "password",
      confirmPasswordType: "password",
      passwordMatch: true,
      passwordEmpty: false,
      password: "",
      confirmPassword: "",
      passwordLength: false,
      resetPasswordSuccess: false
    }
  }

  componentWillMount() {
    const payload = {
      enrollment: this.props.params.enrollment,
      reset_token: this.props.params.token
    }

    axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
            url: '/api/v1/password/checkresettoken',
            mode: 'cors',
            data: JSON.stringify(payload)
        })
        .then(function (response) {
            console.log("response");
        })
        .catch(function (error) {
            hashHistory.push('/')
        });

  }

  redirect = () => {
    hashHistory.push('/')
  }

  handleRequestClose = () => {
    this.setState({
      passwordMatch: true,
      passwordEmpty: false,
      passwordLength: false
    })
  }

  changePassword = (e) => {
    e.preventDefault();

    const thiss = this;

    const payload = {
      enrollment: this.props.params.enrollment,
      reset_token: this.props.params.token,
      password: this.state.password
    }

    if(this.state.password === "" || this.state.confirmPassword === "")
      this.setState({passwordEmpty : true})
    else if(this.state.password !== this.state.confirmPassword) {
      this.setState({passwordMatch : false})
    }
    else if((this.state.password).length < 8) {
      this.setState({passwordLength : true})
    }
    else {
      axios({
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
              url: '/api/v1/password/reset',
              mode: 'cors',
              data: JSON.stringify(payload)
          })
          .then(function (response) {
              thiss.setState({resetPasswordSuccess : true});
          })
          .catch(function (error) {
              hashHistory.push('/')
          });
    }

  }

  checkViewIcon = (type) => {
    if(type === "password")
      return <ViewIcon />;
    return <HideIcon />;
  }

  handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value})
  }

  render() {
    const styles = {
      floatingLabelStyle: {
        color: "#133751",
      },
      floatingLabelFocusStyle: {
        color: "#133751",
      },
      underlineStyle: {
        borderColor: "#455A64",
      },
      underlineFocusStyle: {
        borderColor: "#133751"
      },
      ViewIcon: {
        position: 'absolute',
        right: 15,
        top: 25,
        width: 20,
        height: 20,
        cursor: 'pointer',
        color: 'black'
      }
    };
    return(
      <MuiThemeProvider>
        <div className="login">
          <div className="form" >
              <div className="form-head">Reset Password</div>
              <hr className="hr" />
              {!this.state.resetPasswordSuccess && <form onSubmit = { this.changePassword } >
                <div style={{position: 'relative', display: 'inline-block'}}>
                      <TextField
                        floatingLabelText="New Password"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineFocusStyle}
                        underlineStyle={styles.underlineStyle}
                        className={classnames('text-input password')}
                        type={this.state.passwordType}
                        name="password"
                        onChange={(e) => {this.handleChange(e)}}
                      />
                      {this.state.password === "" ? null : <IconButton style={styles.ViewIcon} disableTouchRipple={true} onTouchTap={() => {
                        this.setState({passwordType : this.state.passwordType === "password"? "text" : "password"})
                      }}>
                      {this.checkViewIcon(this.state.passwordType)}
                    </IconButton>}
                </div>
                <br />
                <div style={{position: 'relative', display: 'inline-block'}}>
                      <TextField
                        floatingLabelText="Confirm Password"
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        underlineFocusStyle={styles.underlineFocusStyle}
                        underlineStyle={styles.underlineStyle}
                        className={classnames('text-input password')}
                        type={this.state.confirmPasswordType}
                        name="confirmPassword"
                        onChange={(e) => {this.handleChange(e)}}
                      />
                      {this.state.confirmPassword === "" ? null : <IconButton style={styles.ViewIcon} disableTouchRipple={true} onTouchTap={() => {
                        this.setState({confirmPasswordType : this.state.confirmPasswordType === "password"? "text" : "password"})
                      }}>
                      {this.checkViewIcon(this.state.confirmPasswordType)}
                    </IconButton>}
                </div>
                <br />
                <button type = "submit" className="submit">Submit</button>
              </form>}
              {this.state.resetPasswordSuccess && <button onClick = {() => { this.redirect() }} className="submit">GO TO HOMEPAGE</button>}
            </div>
            <Snackbar
              open={!this.state.passwordMatch}
              message="Password does not match"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
            <Snackbar
              open={this.state.passwordEmpty}
              message="Password Empty!"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
            <Snackbar
              open={this.state.passwordLength}
              message="Password should not be less than 8 characters"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
            <Snackbar
              open={this.state.resetPasswordSuccess}
              message="Password changed successfully"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Reset;
