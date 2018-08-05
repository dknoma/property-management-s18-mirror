import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Using Redux form, material UI, and redux-form-material-ui for forms */
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField, RadioGroup } from 'redux-form-material-ui';
import SelectField from 'material-ui/SelectField'
import 'react-widgets/dist/css/react-widgets.css'


/*
const colors = [ { color: 'Red', value: 'ff0000' },
  { color: 'Green', value: '00ff00' },
  { color: 'Blue', value: '0000ff' } ]

const renderDropdownList = ({ input, ...rest }) =>
  <DropdownList {...input} {...rest}/>
*/
class SearchProperty extends Component {
  constructor(props) {
    super(props);
  }
  state = {
     location: '',
   };

   onSubmit = ({price_gte, number_of_bedrooms, number_of_bathrooms, prices, city, state, zip, allows_pets, property_type}) => {
    // console.log({price_gte, number_of_bedrooms, number_of_bathrooms, prices, city, state, zip, allows_pets, property_type});

     this.props.search_property({price_gte, number_of_bedrooms, number_of_bathrooms, prices, city, state, zip, allows_pets, property_type}, () => {
       this.props.router.push("/propertysearchresults");
     })
   //console.log(({user_type, username, email, firstname, lastname, password});
   };

  render() {
  const { handleSubmit } = this.props;
    return (
        <form onSubmit={handleSubmit(this.onSubmit)} align="center">
        <h1>
        Search Property
        </h1>
        <br />
        <div>
          <label>City &nbsp; &nbsp;</label>
          <Field name="city" id="city" component={ TextField }/>
        </div>
        <div>
          <label>State &nbsp; &nbsp;</label>
          <Field name="state" id="state" component={ TextField }/>
        </div>
        <div>
          <label>Zipcode &nbsp; &nbsp;</label>
          <Field name="zip" id="zip" component={ TextField }/>
        </div>
        <br/>
        <div>
          <label>Rent Type &nbsp; &nbsp;</label>
          <Field component="select" name="property_type">
             <option value=''>Select</option>
             <option value='whole_house'>Whole House</option>
             <option value='single_room'>Single Room</option>
           </Field>
        </div>
        <div>
          <label>Price Range</label>
          &nbsp; &nbsp;
          <Field component="select" name="price_gte" id="price_gte">
            <option value=''>Select</option>
            <option value='>'>Greater than</option>
            <option value='<'>Less than</option>
          </Field>
          &nbsp; &nbsp;
          <Field label="Price" name="prices" id="prices" component={ TextField }/>
        </div>
        <br />
        <div>
          <label>Allow Pets &nbsp; &nbsp;</label>
          <Field component="select" name="allows_pets">
             <option value=''>Select</option>
             <option value='true'>Yes</option>
             <option value='false'>No</option>
           </Field>
        </div>
        <br />
        <label>Number of Bedrooms &nbsp; &nbsp;</label>
        <Field name="number_of_bedrooms" id="number_of_bedrooms" component={ TextField }/>
        <br/>
        <label>Number of Bathrooms &nbsp; &nbsp;</label>
        <Field id="number_of_bathrooms" name="number_of_bathrooms" component={ TextField }/>
        <br/>
        <button className = "button" type="submit">Search property</button>
        <br />
        </form>
    )
  }
}

SearchProperty = reduxForm({
  form: 'search_property'
})(SearchProperty)

export default connect(null, actions)(SearchProperty);
