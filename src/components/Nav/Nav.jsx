import React, { Component } from 'react';
import Responsive from 'react-responsive';
import classnames from 'classnames';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import MessageIcon from 'material-ui/svg-icons/communication/message';
import ExploreIcon from 'material-ui/svg-icons/action/explore';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import Drawer from '../Drawer/Drawer.jsx';
import { hashHistory } from "react-router"

const Desktop = ({ children }) => <Responsive minWidth={768} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={767} children={children} />;

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      notification: true,
      message: false
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = (e) => {
    this.setState({open: false});
    if(e)
      hashHistory.push(e);
  };

  checkNotification = () => {
    if(this.state.notification) {
      return(
        <div>
          <Desktop>
            <Badge
            badgeContent={3}
            secondary={true}
            className={classnames('badges','badgeD','notification')}
            >
              <FlatButton
                href="#random"
                label="Notification"
                className={classnames('button')}
                icon={<NotificationsIcon />}
              />
            </Badge>
          </Desktop>
          <Mobile>
            <Badge
              badgeContent={3}
              secondary={true}
              className={classnames('badges','mobileIcon','notificationM')}
              >
                <IconButton>
                  <NotificationsIcon />
                </IconButton>
            </Badge>
          </Mobile>
        </div>
      )
    } else {
      return (
        <div>
          <Desktop>
            <FlatButton
              href="#random"
              label="Notification"
              className={classnames('button','flatD')}
              icon={<NotificationsIcon />}
            />
          </Desktop>
          <Mobile>
            <IconButton className={classnames('button','flatM','mobileIcon')}>
              <NotificationsIcon />
            </IconButton>
          </Mobile>
        </div>
      )
    }
  }

  checkMessage() {
    if(this.state.message) {
      return(
        <div>
          <Desktop>
            <Badge
            badgeContent={3}
            secondary={true}
            className={classnames('badges','badgeD','message')}
            >
              <FlatButton
                href="#random"
                label="Message"
                className={classnames('button')}
                icon={<MessageIcon />}
              />
            </Badge>
          </Desktop>
          <Mobile>
            <Badge
              badgeContent={3}
              secondary={true}
              className={classnames('badges','mobileIcon')}
              >
                <IconButton>
                  <MessageIcon />
                </IconButton>
            </Badge>
          </Mobile>
        </div>
      )
    } else {
      return (
        <div>
          <Desktop>
            <FlatButton
              href="#random"
              label="Message"
              className={classnames('button','flatD')}
              icon={<MessageIcon />}
            />
          </Desktop>
          <Mobile>
            <IconButton className={classnames('button','flatM','mobileIcon')}>
              <MessageIcon />
            </IconButton>
          </Mobile>
        </div>
      )
    }
  }

  explore() {
    return (
      <div>
        <Desktop>
          <FlatButton
            href="#random"
            label="Explore"
            className={classnames('button','flatD')}
            icon={<ExploreIcon />}
          />
        </Desktop>
        <Mobile>
          <IconButton className={classnames('button','flatM','mobileIcon')}>
            <ExploreIcon />
          </IconButton>
        </Mobile>
      </div>
    )
  }

  render() {
    const leftButton = (
      <div>
        <IconButton touch={true} onTouchTap={this.handleToggle}>
          <MenuIcon />
        </IconButton>
        <Drawer drawerStatus={this.state.open} handleClose={this.handleClose} />
      </div>
    );

    return(
      <AppBar
        iconElementLeft={leftButton}
        title={this.props.component}
      >
        {this.checkNotification()}
        {this.checkMessage()}
        {this.explore()}
      </AppBar>
    )
  }
}
