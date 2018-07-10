import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Redux */
import { createStore, compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

/* Using Redux form, material UI, and redux-form-material-ui for forms */
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField, RadioGroup } from 'redux-form-material-ui';

const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined


class CreateProperty extends Component {
  constructor(props) {
    super(props);
    this.state={
      property_name: ''
    }
  }
  onSubmit = ({property_name, number_of_bedrooms, number_of_bathrooms, prices, rent_type, street, city, state, zip, allow_pets}) => {
    if(!rent_type || !allow_pets) {
      alert("Please fill all the fields");
      return;
    }
    console.log({property_name});
    this.props.create_property({property_name, number_of_bedrooms, number_of_bathrooms, prices, rent_type, street, city, state, zip, allow_pets}, () => {
      alert("Property successfully created!");
      this.props.router.push("/");
    });
  //console.log(({user_type, username, email, firstname, lastname, password});
  };

  render() {
    const { handleSubmit } = this.props;
    return (
        <form className="belowNav" onSubmit={handleSubmit(this.onSubmit)} align="center">
        <Typography color="inherit" variant="display1">
        Create Property
        </Typography>
        <div>
          <Field name="property_name" id="property_name" label="Property Name" component={TextField} validate={[ required ]} />
        </div>
        <div>
          <Field name="number_of_bedrooms" id="number_of_bedrooms" label="Number of Bedrooms" component={TextField} validate={[ required ]} />
        </div>
        <div>
          <Field name="number_of_bathrooms" id="number_of_bathrooms" label="Number of Bathrooms" component={TextField} validate={[ required ]} />
        </div>
        <div>
          <Field name="prices" id="prices" label="Prices" component={TextField} validate={[ required ]} />
        </div>
        <br/>
        <Typography color="inherit" variant="subheading" >
        Rental Type
        </Typography>
        <br/>
        <div className="radioBtn">
          <Field name="rent_type" id="rent_type" component={RadioGroup} >
            <label>
              <input type="radio" name="rent_type" value="single_room" onChange={this.handleRadioChange}/>Single Room
            </label>
            <label>
              <input type="radio" name="rent_type" value="whole_house" onChange={this.handleRadioChange}/>Whole House
            </label>
            </Field>
        </div>
        <div>
          <Field name="street" id="street" label="Street" component={TextField} validate={[ required ]} />
        </div>
        <div>
          <Field name="city" id="city" label="City" component={TextField} validate={[ required ]} />
        </div>
        <div>
          <Field name="state" id="state" label="State" component={TextField} validate={[ required ]} />
        </div>
        <div>
          <Field name="zip" id="zip" label="Zipcode" component={TextField} validate={[ required, number ]}/>
        </div>
        <br/>
        <Typography color="inherit" variant="subheading">
        Allow Pets?
        </Typography>
        <div className="radioBtn">
        <br/>
        <Field name="allow_pets" id="allow_pets" component={RadioGroup} >
          <label>
            <input type="radio" name="allow_pets" value="true" onChange={this.handleRadioChange}/>Yes
          </label>
          <label>
            <input type="radio" name="rent_type" value="false" onChange={this.handleRadioChange}/>No
          </label>
          </Field>
        </div>
        <br/>
        <button className = "button" type="submit">Create new property</button>
        <br />
      </form>
    )

  }
}


function mapStateToProps(state) {
  return {errorMessage: state.auth.errorMessage};
}

CreateProperty = reduxForm({
  form: 'create_property'
})(CreateProperty)


export default compose (
  connect(mapStateToProps, actions),
)(CreateProperty);
