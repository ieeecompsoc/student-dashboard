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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
            passwordType: "password",
            resetPassword: false,
            noEnrollment: false,
            rememberLogin: true,
            emailSent: false,
            token: ""
        }
    }

    componentWillMount() {
        const token = localStorage.getItem('access_token')
        const rememberLogin = localStorage.getItem('rememberLogin') == 'true'
        const thiss = this;

        if(token && rememberLogin){
          this.setState({isLoading : true});
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
                  thiss.setState({data: response.data[0], loginStatus: true, token: token})
              })
              .catch(function (error) {
                  thiss.setState({ tokenExpired : true, isLoading: false })
              });
        }

        this.setState({
            rememberLogin
        });
    }

    resetPassword = (e) => {
      e.preventDefault();
      this.setState({isLoading : true})
      const thiss = this;

      if(this.state.enrollment === "")
        this.setState({noEnrollment : true});
      else{
          axios({
              method: 'GET',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
                  url: `/api/v1/password/forgot?enrollment=${this.state.enrollment}`,
                  mode: 'cors'
              })
              .then(function (response) {
                  thiss.setState({emailSent : true, isLoading: false, resetPassword: false})
              })
              .catch(function (error) {
                  thiss.setState({noEnrollment : true, isLoading: false});
              });
        }
    }

    checkViewIcon = () => {
      if(this.state.passwordType === "password")
        return <ViewIcon />;
      return <HideIcon />;
    }

    changeRemember = () => {
        localStorage.setItem('rememberLogin', !this.state.rememberLogin)
        this.setState({
            rememberLogin: !this.state.rememberLogin
        })
    }

    handleRequestClose = () => {
      this.setState({
        wrongCredentials: false,
        tokenExpired: false,
        noEnrollment: false,
        emailSent: false
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

        localStorage.setItem('access_token', token);

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
                thiss.setState({data: response.data[0], loginStatus: true, token: token})
            })
            .catch(function (error) {
                thiss.setState({ tokenExpired : true, isLoading: false })
            });
    }

    authenticate = (e) => {
        e.preventDefault();
        this.setState({isLoading: true});

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
            return (this.props.children && React.cloneElement(this.props.children, {data: this.state.data, token: this.state.token}))
        } else {
            return (
                <div>
                    <MuiThemeProvider>
                        <div className="login">
                            {this.state.isLoading && <CircularProgress size={80} thickness={5} color="white" style={{margin: 'auto'}}/>}
                            {!this.state.isLoading && <div className="form" >
                                {!this.state.resetPassword && <div>
                                    <div className="form-head">Student Logn</div>
                                    <hr className="hr" />
                                    <form onSubmit = { this.authenticate } >
                                        <TextField
                                            floatingLabelText="Enrollment No."
                                            floatingLabelStyle={styles.floatingLabelStyle}
                                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                            underlineFocusStyle={styles.underlineFocusStyle}
                                            underlineStyle={styles.underlineStyle}
                                            name="enrollment"
                                            type="text"
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
                                            label="Remember me"
                                            iconStyle={{fill: 'black'}}
                                            className={classnames('checkbox')}
                                            disableTouchRipple={true}
                                            checked={this.state.rememberLogin}
                                            onCheck={this.changeRemember.bind(this)}
                                        />
                                        <button type = "submit" className="submit">Log In</button>
                                    </form>
                                    <div className="forgot-btn" onClick={() => this.setState({resetPassword : true})}>Forgotton password?</div>
                                </div>}
                                {
                                    this.state.resetPassword && <div>
                                        <div className="form-head">Reset Password</div>
                                        <hr className="hr" />
                                        <form onSubmit = { this.resetPassword } >
                                            <TextField
                                                floatingLabelText="Enrollment No."
                                                floatingLabelStyle={styles.floatingLabelStyle}
                                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                                underlineFocusStyle={styles.underlineFocusStyle}
                                                underlineStyle={styles.underlineStyle}
                                                name="enrollment"
                                                type="text"
                                                className={classnames('text-input')}
                                                onChange={(e) => {this.handleChange(e)}}
                                            />
                                            <br />
                                            <button type = "submit" className="submit">Submit</button>
                                        </form>
                                        <div className="forgot-btn back" onClick={() => this.setState({resetPassword : false})}><span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> Return to Login</div>
                                    </div>
                                }
                            </div>}
                            <Snackbar
                                open={this.state.wrongCredentials}
                                message="Wrong Credentials!! Try Again"
                                autoHideDuration={5000}
                                onRequestClose={this.handleRequestClose}
                            />
                            <Snackbar
                                open={this.state.tokenExpired}
                                message="Token Expired!!"
                                autoHideDuration={5000}
                                onRequestClose={this.handleRequestClose}
                            />
                            <Snackbar
                                open={this.state.noEnrollment}
                                message="Enrollment No. not found!"
                                autoHideDuration={5000}
                                onRequestClose={this.handleRequestClose}
                            />
                            <Dialog
                                title="Reset Password"
                                actions={<FlatButton
                                  label="OK"
                                  primary={true}
                                  keyboardFocused={true}
                                  onTouchTap={this.handleRequestClose}
                                />}
                                modal={false}
                                open={this.state.emailSent}
                                onRequestClose={this.handleRequestClose}
                            >
                              Password reset link has been mailed to you. Check your mail for further instructions.
                            </Dialog>
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
