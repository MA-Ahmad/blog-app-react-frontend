export const CREATE_BLOG = "CREATE_BLOG";
export const EDIT_BLOG = "EDIT_BLOG";
export const DELETE_BLOG = "DELETE_BLOG";

const createBlog = (blog, state) => {
  const state_blogs = [...state.blogs];
  state_blogs.push({ ...blog, id: state_blogs.length + 1 });
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

export const blogReducer = (state, action) => {
  switch (action.type) {
    case CREATE_BLOG:
      return createBlog(action.blog, state);
    case EDIT_BLOG:
      return editBlog(action.blog, state);
    // case REMOVE_USER:
    // return removeUser(action.userId, state);
    default:
      return state;
  }
};
