import React, { Component } from "react";
import "../index.css";
import PropTypes from 'prop-types';
import { Link } from 'react-router';

/* Redux */
import { connect } from 'react-redux';
import { createStore, compose } from 'redux';

/* Material UI */
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import Avatar from '@material-ui/core/Avatar';
import EmailIcon from '@material-ui/icons/Email';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import Badge from '@material-ui/core/Badge';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: orange[500],
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  badge: {
    top: 1,
    right: -15,
    // The border color match the background color.
  },
};

export class Nav extends Component {
  state = {
    auth: true,
    profilemenu: null,
    mailmenu: null,
    unviewedMessages: this.props.unviewedMessages
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  /* Shifts focus of anchor element */
  handleProfileMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  /* Closes the menu */
  handleProfileMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  /* Shifts focus of anchor element */
  handleMailMenu = event => {
    this.setState({ anchorEl2: event.currentTarget });
  };

  /* Closes the menu */
  handleMailMenuClose = () => {
    this.setState({ anchorEl2: null });
  };

  insertPMLinks () {
    const { classes } = this.props;
    if (this.props.user_type == 'propertymanager') {
    return (
      <span>
        <a href="/application/viewallapplications">
          <Avatar className={classes.greenAvatar}>
            <AssignmentIcon />
          </Avatar>
        </a>
        <a href="/createproperty">
          <Avatar className={classes.greenAvatar}>
            <AddIcon />
          </Avatar>
        </a>
      </span>
    )
    }
  }

  insertTenantLinks () {
    const { classes } = this.props;
    if (this.props.user_type == 'tenant') {
      console.log(this.props.user_type);
    }
  }

  insertNotifications () {
    const { classes } = this.props;
    const { anchorEl2 } = this.state;
    const open = Boolean(anchorEl2);
    console.log(this.props.unviewedMessages);
    if (this.props.unviewedMessages > 0){
      return (
      <a href={"/inbox/" + localStorage.getItem('my_id')}>
        <IconButton aria-label="Email">
          <Badge badgeContent={this.props.unviewedMessages} classes={{ badge: classes.orangeAvatar }}>
          <Avatar className={classes.greenAvatar}>
            <EmailIcon />
            </Avatar>
          </Badge>
        </IconButton>
      </a>
    );
    } else {
      return (
        <div>
        <Avatar className={classes.greenAvatar}>
        <IconButton
          aria-owns={open ? 'mail-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMailMenu}
          color="inherit"
        >
          <EmailIcon />
        </IconButton>
        </Avatar>
          <Menu
            id="mail-appbar"
            anchorEl={anchorEl2}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={this.handleMailMenuClose}
          >
              <a href={"/inbox/" + localStorage.getItem('my_id')} ><MenuItem>Inbox</MenuItem></a>
              <a href={"/composeMessage"} ><MenuItem>New Message</MenuItem></a>
          </Menu>
        </div>
      );
    }
  }

  renderLinks() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    if (this.props.authenticated) {
      return (
        <div className="nav">
          <div>
          Hi, {this.props.my_username}!
          </div>
          <div className={classes.row}>
          {this.insertTenantLinks()}
          {this.insertPMLinks()}
          <span>
          <a href="/propertylisting">
            <Avatar className={classes.greenAvatar}>
              <HomeIcon />
            </Avatar>
          </a>
          <a href="/searchproperty">
            <Avatar className={classes.greenAvatar}>
              <SearchIcon />
            </Avatar>
          </a>
          </span>
          <span>
          {this.insertNotifications()}
          <Avatar className={classes.greenAvatar}>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleProfileMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            </Avatar>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleProfileMenuClose}
            >
                <a href={"/profile/" + localStorage.getItem('my_id')} ><MenuItem>Profile</MenuItem></a>
                <a href={"/edit"} ><MenuItem>Edit Profile</MenuItem></a>
                <a href="/logout"><MenuItem>Logout</MenuItem></a>
            </Menu>

            </span>
          </div>
        </div>
    )
    } else {
      return <div>
      <a href="/login">Login</a></div>
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" className="nav">
          <Toolbar>
            <a href="/" className="brand">
              <Typography variant="title" color="inherit" className={classes.flex}>
                Property Management App
              </Typography>
            </a>
            {this.renderLinks()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    my_username: state.auth.my_username,
    my_id: state.auth.my_id,
    user_type: state.auth.user_type,
    unviewedMessages: state.auth.unviewedMessages
  };
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

/* This syntax exports with the styles. Syntax is weird */

export default connect(mapStateToProps)(withStyles(styles)(Nav));
