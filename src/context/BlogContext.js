import React, { useReducer, useEffect, useState, createContext } from "react";
import { blogReducer, CREATE_BLOG, EDIT_BLOG, DELETE_BLOG } from "./reducers";
import axios from "axios";
import { useToast } from "@chakra-ui/core";
import { apiHost } from "../utils/Cons/Constants";
const BlogContext = createContext({
  blogs: [],
  blog: {},
  createBlog: blog => {},
  editBlog: blog => {},
  deleteBlog: blogId => {}
});

const BlogProvider = props => {
  const [blogState, dispatch] = useReducer(blogReducer, {
    blogs: []
  });
  const toast = useToast();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    const url = `${apiHost}/blogs`;
    fetch(url, {
      withCredentials: true
    })
      .then(response => response.json())
      .then(response => {
        dispatch({ type: "LOAD_BLOGS", blogs: response });
      })
      .catch(error => console.log(error));
    return true;
  };

  const fetchBlogsAsync = async () => {
    const url = `${apiHost}/blogs`;
    const response = await fetch(url, {
      withCredentials: true
    });
    const data = await response.json();

    if (response.status >= 400) {
      console.log(response.status);
    }
    return data;
  };

  const likeContent = async id => {
    const url = `${apiHost}/likes`;
    const formData = new FormData();
    formData.append("like[reference_type]", "Blog");
    formData.append("like[reference_id]", id);
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
    const data = await response.data;
    return data;
  };

  const bookmarkContent = async id => {
    const url = `${apiHost}/bookmarks`;
    const formData = new FormData();
    formData.append("bookmark[reference_type]", "Bookmark");
    formData.append("bookmark[reference_id]", id);
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
    const data = await response.data;
    return data;
  };

  const createBlog = (data, file, history) => {
    const url = `${apiHost}/blogs`;
    const formData = new FormData();
    if (file) {
      formData.append("blog[image_file]", file);
    }
    formData.append("blog[title]", data.title);
    formData.append("blog[content]", data.content.replace(/\n/g, "<br> <br>"));
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "application/json"
        },
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
    const url = `${apiHost}/blogs/${blog.id}`;
    const formData = new FormData();
    if (file) {
      formData.append("blog[image_file]", file);
    }
    formData.append("blog[title]", blog.title);
    formData.append("blog[content]", blog.content.replace(/\n/g, "<br> <br>"));
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
        dispatch({ type: EDIT_BLOG, blog: response.data });
        history.push("/");
        showToast("Blog post updated successfully", "success");
      })
      .catch(err => console.log(err));
  };

  const deleteBlog = blogId => {
    const url = `${apiHost}/blogs/${blogId}`;
    axios
      .delete(url, { withCredentials: true })
      .then(resp => {
        dispatch({ type: DELETE_BLOG, blogId: blogId });
        showToast("Blog deleted successfully", "success");
      })
      .catch(err => console.log(err));
  };

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
        fetchBlogsAsync: fetchBlogsAsync(),
        createBlog: createBlog,
        likeContent: likeContent,
        bookmarkContent: bookmarkContent,
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
