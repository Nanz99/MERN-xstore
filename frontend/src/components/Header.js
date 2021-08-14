/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../actions/userActions";
import { useDispatch } from 'react-redux';

function Header(props) {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart);
  const {userInfo} = useSelector(state=> state.userSignin || state.userRegister)
 
  return (
    <header className="header-container">
      <div>
        <Link className="brand" to="/">
          <span style={{ color: "#eb34a4" }}>✘</span>Store
        </Link>
      </div>
      <div>
        <Link to="/cart">Cart ({cartItems.length})</Link>
        {
          userInfo ? (
           <div className="dropdown">
              Hi, <Link to="#">{userInfo.name} <i className="fa fa-caret-down">
                </i></Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <button className=" btn btn-primary p-1 " onClick={()=>dispatch(signout())}>Sign Out</button>
                  </li>
                </ul>
           </div>
          )
          :
          (<Link to="/signin">Sign In</Link>)
        }
        {
          userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <Link to="#admin"> Admin {" "} <i className="fa fa-caret-down"></i></Link>
              <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/userlist">User List</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Product List</Link>
                  </li> 
                  <li>
                    <Link to="/orderlist">Orders List</Link>
                  </li>
                 
                </ul>
            </div>
          )
        }
      </div>
    </header>
  );
}

export default Header;
