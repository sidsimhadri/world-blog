import { createSlice } from "@reduxjs/toolkit";

import { findPostsThunk, deletePostThunk, createPostThunk, searchPostsThunk}  from "../services/thunks"


const initialState = {
  posts: [],
  loading: false
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: {
    [findPostsThunk.pending]:
    (state) => {
      state.loading = true
      state.posts = []
    },
    [findPostsThunk.fulfilled]:
    (state, { payload }) => {
      state.loading = false
      state.posts = payload
    },
    [findPostsThunk.rejected]:
    (state, action) => {
      state.loading = false
      state.posts = action.error
    },
    [deletePostThunk.fulfilled]:
    (state, { payload }) => {
      state.loading = false
      state.posts = state.reviews
      .filter(t => t._id !== payload)
    },
    [createPostThunk.fulfilled]:
    (state, { payload }) => {
      state.loading = false
      state.posts.push(payload)
    },
    [searchPostsThunk.pending]:
    (state) => {
      state.loading = true
      state.posts = []
    },
    [searchPostsThunk.fulfilled]:
    (state, { payload }) => {
      state.loading = false
      state.posts = payload
    },
    [searchPostsThunk.rejected]:
    (state, action) => {
      state.loading = false
      state.posts = action.error
    },
  },
  reducers: {}
});

export default postSlice.reducer;