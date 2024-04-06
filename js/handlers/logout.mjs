import { logout } from "../api/auth/logout.mjs";

/**
 * A listener for when users are logging out
 */
export function setLogoutListener() {
  const logoutButton = document.querySelector("#logout");
  logoutButton.addEventListener("click", () => {
    logout();
    alert("You are now logged out")
    // location.reload();
    location.href = "/index.html";
  });
}
