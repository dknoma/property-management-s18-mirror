import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';
import "../../index.css";

import requireAuth from '../requireAuth';

import house1 from '../../assets/img/house1.jpg';

class PropertyPage extends Component {

  /*when directed*/
  componentDidMount() {
    if (this.props.params.propertyId != "undefined") {
      this.props.get_property_profile(this.props.params);
    }
  };

  renderHeader(headers) {

  }

  renderItem() {
    const { property } = this.props;
    return (
      <div>
      <h2>{this.props.property_name}</h2>
      <img src={house1} className="thumbnail" />
        <p><b>Property Manager ID: </b>{this.props.userId}</p>
        <p>Property ID: {this.props.id}</p>
        <p>Number of Bedrooms: {this.props.number_of_bedrooms}</p>
        <p>Number of Bathrooms: {this.props.number_of_bathrooms}</p>
        <p>Price: {this.props.prices}</p>
        <p>Address: {this.props.street}</p>
        <p>{this.props.city}</p>
        <p>{this.props.state}</p>
        <p>{this.props.zip}</p>
        <p>Pets? {String(this.props.allows_pets)}</p>

      </div>
  )}

  renderPotentialTenantInfo() {
      if (localStorage.getItem('user_type') === "tenant") {
          return (
            <div>
              <div><a class="button" href={"/apply/" + this.props.params.propertyId}> Apply for this property</a></div>
              <br/>
            </div>
          )
      }
  }
  renderPMInfo() {
    if (localStorage.getItem('user_type') === "propertymanager") {
        return (
          <div>
            <div> <a class="button" href={"/property/review/" + this.props.params.propertyId}>Review Applications</a></div>
            <br/>
            <div> <a class="button" href={"/property/" + this.props.params.propertyId + "/viewtenants"}>View Tenants for the property</a></div>
          </div>
        )
    }
  }

  render() {
    return (
      <div className="propInfo">
          { this.renderItem() }
        <br />
          { this.renderPotentialTenantInfo() }
          { this.renderPMInfo() }
          <br />
          <div><a class="button" href={"/maintenance/" + this.props.params.propertyId}>Submit Maintenance Request for this property</a></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.property.userId,
    id: state.property.id,
    property_name: state.property.property_name,
    number_of_bedrooms: state.property.number_of_bedrooms,
    number_of_bathrooms: state.property.number_of_bathrooms,
    prices: state.property.prices,
    property_type: state.property.property_type,
    state: state.property.state,
    street: state.property.street,
    url_address: state.property.url_address,
    zip: state.property.zip,
    allows_pets: state.property.allows_pets
  };
}

export default connect(mapStateToProps, actions)(PropertyPage);
