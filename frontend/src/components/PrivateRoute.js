/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
function PrivateRoute({ component: Component, ...rest }) {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}
export default PrivateRoute;
