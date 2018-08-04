import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Use React Table for Sorting */
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import RequirePropManager from '../RequirePropManager';

class ViewAllMaintenanceRequests extends Component {

  componentDidMount() {
    console.log("fires");
    if(this.props.params.propertyId !== "undefined") {
      this.props.fetch_my_maintenance_requests(this.props.params);
    }
  };

  render() {
    const data = this.props.maintenance;

    const columns = [{
      Header: 'Property Name',
      accessor: 'property_name',
      Cell: props => <a href={"/property/" + props.original.propertyId + "/maintenance/" + props.original.id}>{props.value}</a>
    }, {
      Header: 'Property ID',
      accessor: 'propertyId',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: 'Tenant ID',
      accessor: 'tenantId',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: 'Tenant Name',
      accessor: 'tenant_name'
    },{
      Header: 'Subject',
      accessor: 'form_subject'
    }, {
      Header: 'Body',
      accessor: 'form_body'
    },{
      Header: 'Status',
      accessor: 'approval_status', // boolean
      Cell: props =>  props.value === null ? 'Pending' : props.value === true ? 'Approved' : 'Denied'
    },]
    return (
      <div>
      <h1> All Maintenance Requests </h1>
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
    maintenancerequests: state.maintenance.maintenancerequests
  }
}

export default connect(mapStateToProps, actions)(RequirePropManager(ViewAllMaintenanceRequests));
