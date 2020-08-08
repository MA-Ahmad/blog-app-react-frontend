import React, { useReducer } from "react";
import BlogContext from "./blog-context";
import { blogReducer, CREATE_BLOG, EDIT_BLOG, DELETE_BLOG } from "./reducers";
import blogs_data from "../data/blogs";

const GlobalState = props => {
  const blogs = blogs_data;
  const [blogState, dispatch] = useReducer(blogReducer, { blogs: blogs });

  const createBlog = blog => {
    dispatch({ type: CREATE_BLOG, blog: blog });
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
