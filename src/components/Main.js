import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../shared/Header";
import BlogForm from "./BlogForm";
import Home from "./Home";

const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/new"
          render={props => {
            return <BlogForm {...props} editMode={false} />;
          }}
        />
        <Route
          exact
          path="/edit/:id"
          render={props => {
            return <BlogForm {...props} editMode={true} />;
          }}
        />
        <Redirect to="/" />
      </Switch>
    </React.Fragment>
  );
};

export default Main;
