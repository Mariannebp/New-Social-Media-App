import { socialBaseUrl } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import * as storage from "../../storage/index.mjs";

/**
 * Updates the users avatar
 * @param {string} avatarData Represents input information
 */
export async function updateAvatar(avatarData) {
  const userInfo = storage.load("profile")
  const { name } = userInfo;

  const action = `/profiles/${name}/media`;
  const method = "put";

  const updateAvatarUrl = `${socialBaseUrl}${action}`;

  const response = await authFetch(updateAvatarUrl, {
    method,
    body: JSON.stringify(avatarData)
  })

  return await response.json();
}

