import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main";
import GlobalState from "./context/GlobalState";

function App() {
  return (
    <GlobalState>
      <Router>
        <Main />
      </Router>
    </GlobalState>
  );
}

export default App;
