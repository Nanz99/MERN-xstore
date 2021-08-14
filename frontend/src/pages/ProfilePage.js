/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstant";

function ProfilePage() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const { userInfo } = useSelector((state) => state.userSignin);
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.userUpdateProfile);
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== conformPassword) {
      alert("PassWord and Conform Password invalid");
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };
  return (
    <div className="container">
      <h1>Profile User</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <>
          {loadingUpdate && <LoadingBox />}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
          {successUpdate && (
            <MessageBox variant="success">
              Profile Updated Successful
            </MessageBox>
          )}
          
          <div className="form p-5">
            <form className="register-form" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Cormform New Password"
                value={conformPassword}
                onChange={(e) => setConformPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-light">
                Update
              </button>
            </form>
          </div>
          
        </>
      )}
    </div>
  );
}

export default ProfilePage;
