import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
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
            data: []
        }

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
        }
      };

        if (this.state.loginStatus) {
            return (this.props.children && React.cloneElement(this.props.children, {data: this.state.data}))
        } else {
            return (
                <div>
                  <MuiThemeProvider>
                    <div className="login">
                      <div className="form" >
                        <div className="form-head">Student Login</div>
                        <hr className="hr" />
                        {!this.state.isLoading && <form onSubmit = { this.authenticate } >
                          <TextField
                            floatingLabelText="Enrollment No."
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineFocusStyle}
                            underlineStyle={styles.underlineStyle}
                            name="enrollment"
                            className={classnames('text-input')}
                            onChange={(e) => {this.handleChange(e)}}
                          />
                          <br />
                          <TextField
                            floatingLabelText="Password"
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            underlineFocusStyle={styles.underlineFocusStyle}
                            underlineStyle={styles.underlineStyle}
                            className={classnames('text-input')}
                            type="password"
                            name="password"
                            onChange={(e) => {this.handleChange(e)}}
                          />
                          <br />
                          <Checkbox
                            label="Remember me?"
                            iconStyle={{fill: 'black'}}
                            className={classnames('checkbox')}
                          />
                          <button type = "submit" className="submit">Log In</button>
                        </form>}
                        {this.state.isLoading && <CircularProgress size={80} thickness={5} color="#263238"/>}
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
