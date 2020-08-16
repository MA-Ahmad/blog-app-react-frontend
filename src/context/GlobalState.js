import React, { useReducer, useEffect } from "react";
import BlogContext from "./blog-context";
import { blogReducer, CREATE_BLOG, EDIT_BLOG, DELETE_BLOG } from "./reducers";

const GlobalState = props => {
  // const baseUrl = "http://localhost:3001/api/v1";
  const baseUrl = "https://blog-backend-rails.herokuapp.com/api/v1";
  const [blogState, dispatch] = useReducer(blogReducer, { blogs: [] });

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
