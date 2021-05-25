import React from 'react'
import {PayPalButton} from 'react-paypal-button-v2'

function Paypal(props) {

    const {total,onSuccess}=props;
 
    return (
        <PayPalButton 
        amount={total} 
        onSuccess={(details, data) =>onSuccess(details,data)}
        options={{
          clientId: "ARYtl1vDrHf8aAfTkXNczdgohogwSxZtTg0JuA7Kik-KHH45JhQ-2VlmB6L3xJP2S4fJ3AajTTDw2WbN"
        }}
      />
    )
}

export default Paypal
