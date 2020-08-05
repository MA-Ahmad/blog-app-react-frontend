export const CREATE_BLOG = "CREATE_BLOG";
export const DELETE_BLOG = "DELETE_BLOG";

const createBlog = (blog, state) => {
  const updatedBlogs = [...state.blogs];
  const updatedBlogIndex = updatedBlogs.findIndex(
    updatedBlog => updatedBlog.id === blog.id
  );

  if (updatedBlogIndex < 0) {
    updatedBlogs.push({ ...blog, id: updatedBlogs.length + 1 });
  } else {
    const updatedBlog = {
      ...updatedBlogs[updatedBlogIndex]
    };
    updatedBlogs[updatedBlogIndex] = blog;
  }
  console.log(updatedBlogs);
  console.log(state);

  return { ...state, blogs: updatedBlogs };
};

export const blogReducer = (state, action) => {
  // console.log("state");
  // console.log(state);
  switch (action.type) {
    case CREATE_BLOG:
      return createBlog(action.blog, state);
    // case REMOVE_USER:
    // return removeUser(action.userId, state);
    default:
      return state;
  }
};
