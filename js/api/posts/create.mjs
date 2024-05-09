import { socialBaseUrl } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const method = "post";

/**
 * Creates a new post
 * @param {string} postData - Represents input information
 */
export async function createPost(postData) {
  const action = "/posts";
  const createPostUrl = socialBaseUrl + action;

  const response = await authFetch(createPostUrl, {
    method,
    body: JSON.stringify(postData)
  })

  return await response.json();

}

/**
 * Creates a new comment
 * @param {string} id - represents the id of the post commenting
 * @param {string} commentData - Represents input information
 */
export async function createComment(id, commentData) {
  const action = "/posts/" + id + "/comment";
  const createCommentUrl = socialBaseUrl + action;

  const response = await authFetch(createCommentUrl, {
    method,
    body: JSON.stringify(commentData)
  })

  return await response.json();

}

