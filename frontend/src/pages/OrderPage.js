/** @format */

import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "./../components/LoadingBox";
import MessageBox from "./../components/MessageBox";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstant";

export default function OrderPage(props) {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const orderId = props.match.params.id;
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { error: errorPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );
  const { userInfo } = useSelector((state) => state.userSignin);

  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = useSelector((state) => state.orderDeliver);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, order, sdkReady, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox>{error}</MessageBox>
  ) : (
    <div className="container">
      <div className="row ">
        <h1>Order {order._id}</h1>
        <div className="col-sm-8">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName}
                  <br />
                  <strong>Address:</strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method: </strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <div>
                  <ul>
                    {order.orderItems.map((item, index) => {
                      return (
                        <div
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
                        </div>
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
                <p>${order.itemsPrice.toFixed(2)}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Shipping Fee</p>
                <p>${order.shippingPrice.toFixed(2)}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Tax</p>
                <p>${order.taxPrice}</p>
              </div>
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <p>${order.totalPrice.toFixed(2)}</p>
              </div>
              {!order.isPaid && (
                <div>
                  {!sdkReady ? (
                    <LoadingBox />
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {/* {loadingPay && <LoadingBox /> } */}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </div>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Deliver Order
                  </button>
                </li>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
