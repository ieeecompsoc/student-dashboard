import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';

injectTapEventPlugin();

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestFailed: false,
            isLoading: false,
            loginStatus: false,
            data: []
        }

    }

    authFailure = () => {
        this.setState({requestFailed: true, isLoading: false})
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
                console.log("error");
            });

        // fetch("http://localhost:4000/api/v1/getUsers", {     method: "GET",
        // headers: {       'Content-Type': 'application/x-www-form-urlencoded',
        // 'x-access-token': token     },     mode: 'cors' }) .then(function(res){return
        // res.json() }) .then((d) => {   this.setState({     data: d,     loginStatus:
        // true   });   console.log(d); }, () => {   console.log("Token Expired"); })
    }

    authenticate = (e) => {
        e.preventDefault();
        this.setState({isLoading: true});

        console.log("authenticating")

        const authSuccess = this.authSuccess;
        const authFailure = this.authFailure;

        const payload = {
            enrollment: this.refs.enrollment.value,
            password: this.refs.password.value
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

        // fetch("http://localhost:4000/api/v1/authenticate", {     method: "POST",
        // headers: {       'Content-Type': 'application/x-www-form-urlencoded'     },
        //   mode: 'cors',     body: JSON.stringify(payload) })
        // .then(function(res){return res.json() }) .then(function(data){
        // console.log(data.token);   if(data.token) {     authSuccess(data.token);   }
        // else {     console.log("request failed");     authFailure();   } })

    }

    checkAuthentication = () => {

        if (this.state.loginStatus) {
            return (this.props.children && React.cloneElement(this.props.children, {data: this.state.data}))
        } else {
            return (
                <div>
                {this.state.isLoading && <p> Loading ... </p>}
                {
                    !this.state.isLoading && <form onSubmit = { this.authenticate } >
                        <label htmlFor = "enrollment" > Enrollment No. </label>
                        <input type = "text" id = "enrollment" ref = "enrollment" name = "enrollment" />
                        <br />
                        <label htmlFor = "password" > Password </label>
                        <input type = "password" id = "password" ref = "password" name = "password" />
                        <br />
                        <button type = "submit"> Submit </button>
                    </form>
                }
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