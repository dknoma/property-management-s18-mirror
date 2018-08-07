import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

/* Redux */
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Higher Order Components */
import requireAuth from '../requireAuth';

class ViewMaintenanceRequest extends React.Component {
  componentDidMount() {
    if (this.props.params.appId !== "undefined") {
      console.log(this.props.params);
      this.props.get_maintenance_request(this.props.params);
    }
  };

  renderPMInformation() {
    if (localStorage.getItem('user_type') ==="propertymanager") {
      let propertyId = this.props.propertyId;
      let tenantId = this.props.tenantId;
      return (
        <div>
          <div> <Button onClick={() => {
            this.props.approve_app(this.props.params, () => {
              this.props.add_to_prop({propertyId, tenantId}, () => {
                alert("Approval Success!");
                this.props.router.push('/property/review/' + this.props.params.propertyId);
              });
            });
          }
        }>Approve this Maintenance Request</Button></div>
          <br/>
          <div> <Button onClick={() => {
            this.props.deny_app(this.props.params, () => {
              alert("Application Denied");
              this.props.router.push('/property/review/' + this.props.params.propertyId);
            });
          }
        }>Disapprove this Maintenance Request</Button></div>
          <br/>
        </div>
      )
    }
  };

render() {
  return (
    <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1>Application Detail</h1>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <p>Property Name: {this.props.property_name}</p>
            <p>Property ID: {this.props.propertyId}</p>
            <p>Applicant Name: {this.props.tenant_name}</p>
            <p>Subject: {this.props.form_subject}</p>
            <p>Body: {this.props.form_body}</p>
            <p>Approval Status: {this.props.approval_status === null ? 'Pending' : this.props.approval_status === true ? 'Approved' : 'Denied'}</p>
            {this.renderPMInformation()}
          </div>
        </div>
    </div>
  );
}

}

function mapStateToProps(state) {
  return {
    approval_status: state.application.approval_status,
    id: state.application.id,
    tenantId: state.application.tenantId,
    tenant_name: state.application.tenant_name,
    propertyId: state.application.propertyId,
    property_name: state.application.property_name,
    pmId: state.application.pmId,
    form_subject: state.application.form_subject,
    form_body: state.application.form_body
  };
}

export default connect(mapStateToProps, actions)(requireAuth(ViewMaintenanceRequest));
