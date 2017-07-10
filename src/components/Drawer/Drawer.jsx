import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import classnames from 'classnames';
import Subheader from 'material-ui/Subheader';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import ReportIcon from 'material-ui/svg-icons/editor/multiline-chart';
import TodoIcon from 'material-ui/svg-icons/image/timer';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import EventIcon from 'material-ui/svg-icons/action/event';
import NetworkIcon from 'material-ui/svg-icons/social/group';
import ResourceIcon from 'material-ui/svg-icons/image/collections-bookmark';
import AchievementIcon from 'material-ui/svg-icons/action/stars';
import ProfileIcon from 'material-ui/svg-icons/action/account-circle';
import TableIcon from 'material-ui/svg-icons/action/date-range';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';

export default class customDrawer extends Component {

  render() {
    return(
      <Drawer
          docked={false}
          width={250}
          open={this.props.drawerStatus}
          onRequestChange={this.props.handleClose}
        >
        <MenuItem primaryText="Dashboard" onTouchTap={this.props.handleClose} leftIcon={<DashboardIcon />} className={classnames('menuItem')}/>
        <MenuItem primaryText="Reports" onTouchTap={this.props.handleClose} leftIcon={<ReportIcon />} className={classnames('menuItem')} />
        <MenuItem primaryText="Time Table" onTouchTap={this.props.handleClose} leftIcon={<TableIcon />} className={classnames('menuItem')} />
        <MenuItem primaryText="ToDo" onTouchTap={this.props.handleClose} leftIcon={<TodoIcon />} className={classnames('menuItem')} />
        <MenuItem primaryText="Assignment" onTouchTap={this.props.handleClose} leftIcon={<AssignmentIcon />} className={classnames('menuItem')} />
        <MenuItem primaryText="Events" onTouchTap={this.props.handleClose} leftIcon={<EventIcon />} className={classnames('menuItem')} />
        <MenuItem primaryText="My Network" onTouchTap={this.props.handleClose} leftIcon={<NetworkIcon />} className={classnames('menuItem')} />
        <MenuItem primaryText="Resources" onTouchTap={this.props.handleClose} leftIcon={<ResourceIcon />} className={classnames('menuItem')} />
        <MenuItem primaryText="Achievements" onTouchTap={this.props.handleClose} leftIcon={<AchievementIcon />} className={classnames('menuItem')} />
        <MenuItem primaryText="Profile" onTouchTap={this.props.handleClose} leftIcon={<ProfileIcon />} className={classnames('menuItem')} />
        <MenuItem primaryText="Sign Out" onTouchTap={this.props.handleClose} leftIcon={<ExitIcon />} className={classnames('menuItem')} />
        <Subheader className={classnames('drawerFooter')}>IEEECS@MSIT</Subheader>
      </Drawer>
    )
  }
}
