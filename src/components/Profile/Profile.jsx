import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import UpdateIcon from 'material-ui/svg-icons/editor/mode-edit';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

class Profile extends Component {

  constructor(props) {
    super(props);

    Object.prototype.isEmpty = () => {
       for(let key in this) {
           if(this.hasOwnProperty(key))
               return false;
       }
       return true;
    }

    this.state = {
      phone: this.props.data.phone,
      email: this.props.data.email,
      name: this.props.data.name,
      father_name: this.props.data.father_name,
      mother_name: this.props.data.mother_name,
      address: this.props.data.address,
      enrollment: this.props.data.enrollment,
      semester: this.props.data.semester,
      isSubmitted: false,
      isLoading: false
    }
  }

  componentWillMount() {
    this.props.changeComponent("Profile");
  }

  handleChange = (e) => {
    this.setState({[e.target.name] : e.target.value})
  }

  submitChanges = (changes) => {
    this.setState({isLoading : true})
    const payload = {
      changes: changes,
      token: this.props.token
    }
    const thiss = this;
    axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
            url: '/api/v1/editInfo',
            mode: 'cors',
            data: JSON.stringify(payload)
        })
        .then(function (response) {
            thiss.setState({isSubmitted : true, isLoading: false})
        })
        .catch(function (error) {
          console.log("error");
        });
  }

  updateProfile = (e) => {
    e.preventDefault();
    const changes = {};
    for(let key in this.state) {
      if(key === "isSubmitted" || key === "isLoading")
        continue;
      if(this.props.data[key] !== this.state[key]){
        changes[key] = this.state[key];
      }
    }
    if(!changes.isEmpty())
    {
      this.submitChanges(changes);
    }
  }

  handleRequestClose = () => {
    this.setState({
      isSubmitted: false
    })
  }

  render() {

    return(
      <div className="jumbotron profile">
        {!this.state.isLoading && <div className="profile-form">
          <form onSubmit={this.updateProfile}>
              <TextField
                defaultValue={this.state.name}
                floatingLabelText="Name"
                floatingLabelStyle={{letterSpacing: "1px"}}
                style={{fontFamily: "Source Sans Pro"}}
                onChange={(e) => this.handleChange(e)}
                name="name"
              /><br />
              <TextField
                defaultValue={this.state.email}
                floatingLabelText="Email"
                floatingLabelStyle={{letterSpacing: "1px"}}
                style={{fontFamily: "Source Sans Pro"}}
                onChange={(e) => this.handleChange(e)}
                name="email"
              /><br />
              <TextField
                defaultValue={this.state.phone}
                floatingLabelText="Phone"
                floatingLabelStyle={{letterSpacing: "1px"}}
                style={{fontFamily: "Source Sans Pro"}}
                onChange={(e) => this.handleChange(e)}
                name="phone"
              /><br />
              <TextField
                defaultValue={this.state.father_name}
                floatingLabelText="Father's Name"
                floatingLabelStyle={{letterSpacing: "1px"}}
                style={{fontFamily: "Source Sans Pro"}}
                onChange={(e) => this.handleChange(e)}
                name="father_name"
              /><br />
              <TextField
                defaultValue={this.state.mother_name}
                floatingLabelText="Mother's Name"
                floatingLabelStyle={{letterSpacing: "1px"}}
                style={{fontFamily: "Source Sans Pro"}}
                onChange={(e) => this.handleChange(e)}
                name="mother_name"
              /><br />
              <TextField
                defaultValue={this.state.address}
                floatingLabelText="Address"
                floatingLabelStyle={{letterSpacing: "1px"}}
                style={{fontFamily: "Source Sans Pro"}}
                onChange={(e) => this.handleChange(e)}
                name="address"
                multiLine={true}
              /><br />
              <TextField
                defaultValue={this.state.enrollment}
                floatingLabelText="Enrollment No."
                floatingLabelStyle={{letterSpacing: "1px"}}
                style={{fontFamily: "Source Sans Pro"}}
                disabled={true}
              /><br />
              <TextField
                defaultValue={this.state.semester}
                floatingLabelText="Semester"
                floatingLabelStyle={{letterSpacing: "1px"}}
                style={{fontFamily: "Source Sans Pro"}}
                disabled={true}
              /><br />
              <RaisedButton
                label="Update"
                labelPosition="before"
                primary={true}
                icon={<UpdateIcon />}
                style={{margin:"12"}}
                type="submit"
              />
          </form>
        </div>}
        {this.state.isLoading && <CircularProgress size={80} thickness={5} color="#00BCD4" style={{margin: 'auto'}}/>}
        <Dialog
            title="Reset Password"
            actions={<FlatButton
              label="OK"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.handleRequestClose}
            />}
            modal={false}
            open={this.state.isSubmitted}
            onRequestClose={this.handleRequestClose}
        >
          Your request has been submitted. you will able to see the changes once it is approved.
        </Dialog>
      </div>
    )
  }
}

export default Profile;
