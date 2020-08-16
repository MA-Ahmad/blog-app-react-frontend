import React from "react";

export default React.createContext({
  blogs: [],
  createBlog: blog => {},
  deleteBlog: blogId => {}
});
