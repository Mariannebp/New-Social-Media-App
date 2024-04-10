

/**
 * Toggles Add a New Post form on home page
 */
export function togglePostForm() {
  const toggleForm = document.querySelector("#newPost");
  const postForm = document.querySelector("#addNewPost");

  toggleForm.addEventListener("click", () => postForm.classList.toggle("visually-hidden"))
}