import { socialBaseUrl } from "../constants.mjs"; 
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const author = "?_author=true";
const many = "&limit=500";

/**
 * function that call for default number of posts from the API
 */
export async function getPosts() {
  const getPostsUrl = `${socialBaseUrl}${action}${author}`;

  const response = await authFetch(getPostsUrl);

  return await response.json();
}

/**
 * function that call for up to 500 posts from the API
 */
export async function getPostsMany() {
  const getPostsUrl = `${socialBaseUrl}${action}${author}${many}`;

  const response = await authFetch(getPostsUrl);

  return await response.json();
}

/**
 * function that call for a post matching the ID being passed from the API
 * @param {number} id the id of the post being targeted
 */
export async function getPost(id) {
  if (!id) {
    throw new Error("A postId is required");
  }

  const getPostUrl = `${socialBaseUrl}${action}/${id}${author}`;
 
  const response = await authFetch(getPostUrl);
  
  return await response.json();
  
}