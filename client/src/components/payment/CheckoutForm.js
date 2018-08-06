import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import {CardElement,
  StripeProvider,
  Elements,
  injectStripe} from 'react-stripe-elements';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

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
    amt: null,
    tenantId: this.props.tenantId
  };
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    let tenantId = this.props.tenantId;
    console.log(tenantId);
    this.props.view_rent({tenantId}, () => {
      const propertyTenant = this.props.propertyTenant;
      console.log(propertyTenant);
      this.setState( {
        amt : propertyTenant.rent
      })
      console.log(this.state)
    });
  }

  renderInfo() {
    console.log(this.state.amt);
    return (
      <div className="rentInfo">
        <p>Rent Amount: {this.state.amt}</p>
      </div>
    )

  }

  async submit(ev) {
    let tenantId = this.state.tenantId;
    let rent = this.state.amt;
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

    this.props.pay_rent({tenantId, stripeToken: token.id, amount: rent, description:'rent'})

  }

  render() {
    return (
      <div className="checkout">
      { this.renderInfo()}
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
    propertyTenant: state.payment.propertyTenant,
    tenantPayment: state.payment.tenantPayment
  };
}

export default connect(mapStateToProps, actions)(injectStripe(CheckoutForm));
