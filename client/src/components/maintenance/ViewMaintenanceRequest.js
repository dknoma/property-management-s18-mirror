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
  componentWillMount() {
    if (this.props.params.maintenanceId !== "undefined") {
      console.log(this.props.params.propertyId);
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
            this.props.approve_maintenance(this.props.params, () => {
              this.props.add_to_prop({propertyId, tenantId}, () => {
                alert("Approval Success!");
                this.props.router.push('/property/review/' + this.props.params.propertyId);
              });
            });
          }
        }>Approve this Maintenance Request</Button></div>
          <br/>
          <div> <Button onClick={() => {
            this.props.deny_maintenance(this.props.params, () => {
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
    <div>
        <div>
          <div>
            <h1>Maintenance Request Information</h1>
            <hr />
          </div>
        </div>
        <div>
          <div>
            <p>Property Manager Id: {this.props.pmId}</p>
            <p>Property ID: {this.props.propertyId}</p>
            <p>Maintenance Requestor ID: {this.props.tenantId}</p>
            <p>Subject: {this.props.form_subject}</p>
            <p>Body: {this.props.form_body}</p>
            <p>Request Approval Status: {this.props.approval_status === null ? 'Pending' : this.props.approval_status === true ? 'Approved' : 'Denied'}</p>
            {this.renderPMInformation()}
          </div>
        </div>
    </div>
  );
}

}

function mapStateToProps(state) {
  return {
    approval_status: state.maintenance.approval_status,
    id: state.maintenance.id,
    tenantId: state.maintenance.tenantId,
    tenant_name: state.maintenance.tenant_name,
    propertyId: state.maintenance.propertyId,
    property_name: state.maintenance.property_name,
    pmId: state.maintenance.pmId,
    form_subject: state.maintenance.form_subject,
    form_body: state.maintenance.form_body
  };
}

export default connect(mapStateToProps, actions)(requireAuth(ViewMaintenanceRequest));
