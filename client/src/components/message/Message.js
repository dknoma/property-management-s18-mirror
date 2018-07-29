import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

/* Material UI */
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },
});


class Message extends Component {

  /*when directed*/
  componentDidMount() {
    this.props.fetchProperties();
  };

  ListDividers() {
  const { classes } = this.props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemText primary="Inbox" />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText primary="Sent" />
        </ListItem>
        <Divider light />
      </List>
    </div>
  );
}


  renderHeader(headers) {
    return headers.map(header => {
      return <th
      key={header.key}
      id={header.key}
      width={header.columnWidth}
      onClick={this.handleClick}
      >{header.label}</th>
    });
  }

  renderItem() {
    const { inbox } = this.props;
  };

  // renderTable() {
  //   const
  // }

  render() {
    let headers = [

    ];
    return (
      <div>
      <h1>Inbox</h1>
      {this.ListDividers(this.props)}
        <div className="propTable">
        <table>
          {this.renderHeader(headers)}
        <tbody>
          {this.renderItem()}
        </tbody>
        </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inbox: state.property.property_list,
    id: state.auth.id
  };
}

Message.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default connect(mapStateToProps, actions)(withStyles(styles)(Message));
