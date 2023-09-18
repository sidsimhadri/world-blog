import axios from 'axios';
const POST_API = 'http://localhost:4000/api/posts';


export const createPost = async (post) => {
  const response = await axios.post(POST_API, post)
  return response.data;
}

export const findPost = async (pid) => {
  let response = ""
  if (pid === undefined) {
    response = await axios.get(`${POST_API}`)
  }
  else {
    response = await axios.get(`${POST_API}/${pid}`)
  }
  const posts = response.data;
  return posts;
}

export const deletePost = async (pid) => {
  const response = await axios
    .delete(`${POST_API}/${pid}`)
  return response.data
}

export const searchPost = async (lattitude, longitude, radius) => {
  console.log({
      latitude: lattitude,
      longitude: longitude,
      radius: radius,
    })
  const response = await axios.get(`${POST_API}/search`, {
    params: {
      latitude: lattitude,
      longitude: longitude,
      radius: radius,
    },
  });
  return response.data;
};
