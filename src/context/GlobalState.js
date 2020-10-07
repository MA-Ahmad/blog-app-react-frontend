import React, { useReducer, useEffect, useState } from "react";
import BlogContext from "./blog-context";
import { blogReducer, CREATE_BLOG, EDIT_BLOG, DELETE_BLOG } from "./reducers";
import Authenticate from "../utils/Auth/Authenticate";
import axios from "axios";
import { useToast } from "@chakra-ui/core";
const GlobalState = props => {
  const baseUrl = "http://localhost:3001/api/v1";
  // const baseUrl = "https://blog-backend-rails.herokuapp.com/api/v1";
  const [blogState, dispatch] = useReducer(blogReducer, {
    blogs: []
  });
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const toast = useToast();

  useEffect(() => {
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
  }, [user !== {}]);

  const createBlog = blog => {
    const url = `${baseUrl}/blogs/create`;
    const data = {
      title: blog.title,
      authorName: blog.authorName,
      user_id: user.id,
      content: blog.content.replace(/\n/g, "<br> <br>")
    };
    axios
      .post(
        url,
        {
          blog: data
        },
        { withCredentials: true }
      )
      .then(response => {
        dispatch({ type: CREATE_BLOG, blog: response.data });
      })
      .catch(err => console.log(err));
    // requestCreateUpdate(url, body, CREATE_BLOG);
  };

  const editBlog = blog => {
    const url = `${baseUrl}/blogs/update/${blog.id};`;
    const data = {
      title: blog.title,
      authorName: blog.authorName,
      content: blog.content.replace(/\n/g, "<br> <br>")
    };
    axios
      .put(
        url,
        {
          blog: data
        },
        { withCredentials: true }
      )
      .then(response => {
        dispatch({ type: EDIT_BLOG, blog: response.data });
      })
      .catch(err => console.log(err));
    // requestCreateUpdate(url, body, EDIT_BLOG);
  };

  const deleteBlog = blogId => {
    requestDelete(blogId);
  };

  const requestCreateUpdate = (url, data, type) => {
    if (type === EDIT_BLOG) {
      axios
        .put(
          url,
          {
            blog: data
          },
          { withCredentials: true }
        )
        .then(response => {
          dispatch({ type: type, blog: response.data });
        })
        .catch(err => console.log(err));
    } else {
      axios
        .post(
          url,
          {
            blog: data
          },
          { withCredentials: true }
        )
        .then(response => {
          dispatch({ type: type, blog: response.data });
        })
        .catch(err => console.log(err));
    }
  };

  const requestDelete = blogId => {
    const url = `${baseUrl}/blogs/destroy/${blogId}`;
    axios
      .delete(url, { withCredentials: true })
      .then(resp => {
        dispatch({ type: DELETE_BLOG, blogId: blogId });
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
        // toast({
        //   position: "bottom",
        //   email: "Notification",
        //   description: message,
        //   status: error ? "error" : "success",
        //   duration: 2000,
        //   isClosable: true
        // });
        showToast(message, error);
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
        showToast("Logged out successfully");
        history.push("/");
        // window.location.href = "/";
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
        let message = "",
          error = false;
        if (response.data.logged_in) {
          setIsAuth(true);
          setUser(response.data.user);
          history.push("/");
          // window.location.href = "/";
          message = "Logged in successfully";
          error = false;
        } else {
          message = "Credentials are wrong";
          error = true;
        }
        showToast(message, error);
      })
      .catch(error => {
        console.log("login error", error);
      });
  };

  const showToast = (message, error = false) => {
    toast({
      position: "bottom",
      email: "Notification",
      description: message,
      status: error ? "error" : "success",
      duration: 2000,
      isClosable: true
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
