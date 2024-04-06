import { load } from "../../storage/index.mjs";

/**
 * Checks if a user is logged in, displaying an error message if not
 */
export function checkIfLoggedInContent() {
  const loggedInWarning = document.querySelector("main");
  const profile = load("profile");

  if (!profile) {
    loggedInWarning.innerHTML = `<div class="text-center my-5">
                                  <h1 class="m-4 fs-2">You must be logged in to view this content</h1>
                                  <a class="text-info fs-4 text-decoration-none" href="./login.html">Please log in here</a>
                                </div>`;
  }
}
