import React, { useReducer, useEffect, useState, createContext } from "react";
import { blogReducer, CREATE_BLOG, EDIT_BLOG, DELETE_BLOG } from "./reducers";
import axios from "axios";
import { useToast } from "@chakra-ui/core";

const BlogContext = createContext({
  blogs: [],
  blog: {},
  createBlog: blog => {},
  editBlog: blog => {},
  deleteBlog: blogId => {}
});

const BlogProvider = props => {
  const baseUrl = "http://localhost:3001/api/v1";
  // const baseUrl = "https://blog-backend-rails.herokuapp.com/api/v1";
  const [blogState, dispatch] = useReducer(blogReducer, {
    blogs: []
  });
  const toast = useToast();

  useEffect(() => {
    console.log("blogssss");
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    const url = `${baseUrl}/blogs`;
    fetch(url, {
      withCredentials: true
    })
      .then(response => response.json())
      .then(response => {
        dispatch({ type: "LOAD_BLOGS", blogs: response });
      })
      .catch(error => console.log(error));
  };

  const createBlog = (blog, file, history) => {
    const url = `${baseUrl}/blogs`;
    const data = {
      title: blog.title,
      authorName: blog.authorName,
      content: blog.content.replace(/\n/g, "<br> <br>")
    };
    const formData = new FormData();
    if (file) {
      formData.append("image", file, file.name);
    }
    formData.append("blog", JSON.stringify(data));
    // {
    //   blog: data
    // }
    axios
      .post(url, formData, {
        withCredentials: true,
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded / progressEvent.total);
        }
      })
      .then(response => {
        dispatch({ type: CREATE_BLOG, blog: response.data });
        history.push("/");
        showToast("You've successfully created a blog post.", "success");
      })
      .catch(err => console.log(err));
  };

  const editBlog = (blog, file, history) => {
    const url = `${baseUrl}/blogs/${blog.id}`;
    const data = {
      title: blog.title,
      authorName: blog.authorName,
      content: blog.content.replace(/\n/g, "<br> <br>")
    };
    const formData = new FormData();
    if (file) {
      formData.append("image", file, file.name);
    }
    formData.append("blog", JSON.stringify(data));
    // {
    //   blog: data
    // }
    axios
      .put(url, formData, {
        withCredentials: true,
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded / progressEvent.total);
        }
      })
      .then(response => {
        dispatch({ type: EDIT_BLOG, blog: response.data });
        history.push("/");
        showToast("Blog post updated successfully", "success");
      })
      .catch(err => console.log(err));
  };

  const deleteBlog = blogId => {
    const url = `${baseUrl}/blogs/${blogId}`;
    axios
      .delete(url, { withCredentials: true })
      .then(resp => {
        dispatch({ type: DELETE_BLOG, blogId: blogId });
        showToast("Blog deleted successfully", "success");
      })
      .catch(err => console.log(err));
  };

  // const requestDelete = blogId => {
  //   const url = `${baseUrl}/blogs/destroy/${blogId}`;
  //   axios
  //     .delete(url, { withCredentials: true })
  //     .then(resp => {
  //       dispatch({ type: DELETE_BLOG, blogId: blogId });
  //       showToast("Blog deleted successfully", "success");
  //     })
  //     .catch(err => console.log(err));
  // };

  const showToast = (message, status) => {
    toast({
      position: "bottom",
      title: "Notification",
      description: message,
      status: status,
      duration: 2000,
      isClosable: true
    });
  };

  return (
    <BlogContext.Provider
      value={{
        blogs: blogState.blogs,
        fetchBlogs: fetchBlogs,
        createBlog: createBlog,
        editBlog: editBlog,
        deleteBlog: deleteBlog
      }}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

const BlogConsumer = BlogContext.Consumer;
export { BlogProvider, BlogConsumer, BlogContext };

// export default BlogProvider;
