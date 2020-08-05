import React from "react";
import blogs from "../data/blogs";

export default React.createContext({
  blogs: blogs,
  createBlog: blog => {},
  deleteBlog: blogId => {}
});
