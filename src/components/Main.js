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
        <Route path="/home" component={Home} />
        <Route exact path="/new" component={BlogForm} />
        <Redirect to="/home" />
      </Switch>
    </React.Fragment>
  );
};

export default Main;
