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
      Header: 'Property ID',
      accessor: 'propertyId'
    }, {
      Header: 'TenantId',
      accessor: 'tenantId',
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
