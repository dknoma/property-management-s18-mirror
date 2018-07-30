import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Use React Table for Sorting */
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class ViewTenants extends Component {

  /*when directed*/
  componentDidMount() {
    this.props.fetch_tenants(this.props.params);
  };


  render() {
    const data = this.props.propertyTenants;
    const columns = [{
      Header: 'Property Name',
      accessor: 'property_name',// String-based value accessors!
      Cell: props => <a href={"/property/" + props.original.id}>{props.value}</a>

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
      <div>
      <h1> View Tenants </h1>
      <ReactTable
        data={data}
        columns={columns}
      />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    propertyTenants: state.property.propertyTenants
  };
}

export default connect(mapStateToProps, actions)(ViewTenants);
