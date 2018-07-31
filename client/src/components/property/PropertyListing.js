import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Use React Table for Sorting */
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class PropertyListing extends Component {

  /*when directed*/
  componentDidMount() {
    this.props.fetchProperties();
  };


  render() {
    const data = this.props.property_list;
    console.log(this.props.property_list);
    const columns = [{
      Header: 'Property Name',
      accessor: 'property_name',// String-based value accessors!
      Cell: props => <a href={"/property/" + props.original.id}>{props.value}</a>

    }, {
      Header: 'Bedrooms',
      accessor: 'number_of_bedrooms',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    },{
      Header: 'Bathrooms',
      accessor: 'number_of_bathrooms',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    },{
      Header: 'Street',
      accessor: 'street'
    }, {
      Header: 'City',
      accessor: 'city'
    }, {
      Header: 'State',
      accessor: 'state'
    }, {
      id: 'prices', // Required because our accessor is not a string
      Header: 'Price',
      accessor: d => d.prices // Custom value accessors!
    },{
      Header: 'Allow Pets?',
      accessor: 'allows_pets',
      Cell: props => props.value === true ? 'Yes' : 'No'
    }]
    return (
      <div>
      <h1> Property Listing </h1>
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={10}
      />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    property_list: state.property.property_list
  };
}

export default connect(mapStateToProps, actions)(PropertyListing);
