import React, { useState, useReducer } from "react";
import BlogContext from "./blog-context";
import { blogReducer, CREATE_BLOG, DELETE_BLOG } from "./reducers";
import blogs_data from "../data/blogs";

const GlobalState = props => {
  const blogs = blogs_data;
  const [blogState, dispatch] = useReducer(blogReducer, { blogs: blogs });
  // const [editBlog, setEditBlog] = useState(null);

  const createBlog = blog => {
    setTimeout(() => {
      dispatch({ type: CREATE_BLOG, blog: blog });
    }, 700);
  };

  return (
    <BlogContext.Provider
      value={{
        blogs: blogState.blogs,
        createBlog: createBlog
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export default GlobalState;
