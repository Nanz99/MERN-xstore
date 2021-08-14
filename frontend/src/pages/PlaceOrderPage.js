/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstant";
import LoadingBox from "./../components/LoadingBox";
import MessageBox from "./../components/MessageBox";

function PlaceOrderPage(props) {
  const dispatch = useDispatch();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 10 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order.order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <div className="container">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row ">
        <div className="col-sm-8">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName}
                  <br />
                  <strong>Address:</strong> {cart.shippingAddress.address}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method: </strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <div>
                  <ul>
                    {cart.cartItems.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="d-flex align-items-center justify-content-between"
                        >
                          <div>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-small"
                            />
                          </div>
                          <div className="min-30">
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div>
                            ${item.price} x {item.qty} = ${" "}
                            {Number(item.price) * Number(item.qty)}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-sm-4 mt-3">
          <div className="card card-body">
            <h4>Order Summary</h4>
            <div>
              <div className="d-flex justify-content-between">
                <p>Item</p>
                <p>${cart.itemsPrice}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Shipping Fee</p>
                <p>${cart.shippingPrice}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Tax</p>
                <p>${cart.taxPrice}</p>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <p>${cart.totalPrice}</p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="btn-warning p-0 w-100"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </div>
              {loading && <LoadingBox />}
              {error && <MessageBox>{error}</MessageBox>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderPage;
