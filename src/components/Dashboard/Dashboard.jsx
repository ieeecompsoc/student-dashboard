import React, {Component} from 'react';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import TouchRipple from 'material-ui/internal/TouchRipple';

export default class Dashboard extends Component {
  componentWillMount() {
    this.props.changeComponent("Dashboard")
  }

  render() {
    const data = this.props.data;
    const image = data.profile_pic;
    const phone = data.phone;
    const email = data.email;
    const name = data.name;
    const course = data.course;
    return(
      <div className="jumbotron">
          <div className="profile-card">
            <TouchRipple>
            <div className="main">
                <img src={image} alt="profile_pic" width="130" height="130"/>
                <div className="name">{name}</div>
                <div className="course">{course}</div>
            </div>
            <div className="body">
              <ul>
                <li><EmailIcon style={{width: "1.6rem"}}/><span className="key">Email : </span><span className="value">{email}</span></li>
                <li><PhoneIcon style={{width: "1.6rem"}}/><span className="key">Phone : </span><span className="value">{phone}</span></li>
              </ul>
            </div>
            </TouchRipple>
          </div>
      </div>
    )
  }
}
