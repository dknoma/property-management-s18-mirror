import React, { Component } from "react";
import "../index.css";
import PropTypes from 'prop-types';
import { Link } from 'react-router';

/* Redux */
import { connect } from 'react-redux';
import { createStore, compose } from 'redux';

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
};

export class Nav extends Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  /* Shifts focus of anchor element */
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  /* Closes the menu */
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderLinks() {
    if (this.props.authenticated) {
      return <div>
        Hi, {this.props.my_username}! &nbsp; &nbsp;<a href="/logout">Logout</a>
      </div>
    } else {
      return <div>
      <a href="/login">Login</a></div>
    }
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (

      <div className={classes.root}>
        <AppBar position="static" className="nav">
          <Toolbar>
            <a href="/">
              <Typography variant="title" color="inherit" className={classes.flex}>
                Property Management App
              </Typography>
            </a>
            {this.renderLinks()}
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
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
                  onClose={this.handleClose}
                >
                    <a href={"/profile/" + localStorage.getItem('my_id')} ><MenuItem>Profile</MenuItem></a>
                    <a href={"/edit"} ><MenuItem>Edit Profile</MenuItem></a>
                </Menu>
              </div>
            )}
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
    my_id: state.auth.my_id
  };
}


/* This syntax exports with the styles. Syntax is weird*/

export default connect(mapStateToProps)(withStyles(styles)(Nav));
