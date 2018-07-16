import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Using Redux form, material UI, and redux-form-material-ui for forms */
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField, RadioGroup } from 'redux-form-material-ui';

const ranges = [
  {
    value: '0-20',
    label: '0 to 20',
  },
  {
    value: '21-50',
    label: '21 to 50',
  },
  {
    value: '51-100',
    label: '51 to 100',
  },
];

class SearchProperty extends Component {
  state = {
     amount: '',
     password: '',
     weight: '',
     weightRange: '',
     showPassword: false,
   };

   handleChange = prop => event => {
     this.setState({ [prop]: event.target.value });
   };

   onSubmit = ({property_name, number_of_bedrooms, number_of_bathrooms, prices, property_type, street, city, state, zip, allows_pets, url_address}) => {
     // if(!property_type || !allows_pets) {
     //   alert("Please fill all the fields");
     //   return;
     // }
     // console.log({property_name, number_of_bedrooms, number_of_bathrooms, prices, property_type, street, city, state, zip, allows_pets, url_address});
     // this.props.create_property({property_name, number_of_bedrooms, number_of_bathrooms, prices, property_type, street, city, state, zip, allows_pets, url_address}, () => {
     //   alert("Property successfully created!");
     //   this.props.router.push("/propertylisting");
     // });

     return;
   //console.log(({user_type, username, email, firstname, lastname, password});
   };

  render() {
  const { handleSubmit } = this.props;
    return (
        <form className="belowNav" >
        <Typography color="inherit" variant="display1">
        Search Property
        </Typography>
        <label>Location &nbsp; &nbsp;</label>
        <TextField label="City"
          id="city"/>
        <br/>
        <label>Price Range</label>
        &nbsp; &nbsp;
        {/*}<TextField select label="Select"
          value={this.state.weightRange}
          onChange={this.handleChange('weightRange')}>
        {ranges.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </TextField>*/}
        <TextField select label="" onChange={this.handleChange}>
          <MenuItem id="price_gte" value=">" label="greaterthan">Greater than</MenuItem>
          <MenuItem id="price_gte" value="<" label="lessthan">Less than</MenuItem>
        </TextField>
        &nbsp; &nbsp;
        <TextField label="Price" id="price"/>
        <br/>
        <label>Allow Pets &nbsp; &nbsp;</label>
        <div className="radioBtn">
        <Field name="allows_pets" id="allows_pets" component={RadioGroup} >
          <label>
            <input type="radio" name="allows_pets" value="true" onChange={this.handleRadioChange}/>Yes
          </label>
          <label>
            <input type="radio" name="allows_pets" value="false" onChange={this.handleRadioChange}/>No
          </label>
        </Field>
        </div>

          <br />
        <button className = "button" type="submit">Search property</button>
        <br />
        </form>
    )
  }
}

SearchProperty = reduxForm({
  form: 'search_property'
})(SearchProperty)

export default SearchProperty;
