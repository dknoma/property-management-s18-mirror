import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Use React Table for Sorting */
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import requirePropManager from '../requirePropManager';

class PMReviewApplication extends Component {

  componentDidMount() {
    if(this.props.params.propertyId !== "undefined") {
      this.props.review_applications(this.props.params);
    }
  };

  render() {
    console.log(this.props.applications);

    const data = this.props.applications;

    const columns = [{
      Header: 'Property Name',
      accessor: 'property_name' // String-based value accessors!
    }, {
      Header: 'Property ID',
      accessor: 'propertyId',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: 'Tenant ID',
      accessor: 'tenantId',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: 'Subject',
      accessor: 'form_subject',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: 'Body',
      accessor: 'form_body',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
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
    applications: state.property.applications
  }
}

export default connect(mapStateToProps, actions)(requirePropManager(PMReviewApplication));
