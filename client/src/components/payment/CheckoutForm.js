import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import {CardElement,
  StripeProvider,
  Elements,
  injectStripe} from 'react-stripe-elements';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';


// const handleBlur = () => {
//   console.log('[blur]');
// };
// const handleChange = (change) => {
//   console.log('[change]', change);
// };
// const handleFocus = () => {
//   console.log('[focus]');
// };
// const handleReady = () => {
//   console.log('[ready]');
// };

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '18px',
      color: '#424770',
      letterSpacing: '0.025em',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

class CheckoutForm extends Component {

  constructor(props) {
    super(props);
    //hard coding input
    this.state = {
      complete: false,
    amt: 2000,
    tenantId: this.props.tenantId
  };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let tenantId = this.state.tenantId;
    let {token} = await this.props.stripe.createToken({name: "Name"});
    console.log(token.id);
    //example used fetch but I couldn't see the request payload if I used fetch
    // let response = await axios.post("/api/payments/" + this.state.tenantId + "/charge",
    // {stripeToken: token.id, amount: this.state.amt, tenantId: this.state.tenantId, description: "rent"}
    //
    // ).then (function(response) {
    //   console.log('BACK!');
    // })
    //console.log(token.id);
    //example used fetch but I couldn't see the request payload if I used fetch
    this.props.pay_rent({tenantId, stripeToken: token.id, amount: 2000, description:'rent'})

  }

  render() {
    console.log(this.state);
    const data = this.props.propertyTenant;
    return (
      <div className="checkout">
        <CardElement
           {...CARD_ELEMENT_OPTIONS}
         />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    propertyTenant: state.payment.propertyTenant
  };
}

export default connect(mapStateToProps, actions)(injectStripe(CheckoutForm));
