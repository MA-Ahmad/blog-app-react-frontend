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
    Authenticate(baseUrl)
      .then(response => {
        if (response.isAuth) {
          setIsAuth(response.isAuth);
          setUser(response.user);
        } else {
          setIsAuth(false);
        }
      })
      .catch(err => console.log(err));
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
        // history.push("/");
        window.location.href = "/";
      })
      .catch(err => console.log(err));
  };

  const loginUser = (user, history) => {
    axios
      .post(`${baseUrl}/sessions`, { user: user }, { withCredentials: true })
      .then(response => {
        let message = "",
          status = "";
        if (response.data.logged_in) {
          setIsAuth(true);
          setUser(response.data.user);
          history.push("/");
          // window.location.href = "/";
          message = "Logged in successfully";
          status = "success";
        } else {
          message = "Credentials are wrong";
          status = "error";
        }
        showToast(message, status);
      })
      .catch(error => {
        console.log("login error", error);
      });
  };

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
