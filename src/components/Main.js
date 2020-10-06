import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../shared/Header";
import BlogForm from "./BlogForm";
import Home from "./Home";
import Register from "./Auth/Register";
import AuthForm from "./Auth/AuthForm";
import BlogContext from "../context/blog-context";

const Main = () => {
  const context = useContext(BlogContext);

  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        {context.isAuth ? (
          <>
            {" "}
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
          </>
        ) : (
          ""
        )}

        <Route
          exact
          path="/register"
          render={props => {
            return <AuthForm {...props} formType={"signup"} />;
          }}
        />
        <Route
          exact
          path="/login"
          render={props => {
            return <AuthForm {...props} formType={"login"} />;
          }}
        />
        <Redirect to="/" />
      </Switch>
    </React.Fragment>
  );
};

export default Main;
