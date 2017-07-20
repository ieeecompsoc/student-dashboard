import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import UpdateIcon from 'material-ui/svg-icons/editor/mode-edit';
import RaisedButton from 'material-ui/RaisedButton';

class Profile extends Component {

  componentWillMount() {
    this.props.changeComponent("Profile");
  }

  render() {
    const data = this.props.data;
    const phone = data.phone;
    const email = data.email;
    const name = data.name;
    const course = data.course;
    const fatherName = data.father_name;
    const DOB = data.dob;
    const enrollment = data.enrollment;
    const semester = data.semester;
    return(
      <div className="jumbotron">
        <div className="profile-form">
          <TextField
            defaultValue={name}
            floatingLabelText="Name"
            floatingLabelStyle={{letterSpacing: "1px"}}
            style={{fontFamily: "Source Sans Pro"}}
          /><br />
          <TextField
            defaultValue={email}
            floatingLabelText="Email"
            floatingLabelStyle={{letterSpacing: "1px"}}
            style={{fontFamily: "Source Sans Pro"}}
          /><br />
          <TextField
            defaultValue={phone}
            floatingLabelText="Phone"
            floatingLabelStyle={{letterSpacing: "1px"}}
            style={{fontFamily: "Source Sans Pro"}}
          /><br />
          <TextField
            defaultValue={fatherName}
            floatingLabelText="Father's Name"
            floatingLabelStyle={{letterSpacing: "1px"}}
            style={{fontFamily: "Source Sans Pro"}}
          /><br />
          <TextField
            defaultValue={enrollment}
            floatingLabelText="Enrollment No."
            floatingLabelStyle={{letterSpacing: "1px"}}
            style={{fontFamily: "Source Sans Pro"}}
            disabled={true}
          /><br />
          <TextField
            defaultValue={semester}
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
          />
        </div>
      </div>
    )
  }
}

export default Profile;
