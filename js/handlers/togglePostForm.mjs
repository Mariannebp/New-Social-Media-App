

/**
 * Toggles Add a New Post form on home page
 */
export function setTogglePostFormListener() {
  const toggleForm = document.querySelector("#newPost");
  const postForm = document.querySelector("#addNewPost");

  toggleForm.addEventListener("click", () => postForm.classList.toggle("visually-hidden"))
}