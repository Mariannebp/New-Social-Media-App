
/**
 * Toggle view lists of followers and following
 */
export function toggleViewFollow() {
  const follow = document.querySelector("#follow");
  const following = document.querySelector("#following");
  const followingButton = document.querySelector("#followingButton");
  const followers = document.querySelector("#followers");
  const followersButton = document.querySelector("#followersButton");

  if (window.innerWidth < 576) {
    const followContainer = document.querySelector("#followContainer");
    followContainer.classList.add("d-flex", "justify-content-around")
  }

  followingButton.addEventListener("click", () => {
    following.classList.toggle("d-none");
  })

  followersButton.addEventListener("click", () => {
    followers.classList.toggle("d-none")
  })
}