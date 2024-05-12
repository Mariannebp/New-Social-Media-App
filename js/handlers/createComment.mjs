import { createComment } from "../api/posts/create.mjs";

/**
 * A listener for when creating new posts
 */
export function setCreateNewCommentListener() {

  const form = document.querySelector("#addNewComment");
  const newComment = document.querySelector("#newComment");

  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  if (newComment) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const body = newComment.value;

      console.log(body)
      await createComment(id, {
        body: body,
      })

      form.reset();
      location.reload();
    })
  }
}