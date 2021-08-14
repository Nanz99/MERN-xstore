/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function OrderHistoryPage(props) {
  const { loading, error, orders } = useSelector(
    (state) => state.orderMineList
  );
  const dispatch =useDispatch()
  useEffect(()=>{
     dispatch(listOrderMine())
  },[dispatch])
  return (
    <div className="container">
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Deliverd</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { orders && orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>$ {order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                     <button type="button" className="btn btn-success p-1" onClick={()=>{
                        props.history.push(`/order/${order._id}`)
                     }}>
                        Details
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

export default OrderHistoryPage;
