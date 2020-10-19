import React, { useEffect, useState, createContext } from "react";
import Authenticate from "../utils/Auth/Authenticate";
import axios from "axios";
import { useToast } from "@chakra-ui/core";
import { apiHost } from "../utils/Cons/Constants";

const AuthContext = createContext();

const AuthProvider = props => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const toast = useToast();

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = () => {
    Authenticate(apiHost)
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
    const url = `${apiHost}/users/${user.id}`;
    const formData = new FormData();
    if (file) {
      formData.append("user[image_file]", file);
    }
    formData.append("user[name]", user.name);
    formData.append("user[email]", user.email);
    formData.append("user[username]", user.username);
    formData.append("user[location]", user.location);
    formData.append("user[summary]", user.summary);
    formData.append("user[education]", user.education);
    formData.append("user[emp_name]", user.emp_name);
    formData.append("user[emp_title]", user.emp_title);
    formData.append("user[skills]", user.skills);

    axios
      .put(url, formData, {
        headers: {
          "Content-Type": "application/json"
        },
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
        `${apiHost}/registrations`,
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
      .delete(`${apiHost}/sessions/logout`, { withCredentials: true })
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
      .post(`${apiHost}/sessions`, { user: user }, { withCredentials: true })
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
