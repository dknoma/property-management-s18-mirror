import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Use React Table for Sorting */
import ReactTable from 'react-table';
import 'react-table/react-table.css';


class PropertySearchResults extends Component {
  render() {
    const data = this.props.search_results_list;

    const columns = [{
      Header: 'Property Name',
      accessor: 'property_name' // String-based value accessors!
    }, {
      Header: 'City',
      accessor: 'city',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: 'Number of Bedrooms',
      accessor: 'number_of_bedrooms',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: 'State',
      accessor: 'state',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      id: 'prices', // Required because our accessor is not a string
      Header: 'Price',
      accessor: d => d.prices // Custom value accessors!
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
    search_results_list: state.property.search_results_list
  };
}

export default connect(mapStateToProps, actions)(PropertySearchResults);
