import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main";
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext";

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <Main />
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;
