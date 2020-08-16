export const LOAD_BLOGS = "LOAD_BLOGS";
export const CREATE_BLOG = "CREATE_BLOG";
export const EDIT_BLOG = "EDIT_BLOG";
export const DELETE_BLOG = "DELETE_BLOG";

const loadBlogs = blogs => {
  const state = { blogs: blogs };
  return { state, blogs: blogs };
};

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

const deleteBlog = (blogId, state) => {
  const state_blogs = [...state.blogs];
  return { ...state, blogs: state_blogs.filter(blog => blog.id !== blogId) };
};

export const blogReducer = (state, action) => {
  switch (action.type) {
    case LOAD_BLOGS:
      return loadBlogs(action.blogs);
    case CREATE_BLOG:
      return createBlog(action.blog, state);
    case EDIT_BLOG:
      return editBlog(action.blog, state);
    case DELETE_BLOG:
      return deleteBlog(action.blogId, state);
    default:
      return state;
  }
};
