import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogSlice = createSlice({
  name: "Blogs",
  initialState,
  reducers: {
    appedBlog(state, action) {
      console.log("appendBlog...");
      state.push(action.payload);
    },
    setBlog(state, action) {
      return action.payload;
    },
  },
});

export const { appedBlog, setBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlog(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    console.log("meni stateenkin?");
    dispatch(appedBlog(newBlog));
  };
};

export default blogSlice.reducer;
