import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import classnames from 'classnames';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import ReportIcon from 'material-ui/svg-icons/editor/multiline-chart';
import ProfileIcon from 'material-ui/svg-icons/action/account-circle';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import TouchRipple from 'material-ui/internal/TouchRipple';

export default class customDrawer extends Component {

  render() {
    return(
      <Drawer
          docked={false}
          width={250}
          open={this.props.drawerStatus}
          onRequestChange={this.props.handleClose}
          className={classnames('ripple')}
        >
        <TouchRipple>
          <div className="menu-item" onTouchTap={() => this.props.handleClose("/")}>
            <div className="menu-icon"><DashboardIcon style={{height: "45%"}}/></div>
            <div className="menu-body">Dashboard</div>
          </div>
        </TouchRipple>
        <TouchRipple>
          <div className="menu-item" onTouchTap={() => this.props.handleClose("/report")}>
            <div className="menu-icon"><ReportIcon style={{height: "45%"}}/></div>
            <div className="menu-body">Reports</div>
          </div>
        </TouchRipple>
        <TouchRipple>
          <div className="menu-item" onTouchTap={() => this.props.handleClose("/profile")}>
            <div className="menu-icon"><ProfileIcon style={{height: "45%"}}/></div>
            <div className="menu-body">Profile</div>
          </div>
        </TouchRipple>
        <TouchRipple>
          <div className="menu-item" onTouchTap={() => this.props.handleClose("/signout")}>
            <div className="menu-icon"><ExitIcon style={{height: "45%"}}/></div>
            <div className="menu-body">Sign Out</div>
          </div>
        </TouchRipple>
      </Drawer>
    )
  }
}
