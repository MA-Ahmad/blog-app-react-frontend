import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../shared/Header";
import BlogForm from "./BlogForm";
import Home from "./Home";
import AuthForm from "./Auth/AuthForm";
import Blog from "./Blog";
import UnprotectedRoute from "../UnprotectedRoute";
import ProtectedRoute from "../ProtectedRoute";
import Profile from "./Profile";

const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/blogs/:id"
          render={props => {
            return <Blog {...props} />;
          }}
        />

        <ProtectedRoute
          path="/profile"
          component={props => <Profile {...props} />}
        />
        <ProtectedRoute
          path="/new"
          component={props => <BlogForm {...props} editMode={false} />}
        />
        <ProtectedRoute
          path="/edit/:id"
          component={props => <BlogForm {...props} editMode={true} />}
        />
        <UnprotectedRoute
          path="/register"
          component={props => <AuthForm {...props} formType={"signup"} />}
        />
        <UnprotectedRoute
          path="/login"
          component={props => <AuthForm {...props} formType={"login"} />}
        />
        <Redirect to="/" />
      </Switch>
    </React.Fragment>
  );
};

export default Main;
