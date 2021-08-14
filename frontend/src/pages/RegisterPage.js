/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "./../components/LoadingBox";
import MessageBox from "./../components/MessageBox";
import { register } from "../actions/userActions";

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comformpassword, setComformPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const { userInfo, loading, error } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== comformpassword) {
      alert("PassWord invalid !!!");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <div className="login-page">
      <div className="form">
        <h2>Register</h2>
        {loading && <LoadingBox />}
        {error && <MessageBox>{error}</MessageBox>}
        <form className="register-form" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Comform password"
            onChange={(e) => setComformPassword(e.target.value)}
          />

          <button type="submit">Register</button>
          <p className="message">
            Already registered? <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
