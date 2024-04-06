import { load } from "../../storage/index.mjs";
import { setAvatarHeader } from "./avatar.mjs";

/**
 * Checks if a user is logged in, displaying an error message if not
 */
export function checkIfLoggedIn() {
  const profile = load("profile");

  if (!profile) {
    location.href = "/pages/notLoggedIn.html";
  } else {
    setAvatarHeader();
  }
}