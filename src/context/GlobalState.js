import React, { useReducer, useEffect, useState } from "react";
import BlogContext from "./blog-context";
import { blogReducer, CREATE_BLOG, EDIT_BLOG, DELETE_BLOG } from "./reducers";
import Authenticate from "../utils/Auth/Authenticate";
import axios from "axios";
import { useToast } from "@chakra-ui/core";
const GlobalState = props => {
  const baseUrl = "http://localhost:3001/api/v1";
  // const baseUrl = "https://blog-backend-rails.herokuapp.com/api/v1";
  const [blogState, dispatch] = useReducer(blogReducer, { blogs: [] });
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const toast = useToast();

  useEffect(() => {
    Authenticate(baseUrl)
      .then(response => {
        if (response.isAuth) {
          setIsAuth(response.isAuth);
          setUser(response.user);
        } else {
          setIsAuth(false);
        }
        console.log(response);
      })
      .catch(err => console.log(err));

    const url = `${baseUrl}/blogs`;
    fetch(url, {
      withCredentials: true
    })
      .then(response => response.json())
      .then(response => {
        dispatch({ type: "LOAD_BLOGS", blogs: response });
      })
      .catch(error => console.log(error));
  }, []);

  const createBlog = blog => {
    const body = {
      title: blog.title,
      authorName: blog.authorName,
      content: blog.content.replace(/\n/g, "<br> <br>")
    };
    const url = `${baseUrl}/blogs/create`;
    requestCreateUpdate(url, body, CREATE_BLOG);
  };

  const editBlog = blog => {
    const url = `${baseUrl}/blogs/update/${blog.id};`;
    const body = {
      title: blog.title,
      authorName: blog.authorName,
      content: blog.content.replace(/\n/g, "<br> <br>")
    };
    requestCreateUpdate(url, body, EDIT_BLOG);
  };

  const deleteBlog = blogId => {
    requestDelete(blogId);
  };

  const requestCreateUpdate = (url, data, type) => {
    fetch(url, {
      method: type === EDIT_BLOG ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        dispatch({ type: type, blog: response });
      })
      .catch(error => console.log(error.message));
  };

  const requestDelete = blogId => {
    const url = `${baseUrl}/blogs/destroy/${blogId}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        dispatch({ type: DELETE_BLOG, blogId: blogId });
      })
      .catch(error => console.log(error.message));
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
          error = false;
        if (response.data.logged_in) {
          setIsAuth(true);
          history.push("/");
          message = "Sign up successfully";
          error = false;
        } else {
          message = "Email " + response.data.message["email"][0];
          error = true;
        }
        toast({
          position: "bottom",
          email: "Notification",
          description: message,
          status: error ? "error" : "success",
          duration: 2000,
          isClosable: true
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  const logout = e => {
    axios
      .delete(`${baseUrl}/sessions/logout`, { withCredentials: true })
      .then(resp => {
        setIsAuth(false);
        window.location.href = "/";
      })
      .catch(err => console.log(err));
  };

  const loginUser = (user, history) => {
    axios
      .post(
        `${baseUrl}/sessions`,
        {
          user: user
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log(response);
        let message = "",
          error = false;
        if (response.data.logged_in) {
          setIsAuth(true);
          history.push("/");
          message = "Logged in successfully";
          error = false;
        } else {
          message = "Credentials are wrong";
          error = true;
        }
        toast({
          position: "bottom",
          email: "Notification",
          description: message,
          status: error ? "error" : "success",
          duration: 2000,
          isClosable: true
        });
      })
      .catch(error => {
        console.log("login error", error);
      });
  };

  return (
    <BlogContext.Provider
      value={{
        blogs: blogState.blogs,
        createBlog: createBlog,
        editBlog: editBlog,
        deleteBlog: deleteBlog,
        registerUser: registerUser,
        loginUser: loginUser,
        logout: logout,
        isAuth: isAuth,
        user: user
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default GlobalState;
