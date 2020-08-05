import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Box } from "@chakra-ui/core";
import Header from "../shared/Header";
import Form from "./Form";
import Home from "./Home";

const Main = () => {
  return (
    <React.Fragment>
      <Header />
      <Box width="100vw" minHeight={"100vh"} bg="gray.100">
        <Switch>
          <Route path="/home" component={Home} />
          <Route exact path="/new" component={Form} />
          <Redirect to="/home" />
        </Switch>
      </Box>
    </React.Fragment>
  );
};

export default Main;
