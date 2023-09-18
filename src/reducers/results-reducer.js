import { createSlice } from "@reduxjs/toolkit";

import {searchPostsThunk}  from "../services/thunks"


const initialState = {
  posts: [],
  loading: false
}

const resultSlice = createSlice({
  name: 'results',
  initialState,
  extraReducers: {
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

export default resultSlice.reducer;