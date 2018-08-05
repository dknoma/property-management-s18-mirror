import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Use React Table for Sorting */
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import RequirePropManager from '../RequirePropManager';

class PMReviewApplication extends Component {

  componentDidMount() {
    if(this.props.params.propertyId !== "undefined") {
      this.props.review_applications(this.props.params);
    }
  };

  render() {
    const data = this.props.applications;

    const columns = [{
      Header: 'Property Name',
      accessor: 'property_name',
      Cell: props => <a href={"/property/" + props.original.propertyId + "/applications/" + props.original.id}>{props.value}</a>
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
      <h1> Review Application for Property {this.props.params.propertyId}</h1>
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

export default connect(mapStateToProps, actions)(RequirePropManager(PMReviewApplication));
