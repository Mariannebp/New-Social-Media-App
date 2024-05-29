import { getPost } from "../api/posts/get.mjs";
import { updatePost } from "../api/posts/update.mjs";

/**
 * A listener for when updating new posts
 */
export async function setUpdatePostListener() {
  const form = document.querySelector("#editPost");

  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  if (form) {
    const button = form.querySelector("button");
    button.disabled = true;

    const post = await getPost(id);
    const { title, body, media } = post;

    form.title.value = title;
    form.body.value = body;
    form.media.value = media;

    button.disabled = false;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries())
      post.id = id;

      await updatePost(post);
      form.reset();
      window.history.back();
    })
  }
}