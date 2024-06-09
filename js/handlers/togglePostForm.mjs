

/**
 * Toggles Add a New Post form on home page
 */
export function setTogglePostFormListener() {
  const toggleForm = document.querySelector("#newPost");
  const postForm = document.querySelector("#addNewPost");
  const postFormColor = document.querySelector("#newPostProfile");
  const postFormHeading = document.querySelector("#newPostH1");

  toggleForm.addEventListener("click", () => {
    postForm.classList.toggle("visually-hidden")
    postFormColor.classList.toggle("btn-buttonmain")
    postFormColor.classList.toggle("bg-gray")
    postFormHeading.classList.toggle("text-white")
    postFormHeading.classList.toggle("text-secondary")
  })
  // toggleForm.addEventListener("click", () => postBg.classList.toggle("btn-buttonmain"));
}