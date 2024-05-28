import { socialBaseUrl } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "put";


/**
 * Follow a profile
 * @param {string} name Represents name on profile to follow
 * @returns 
 */
export async function follow(name) {
  if (!name) {
    throw new Error("A username must be provided to follow the profile")
  }

  const followUrl = `${socialBaseUrl}${action}/${name}/follow`;

  const response = await authFetch(followUrl, {
    method
  })

  return await response.json();
}

/**
 * Follow a profile
 * @param {string} name Represents name on profile to unfollow
 * @returns 
 */
export async function unFollow(name) {
  if (!name) {
    throw new Error("A username must be provided to follow the profile")
  }

  const followUrl = `${socialBaseUrl}${action}/${name}/unfollow`;

  const response = await authFetch(followUrl, {
    method
  })

  return await response.json();
}