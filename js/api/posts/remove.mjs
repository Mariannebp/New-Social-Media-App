import { socialBaseUrl } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "delete";

/**
 * Delete the post based on the targets ID.
 * @param {number} id of the post being targeted for deletion.
 */
export async function removePost(id) {
  if (!id) {
    throw new Error("An post ID is required to delete")
  }

  const removePostUrl = `${socialBaseUrl}${action}/${id}`;

  const response = await authFetch(removePostUrl, {
    method
  })

  return await response.json();
}

export async function removeComment(id, commentId) {
  if (!id || !commentId) {
    throw new Error("A comment ID is required to delete")
  }

  const comment = "/comment"
  const removeCommentUrl = `${socialBaseUrl}${action}/${id}${comment}/${commentId}`;

  const response = await authFetch(removeCommentUrl, {
    method
  })
}