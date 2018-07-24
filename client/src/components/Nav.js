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
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    if (this.props.authenticated) {
      return (
        <div>
          <div>
          Hi, {this.props.my_username}!
          </div>
          <div className={classes.row}>
          <a href="/searchproperty">
            <Avatar className={classes.greenAvatar}>
              <SearchIcon />
            </Avatar>
          </a>
          <a href="/createproperty">
            <Avatar className={classes.greenAvatar}>
              <AddIcon />
            </Avatar>
          </a>
          <a href="/inbox">
            <Avatar className={classes.greenAvatar}>
              <EmailIcon />
            </Avatar>
          </a>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
            <Avatar className={classes.greenAvatar}>
              <AccountCircle />
              </Avatar>
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
                <a href="/logout"><MenuItem>Logout</MenuItem></a>
            </Menu>
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
    my_id: state.auth.my_id
  };
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

/* This syntax exports with the styles. Syntax is weird */

export default connect(mapStateToProps)(withStyles(styles)(Nav));
