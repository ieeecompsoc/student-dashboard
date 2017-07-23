import React, { Component } from 'react';
import Responsive from 'react-responsive';
import classnames from 'classnames';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ExploreIcon from 'material-ui/svg-icons/action/explore';
import ExitIcon from 'material-ui/svg-icons/action/power-settings-new';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from '../Drawer/Drawer.jsx';
import { hashHistory } from "react-router"

const Desktop = ({ children }) => <Responsive minWidth={768} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={767} children={children} />;

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = (e) => {
    this.setState({open: false});
    if(e)
      hashHistory.push(e);
  };

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

  reload = () => {
    localStorage.removeItem('access_token');
    hashHistory.push('/');
    location.reload();
  }

  signOut() {
    return (
      <div>
        <Desktop>
          <FlatButton
            onTouchTap={() => {this.reload()}}
            label="Sign Out"
            className={classnames('button','flatD')}
            icon={<ExitIcon />}
          />
        </Desktop>
        <Mobile>
          <IconButton className={classnames('button','flatM','mobileIcon')} onTouchTap={() => {this.reload()}}>
            <ExitIcon />
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
        {this.explore()}
        {this.signOut()}
      </AppBar>
    )
  }
}
