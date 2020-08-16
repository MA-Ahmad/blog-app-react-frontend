import React from "react";

export default React.createContext({
  blogs: [],
  createBlog: blog => {},
  editBlog: blog => {},
  deleteBlog: blogId => {}
});
