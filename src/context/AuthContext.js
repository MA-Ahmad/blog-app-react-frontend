import React, { useEffect, useState, createContext } from "react";
import Authenticate from "../utils/Auth/Authenticate";
import axios from "axios";
import { useToast } from "@chakra-ui/core";

const AuthContext = createContext();

const AuthProvider = props => {
  // const baseUrl = "http://localhost:3001/api/v1";
  const baseUrl = "https://blog-backend-rails.herokuapp.com/api/v1";

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const toast = useToast();

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = () => {
    // Authenticate(baseUrl)
    //   .then(response => {
    //     if (response.isAuth) {
    //       setIsAuth(response.isAuth);
    //       setUser(response.user);
    //     } else {
    //       setIsAuth(false);
    //     }
    //     console.log(response);
    //   })
    //   .catch(err => console.log(err));

    fetch(`${baseUrl}/sessions/logged_in`, { credentials: "include" })
      .then(response => response.json())
      .then(response => {
        console.log(response);

        if (response.logged_in) {
          setIsAuth(response.logged_in);
          setUser(response.user);
        } else {
          setIsAuth(false);
        }
      });
  };

  const updateUser = (user, file, history) => {
    const url = `${baseUrl}/users/${user.id}`;
    const formData = new FormData();
    if (file) {
      formData.append("image", file, file.name);
    }
    const data = {
      name: user.name,
      image_url: user.image_url
    };
    formData.append("user", JSON.stringify(data));
    axios
      .put(url, formData, {
        withCredentials: true,
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded / progressEvent.total);
        }
      })
      .then(response => {
        setUser(response.data);
        history.push("/");
        showToast("Profile updated successfully", "success");
      })
      .catch(err => console.log(err));
  };
  const registerUser = (user, history) => {
    axios
      .post(
        `${baseUrl}/registrations`,
        {
          user: user
        },
        { withCredentials: true }
      )
      .then(response => {
        let message = "",
          status = "";
        if (response.data.logged_in) {
          setIsAuth(true);
          history.push("/");
          message = "Sign up successfully";
          status = "success";
        } else {
          message = "Email " + response.data.message["email"][0];
          status = "error";
        }
        showToast(message, status);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  const logout = history => {
    axios
      .delete(`${baseUrl}/sessions/logout`, { withCredentials: true })
      .then(resp => {
        setIsAuth(false);
        setUser({});
        showToast("Logged out successfully", "success");
        history.push("/");
      })
      .catch(err => console.log(err));
  };

  // const loginUser = (user, history) => {
  //   axios
  //     .post(
  //       `${baseUrl}/sessions`,
  //       {
  //         user: user
  //       },
  //       { withCredentials: true }
  //     )
  //     .then(response => {
  //       let message = "",
  //         status = "";
  //       if (response.data.logged_in) {
  //         setIsAuth(true);
  //         setUser(response.data.user);
  //         history.push("/");
  //         // window.location.href = "/";
  //         message = "Logged in successfully";
  //         status = "success";
  //       } else {
  //         message = "Credentials are wrong";
  //         status = "error";
  //       }
  //       showToast(message, status);
  //     })
  //     .catch(error => {
  //       console.log("login error", error);
  //     });
  // };

  const loginUser = (user, history) => {
    postData({ user: user }).then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
      let message = "",
        status = "";
      if (data.logged_in) {
        setIsAuth(true);
        setUser(data.user);
        history.push("/");
        // window.location.href = "/";
        message = "Logged in successfully";
        status = "success";
      } else {
        message = "Credentials are wrong";
        status = "error";
      }
      showToast(message, status);
    });
  };

  // Example POST method implementation:
  async function postData(data = {}) {
    // Default options are marked with *
    const response = await fetch(`${baseUrl}/sessions`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const showToast = (message, status) => {
    toast({
      position: "bottom",
      email: "Notification",
      description: message,
      status: status,
      duration: 2000,
      isClosable: true
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        user: user,
        authenticateUser: authenticateUser,
        updateUser: updateUser,
        registerUser: registerUser,
        loginUser: loginUser,
        logout: logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };

// export default AuthProvider;
