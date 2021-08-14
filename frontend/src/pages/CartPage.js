/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "./../components/MessageBox";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function CartPage(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is emty ....
              <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ul>
              {cartItems.map((item) => {
                return (
                  <li key={item.product} className="row mt-2 mb-2">
                    <div className="col-sm-12 d-flex justify-content-between align-items-center">
                      <div>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-small"
                        />
                      </div>
                      <div className="min-30">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div>
                        <select
                          className="p-0"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(Number(item.countInStock)).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>${item.price}</div>
                      <div>
                        <button
                          type="button"
                          className="p-0 border-0"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <MdDelete className="btn-icons danger" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="col-sm-4 d-flex justify-content-right mt-5 ms-auto">
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                  Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
                  ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h2>
              </li>
              <li>
                <button
                  type="button"
                  onClick={checkoutHandler}
                  className="primary block"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
