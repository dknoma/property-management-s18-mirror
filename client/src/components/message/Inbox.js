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

/* Use React Table for Sorting */
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },
});


class Inbox extends Component {

  /*when directed*/
  componentDidMount() {
    this.props.get_messages(localStorage.getItem('my_id'));
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
        <Divider light/>
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


  render() {
    const data = this.props.messages;
    console.log(this.props.messages);
    const columns = [{
      Header: 'Sender',
      accessor: 'senderId', // String-based value accessors!
      Cell: props => <a href={"/message/" + props.original.id}>{props.value}</a>
    }, {
      Header: 'Time Received',
      accessor: 'createdAt',
    }, {
      Header: 'Subject',
      accessor: 'subject',
    },{
      Header: 'Body',
      accessor: 'body',
    },{
      Header: 'Read?',
      accessor: 'viewed',
      Cell: props => <span className='boolean'>{props.value.toString()}</span>
    }]
    return (
      <div>
      <h1>Inbox</h1>
        <div className="propTable">
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
        />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.message.messages,
    id: state.auth.id
  };
}

Inbox.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default connect(mapStateToProps, actions)(withStyles(styles)(Inbox));
