import { createAsyncThunk } from "@reduxjs/toolkit"
import * as service from "./service"

export const findPostsThunk = createAsyncThunk(
  'post/findPost', async (pid) => {
    return await service.findPost(pid)
  }
)
export const createPostThunk = createAsyncThunk(
  'post/createPost', async (post) => {
    return await service.createPost(post)
  }
)
export const deletePostThunk = createAsyncThunk(
  'post/deletePost', async (pid) => {
    return await service.deletePost(pid)
  }
)

export const searchPostsThunk = createAsyncThunk(
  'post/searchPosts', 
  async (payload) => {
    const { coordinates, radius } = payload;
    return await service.searchPost(coordinates.latitude, coordinates.longitude, radius);
  }
);