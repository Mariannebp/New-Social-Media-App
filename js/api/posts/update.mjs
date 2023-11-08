import { socialBaseUrl } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "put";


/**
 * Updates an post
 * @param {string} postData Represents input information
 * @returns 
 */
export async function updatePost(postData) {
  if (!postData.id) {
    throw new Error("An post ID is required to make updates")
  }
  
  const updatePostUrl = `${socialBaseUrl}${action}/${postData.id}`;

  const response = await authFetch(updatePostUrl, {
    method,
    body: JSON.stringify(postData)
  })

  return await response.json();
}