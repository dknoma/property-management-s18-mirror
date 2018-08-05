import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Use React Table for Sorting */
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import requireTenant from '../requireTenant';

class ViewMyApplication extends Component {

  componentDidMount() {
    if(this.props.params.userId !== "undefined") {
      this.props.fetch_my_applications(this.props.params);
    }
  };

  render() {
    const data = this.props.applications
    console.log(data);
    const columns = [{
      Header: 'Property Name',
      accessor: 'property_name',
      Cell: props => {if(localStorage.getItem('user_type') == 'propertymanager') {
        return(<a href={"/property/" + props.original.propertyId + "/applications/" + props.original.id}>{props.value}</a>)
      } else {
        let userId = localStorage.getItem('my_id');
        return(<a href={"/user/" + userId + "/myapplications/" + props.original.id}>{props.value}</a>
      )}}
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
      <h1> My Applications </h1>
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
    applications: state.application.applications
  }
}

export default connect(mapStateToProps, actions)(requireTenant(ViewMyApplication));
