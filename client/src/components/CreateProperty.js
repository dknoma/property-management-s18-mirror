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
import { TextField } from 'redux-form-material-ui';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const required = value => value ? undefined : 'Required';


const renderTextField = (
  { input, label, meta: { touched, error }, ...custom },
) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);


const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

class CreateProperty extends Component {
  constructor(props) {
    super(props);
    this.state={
      property_name: ''
    }
  }
  onSubmit = ({property_name}) => {
    // if(user_type === undefined) {
    //   alert("Please select the user type!");
    //   return;
    // }
    console.log({property_name});
    // this.props.signup({user_type, username, email, firstname, lastname, password}, () => {
    //   this.props.router.push("/profile");
    // });
  //console.log(({user_type, username, email, firstname, lastname, password});
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <MuiThemeProvider>
        <form onSubmit={handleSubmit(this.onSubmit)}>
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
          <div>
            <Field name="rent_type" component={renderRadioGroup}>
              <RadioButton value="single_room" label="Single Room" />
              <RadioButton value="whole_house" label="Whole House" />
            </Field>
          </div>
          <button className = "button" type="submit">Submit</button>
          <br />
        </form>
      </MuiThemeProvider>
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
