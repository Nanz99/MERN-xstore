/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, listOrders } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELETE_RESET } from "../constants/orderConstant";

function OrderListPage(props) {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.orderList);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.orderDelete);

  useEffect(() => {
    dispatch(listOrders());
    dispatch({ type: ORDER_DELETE_RESET });
  }, [dispatch, successDelete]);

  const deleteOrderHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };
  return (
    <div className="container">
      <h1>Orders: {orders && orders.length}</h1>

      {loadingDelete && <LoadingBox />}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Deliverd</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>{order.createdAt}</td>
                    <td>$ {order.totalPrice}</td>
                    <td>
                      {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                    </td>
                    <td>
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : "No"}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-success p-1"
                        onClick={() => {
                          props.history.push(`/order/${order._id}`);
                        }}
                      >
                        Details
                      </button>
                      
                      <button
                        type="button"
                        className="btn btn-success p-1"
                        onClick={() => deleteOrderHandler(order)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderListPage;
