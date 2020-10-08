// based off this code sand box: https://codesandbox.io/s/p71pr7jn50

import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

// Redirect users away from these routes if they are already logged in
const UnprotectedRoute = ({ component: Component, ...rest }) => {
  const context = useContext(AuthContext);
  return (
    <Route
      render={props =>
        !context.isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
      {...rest}
    />
  );
};

export default UnprotectedRoute;
