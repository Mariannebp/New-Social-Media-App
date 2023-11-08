import { socialBaseUrl } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post"

/**
 * Logs in the user and stores their profile information in localstorage
 * @param {string} profile - represents the input information
 */
export async function login(profile) {
  const loginUrl = socialBaseUrl + action;
  const body = JSON.stringify(profile);
  
  const response = await fetch(loginUrl, {
    headers: {
      "Content-Type": "application/json"
    },
    method,
    body
  })

  const { accessToken, ...user } = await response.json()
  
  storage.save("token", accessToken)
  storage.save("profile", user)
  
  if (response.ok) {
    alert("You logged in!");
    location.href = "profile.html";
  } else {
    alert("Something went wrong, please try again")
  }
}