import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main";
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";

const breakpoints = ["910px", "1050px", "1100px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const customTheme = {
  ...theme,
  breakpoints

  // colors: {
  //   ...theme.colors,
  //   brand: {
  //     900: "#1a365d",
  //     800: "#153e75",
  //     700: "#2a69ac"
  //   }
  // }
};

const config = theme => ({
  light: {
    color: theme.colors.gray[700],
    bg: theme.colors.gray[100],
    borderColor: theme.colors.gray[200],
    placeholderColor: theme.colors.gray[500]
  },
  dark: {
    color: theme.colors.whiteAlpha[900],
    bg: theme.colors.gray[800],
    borderColor: theme.colors.whiteAlpha[300],
    placeholderColor: theme.colors.whiteAlpha[400]
  }
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset config={config} />
      <AuthProvider>
        <BlogProvider>
          <Router>
            <Main />
          </Router>
        </BlogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
