import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

class PropertyListing extends Component {

  /*when directed*/
  componentDidMount() {
    this.props.fetchProperties();
  };

  renderHeader(headers) {

    return headers.map(header => {
      return <th
      key={header.key}
      id={header.key}
      width={header.columnWidth}
      onClick={this.handleClick}
      >{header.label}</th>
    });
  }

  renderItem() {
    const { propertylist } = this.props;
    return propertylist.map(property =>
    <tr className="table">
      <td><a href={"/property/" + property.id}>{property.id}</a></td>
      <td><a href={"/property/" + property.id}>{property.property_name}</a></td>
      <td><a href={"/property/" + property.id}>{property.number_of_bedrooms}</a></td>
      <td><a href={"/property/" + property.id}>{property.number_of_bathrooms}</a></td>
      <td><a href={"/property/" + property.id}>{property.prices}</a></td>
      <td><a href={"/property/" + property.id}>{property.street}</a></td>
      <td><a href={"/property/" + property.id}>{property.city}</a></td>
      <td><a href={"/property/" + property.id}>{property.state}</a></td>
      <td><a href={"/property/" + property.id}>{property.zip}</a></td>
      <td><a href={"/property/" + property.id}>{property.allows_pets}</a></td>
    </tr>
  )}

  // renderTable() {
  //   const
  // }

  render() {
    let headers = [
      { key: 'index', label: '#', columnWidth: '5' },
      { key: 'property_name', label: 'Property Name', columnWidth: '250px' },
      { key: 'number_of_bedrooms', label: 'Number of Bedrooms', columnWidth: '100px' },
      { key: 'number_of_bathrooms', label: 'Number of Bathrooms', columnWidth: '100px' },
      { key: 'prices', label: 'Rent', columnWidth: '100px' },
      { key: 'street', label: 'Street', columnWidth: '150px' },
      { key: 'city', label: 'City', columnWidth: '100px' },
      { key: 'state', label: 'State', columnWidth: '100px' },
      { key: 'zip', label: 'Zip', columnWidth: '90px' },
      { key: 'allows_pets', label: 'Allow Pets', columnWidth: '80px'}
    ];
    return (
      <div className="propTable">
      <table>
        {this.renderHeader(headers)}
      <tbody>
        {this.renderItem()}
      </tbody>
      </table>
      <br/>
      <div> <a class="button" href="/createproperty"> Create New Property </a></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    propertylist: state.property.property_list
  };
}

export default connect(mapStateToProps, actions)(PropertyListing);
