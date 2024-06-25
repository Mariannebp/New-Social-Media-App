/**
 * Toggles Add a New Post form on home and profile page
 */
export function setTogglePostFormListener() {
  const toggleForm = document.querySelector("#newPost");
  const postForm = document.querySelector("#addNewPost");
  const postFormColorMain = document.querySelector("#newPostMain");
  const postFormColorProfile = document.querySelector("#newPostProfile")
  const postFormHeading = document.querySelector("#newPostH1");

  const path = location.pathname;

  toggleForm.addEventListener("click", () => {
    postForm.classList.toggle("visually-hidden");
    if (path === `/index.html` || path === `/`) {
      postFormColorMain.classList.toggle("bg-buttonmain");
      postFormColorMain.classList.toggle("bg-gray");
    } else {
      postFormColorProfile.classList.toggle("bg-buttonmain");
      postFormColorProfile.classList.toggle("bg-gray");
    }
    postFormHeading.classList.toggle("text-white");
    postFormHeading.classList.toggle("text-secondary");
  })
}