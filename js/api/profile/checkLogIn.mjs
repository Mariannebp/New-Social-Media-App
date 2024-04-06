import { load } from "../../storage/index.mjs";

/**
 * Checks if a user is logged in, displaying an error message if not
 */
export function checkIfLoggedInContent() {
  const profile = load("profile");

  if (!profile) {
    location.href = "/pages/notLoggedIn.html";
  }
}
