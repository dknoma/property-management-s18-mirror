import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import requireTenant from '../requireTenant';
import { withRouter } from 'react-router-dom';

class ViewRent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tenantId: this.props.params.tenantId
    }
  }
  render() {
   return (
     <StripeProvider apiKey="pk_test_gLDIU8TBBFzSw1W4iAGRZ8dK">
       <div className="viewRent">
         <h1>Pay Rent</h1>
         <Elements>
           <CheckoutForm {...this.props}/>
         </Elements>
       </div>
     </StripeProvider>
   );
 }
}

export default requireTenant(ViewRent);
