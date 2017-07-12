import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import ViewIcon from 'material-ui/svg-icons/action/visibility';
import HideIcon from 'material-ui/svg-icons/action/visibility-off';
import classnames from 'classnames';
import axios from 'axios';

injectTapEventPlugin();

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enrollment: "",
            password: "",
            wrongCredentials: false,
            tokenExpired: false,
            isLoading: false,
            loginStatus: false,
            data: [],
            passwordType: "password"
        }

    }

    checkViewIcon = () => {
      if(this.state.passwordType === "password")
        return <ViewIcon />;
      return <HideIcon />;
    }

    handleRequestClose = () => {
      this.setState({
        wrongCredentials: false,
        tokenExpired: false
      })
    }

    handleChange = (e) => {
      this.setState({ [e.target.name] : e.target.value})
    }

    authFailure = () => {
        this.setState({wrongCredentials: true, isLoading: false});
    }

    authSuccess = (token) => {

        const thiss = this;

        axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': token
            },
                url: '/api/v1/getUsers',
                mode: 'cors'
            })
            .then(function (response) {
                console.log(response.data[0]);
                thiss.setState({data: response.data[0], loginStatus: true})
            })
            .catch(function (error) {
                thiss.setState({ tokenExpired : true, isLoading: false })
            });
    }

    authenticate = (e) => {
        e.preventDefault();
        this.setState({isLoading: true});

        console.log("authenticating")

        const authSuccess = this.authSuccess;
        const authFailure = this.authFailure;

        const payload = {
            enrollment: this.state.enrollment,
            password: this.state.password
        };

        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
                url: '/api/v1/authenticate',
                mode: 'cors',
                data: JSON.stringify(payload)
            })
            .then(function (response) {
                authSuccess(response.data.token);
            })
            .catch(function (error) {
                authFailure();
            });

    }

    checkAuthentication = () => {

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

        if (this.state.loginStatus) {
            return (this.props.children && React.cloneElement(this.props.children, {data: this.state.data}))
        } else {
            return (
                <div>
                  <MuiThemeProvider>
                    <div className="login">
                      {this.state.isLoading && <CircularProgress size={80} thickness={5} color="white" style={{margin: 'auto'}}/>}
                      {!this.state.isLoading && <div className="form" >
                        <div className="form-head">Student Login</div>
                        <hr className="hr" />
                        <form onSubmit = { this.authenticate } >
                          <TextField
                            floatingLabelText="Enrollment No."
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineFocusStyle}
                            underlineStyle={styles.underlineStyle}
                            name="enrollment"
                            type="number"
                            className={classnames('text-input')}
                            onChange={(e) => {this.handleChange(e)}}
                          />
                          <br />
                          <div style={{position: 'relative', display: 'inline-block'}}>
                                <TextField
                                  floatingLabelText="Password"
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
                                {this.checkViewIcon()}
                              </IconButton>}
                          </div>
                          <br />
                          <Checkbox
                            label="Remember me?"
                            iconStyle={{fill: 'black'}}
                            className={classnames('checkbox')}
                            disableTouchRipple={true}
                            defaultChecked
                          />
                          <button type = "submit" className="submit">Log In</button>
                        </form>
                      </div>}
                      <Snackbar
                        open={this.state.wrongCredentials}
                        message="Wrong Credentials!! Try Again"
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                      />
                      <Snackbar
                        open={this.state.tokenExpired}
                        message="Token Expired!!"
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                      />
                    </div>
                  </MuiThemeProvider>
                </div>
            )
        }
    }

    render() {
        return (
            this.checkAuthentication()
        )
    }
}

export default LogIn;
