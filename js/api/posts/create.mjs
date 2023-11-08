import { socialBaseUrl } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "post";

/**
 * Creates a new post
 * @param {string} postData - Represents input information
 */
export async function createPost(postData) {
  const createPostUrl = socialBaseUrl + action;

  const response = await authFetch(createPostUrl, {
    method,
    body: JSON.stringify(postData)
  })

  return await response.json();

}

