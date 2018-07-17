import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Use React Table for Sorting */
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class PropertySearchResults extends Component {
  render() {
    console.log(this.props.search_result_list);
    const data = this.props.search_result_list;

    const columns = [{
      Header: 'Property',
      accessor: 'property_name' // String-based value accessors!
    }, {
      Header: 'state',
      accessor: 'state',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      id: 'price', // Required because our accessor is not a string
      Header: 'Price',
      accessor: d => d.price // Custom value accessors!
    }]
    return (
      <ReactTable
        data={data}
        columns={columns}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    search_result_list: state.property.search_result_list
  };
}

export default connect(mapStateToProps, actions)(PropertySearchResults);
