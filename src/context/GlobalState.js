import React, { useReducer, useEffect, useCallback, useState } from "react";
import BlogContext from "./blog-context";
import { blogReducer, CREATE_BLOG, EDIT_BLOG, DELETE_BLOG } from "./reducers";

const GlobalState = props => {
  const [blogs, setBlogs] = useState([]);
  const [blogState, dispatch] = useReducer(blogReducer, { blogs: [] });

  useEffect(() => {
    const url = "http://localhost:3001/api/v1/blogs";
    fetch(url, {
      withCredentials: true
    })
      .then(response => response.json())
      .then(response => {
        dispatch({ type: "LOAD_BLOG", blogs: response });
      })
      .catch(error => console.log(error));
  }, []);

  // const fetchData = () => {
  //   const url = "http://localhost:3001/api/v1/blogs";
  //   fetch(url, {
  //     withCredentials: true
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       // return response;
  //       // console.log(response);
  //       // dispatch({ type: "LOAD_BLOG", blog: response });
  //       setBlogs(response);
  //     })
  //     .catch(error => console.log(error));
  //   return blogs;
  // };

  // const onReloadNeeded = useCallback(async () => {
  //   const profileData = await fetchData();
  //   console.log(profileData);
  //   // profileR({
  //   //   type: "profileReady",
  //   //   payload: profileData
  //   // });
  //   dispatch({ type: "LOAD_BLOG", blog: profileData });
  // }, []); // The empty array causes this callback to only be created once per component instance

  // useEffect(() => {
  //   onReloadNeeded();
  // }, []);
  const makeRequest = (url, data, type) => {
    fetch(url, {
      method: "POST",
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

  const createBlog = blog => {
    const body = {
      title: blog.title,
      authorName: blog.authorName,
      content: blog.content.replace(/\n/g, "<br> <br>")
    };
    const url = "http://localhost:3001/api/v1/blogs/create";
    makeRequest(url, body, CREATE_BLOG);
  };

  const editBlog = blog => {
    dispatch({ type: EDIT_BLOG, blog: blog });
  };

  const deleteBlog = blogId => {
    dispatch({ type: DELETE_BLOG, blogId: blogId });
  };

  return (
    <BlogContext.Provider
      value={{
        blogs: blogState.blogs,
        createBlog: createBlog,
        editBlog: editBlog,
        deleteBlog: deleteBlog
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default GlobalState;
