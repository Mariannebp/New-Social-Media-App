import { createPost } from "../api/posts/create.mjs";

/**
 * A listener for when creating new posts
 */
export function setCreateNewPostListener() {
  const form = document.querySelector("#addNewPost");
  const newTitle = document.querySelector("#title");
  const newText = document.querySelector("#text");
  const newMedia = document.querySelector("#media");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const title = newTitle.value;
      const text = newText.value;
      const media = newMedia.value;

      await createPost({
          title: title,
          body: text,
          media: media,
        })
      form.reset();
      location.reload(); 
    })
  }
}
