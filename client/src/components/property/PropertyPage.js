import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

class PropertyPage extends Component {

  /*when directed*/
  componentDidMount() {
    console.log(this.props);
    this.props.get_property_profile(this.props.params);
  };

  renderHeader(headers) {

  }
  renderItem() {
    const { property } = this.props;
    return (
    <tr>
      <td>{this.props.id}</td>
      <td>{this.props.property_name}</td>
      <td>{this.props.number_of_bedrooms}</td>
      <td>{this.props.number_of_bathrooms}</td>
      <td>{this.props.prices}</td>
      <td>{this.props.street}</td>
      <td>{this.props.city}</td>
      <td>{this.props.state}</td>
      <td>{this.props.zip}</td>
      <td>{this.props.allows_pets}</td>
    </tr>
  )}

  // renderTable() {
  //   const
  // }

  render() {
    return (
      <div className="propTable">
      <table>
      <tbody>
        {this.renderItem()}
      </tbody>
      </table>
      <br/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
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
