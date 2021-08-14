/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";

function SigninPage(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  const { userInfo } = useSelector((state) => state.userSignin);
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : '/';
    
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  
  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">login</button>
          <p className="message">
            Not registered? <Link to={`/register?redirect=${redirect}`}>Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SigninPage;
