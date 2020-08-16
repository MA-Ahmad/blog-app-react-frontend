export const CREATE_BLOG = "CREATE_BLOG";
export const EDIT_BLOG = "EDIT_BLOG";
export const DELETE_BLOG = "DELETE_BLOG";
export const LOAD_BLOG = "LOAD_BLOG";

const createBlog = (blog, state) => {
  const state_blogs = [...state.blogs];
  state_blogs.unshift({ ...blog });
  return { ...state, blogs: state_blogs };
};

const editBlog = (blog, state) => {
  const state_blogs = [...state.blogs];
  const blogIndex = getBlogIndex(state, blog.id);
  state_blogs[blogIndex] = blog;
  return { ...state, blogs: state_blogs };
};

const getBlogIndex = (state, blogId) => {
  return state.blogs.findIndex(blog => blog.id === blogId);
};

// const deleteBlog = (blogId, state) => {
//   const state_blogs = [...state.blogs];
//   return { ...state, blogs: state_blogs.filter(blog => blog.id !== blogId) };
// };

const loadBlog = (blogs, empty_state) => {
  const state = { blogs: blogs };
  return { state, blogs: blogs };
};

export const blogReducer = (state, action) => {
  switch (action.type) {
    case LOAD_BLOG:
      return loadBlog(action.blogs, state);
    case CREATE_BLOG:
      return createBlog(action.blog, state);
    case EDIT_BLOG:
      return editBlog(action.blog, state);
    // case DELETE_BLOG:
    //   return deleteBlog(action.blogId, state);
    default:
      return state;
  }
};
