import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Redux */
import { createStore, compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

/* Using Redux form, material UI, and redux-form-material-ui for forms */
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField, RadioGroup } from 'redux-form-material-ui';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

<<<<<<< HEAD
import requirePropManager from '../requirePropManager';
=======
import RequirePropManager from '../RequirePropManager';
>>>>>>> f7f4bbd98d6f32ef7a9689eef4580a60323a779d

const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

const styles = theme => ({
  root: {
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },
});

class CreateProperty extends Component {
  constructor(props) {
    super(props);
    this.state={
      property_name: '',
      userId: localStorage.getItem('id')
    }
  }

  ListDividers() {
  const { classes } = this.props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemText primary="Inbox" />
        </ListItem>
        <Divider />
        <ListItem button divider>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary="Spam" />
        </ListItem>
      </List>
    </div>
  );
}

  onSubmit = ({property_name, number_of_bedrooms, number_of_bathrooms, prices, property_type, street, city, state, zip, allows_pets, url_address}) => {
    if(!property_type || !allows_pets) {
      alert("Please fill all the fields");
      return;
    }
    console.log('print' + { property_name, number_of_bedrooms, number_of_bathrooms, prices, property_type, street, city, state, zip, allows_pets, url_address});
    this.props.create_property({property_name, number_of_bedrooms, number_of_bathrooms, prices, property_type, street, city, state, zip, allows_pets, url_address}, () => {
      alert("Property successfully created!");
      this.props.router.push("/propertylisting");
    });
  //console.log(({user_type, username, email, firstname, lastname, password});
  };

  render() {
    const { handleSubmit } = this.props;
    let userId = localStorage.getItem('id');
    return (
      <div className="row">
      <Typography color="inherit" variant="display1">
      Create Property
      </Typography>

        <form className="belowNav" onSubmit={handleSubmit(this.onSubmit)} align="center">
        <div>
          <Field name="userId" id="userId" component={TextField} label={'Prop Manager ID: ' + userId} disabled/>
        </div>
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
          <Field name="property_type" id="property_type" component={RadioGroup} >
            <label>
              <input type="radio" name="property_type" value="single_room" onChange={this.handleRadioChange}/>Single Room
            </label>
            <label>
              <input type="radio" name="property_type" value="whole_house" onChange={this.handleRadioChange}/>Whole House
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
        <Field name="allows_pets" id="allows_pets" component={RadioGroup} >
          <label>
            <input type="radio" name="allows_pets" value="true" onChange={this.handleRadioChange}/>Yes
          </label>
          <label>
            <input type="radio" name="allows_pets" value="false" onChange={this.handleRadioChange}/>No
          </label>
        </Field>
        </div>
        <div>
          <Field name="url_address" id="url_address" label="URL Address" component={TextField} validate={[ required ]} />
        </div>
        <br/>
        <button className = "button" type="submit">Create new property</button>
        <br />
      </form>
      </div>
    )

  }
}


function mapStateToProps(state) {
  return {
    userId: state.auth.id
  };
}

CreateProperty.propTypes = {
  classes: PropTypes.object.isRequired,
};

CreateProperty = reduxForm({
  form: 'create_property'
})(CreateProperty)


export default compose (
  connect(mapStateToProps, actions),
<<<<<<< HEAD
)(withStyles(styles)(requirePropManager(CreateProperty)));
=======
)(RequirePropManager(withStyles(styles)(CreateProperty)));
>>>>>>> f7f4bbd98d6f32ef7a9689eef4580a60323a779d
