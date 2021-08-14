/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentMethodPage(props) {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);

  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <div className="payment-container">
      <CheckoutSteps step1 step2 step3 />
      <form className="form w-30r t-left" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              name="paymentMethod"
              id="payment"
              value="PayPal"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="payment">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              name="paymentMethod"
              id="stripe"
              value="Stripe"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <button type="submit" className="primary">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethodPage;
