import { remove } from "../../storage/index.mjs";

/**
 * Logs out the user and removes their profile information from localstorage
 */
export function logout() {
  remove("token");
  remove("profile");
}