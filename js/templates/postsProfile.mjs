import { removePost } from "../api/posts/remove.mjs";
import { load } from "../storage/index.mjs";

/**
 * Sets the template to display each post fetched on the profile page
 * @param {string} postData that fetches the posts to be displayed.
 */
export function postTemplateProfile(postData) {
  const { title, media, body, author, updated, id, _count } = postData;
  const userInfo = load("profile");
  const { name } = author;
  const profile = userInfo.name;

  const post = document.createElement("div");
  post.classList.add("shadow", "rounded", "bg-gray", "m-auto", "mb-4", "p-3");
  post.setAttribute("style", "max-width: 900px");

  const postContent = document.createElement("div");
  postContent.classList.add("border", "border-info", "pb-3")
  post.append(postContent)

  // Presenting the date
  const date = new Date(updated).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });
  const postDate = document.createElement("p");
  postDate.classList.add("text-end", "me-4", "mt-3");
  postDate.setAttribute("style", "font-size: 0.9rem");
  postDate.innerHTML = date;

  // Presenting the title
  const postTitle = document.createElement("h4");
  postTitle.classList.add("font-monospace", "m-3", "text-center");
  postTitle.innerHTML = title;

  postContent.append(postDate, postTitle)

  // Presenting the posts image
  if (media) {
    const img = document.createElement("img");
    img.classList.add("d-flex", "align-items-center", "m-auto", "mb-3")
    img.setAttribute("style", "width: 90%");
    img.src = media;
    img.alt = `Image from ${title}`;
    postContent.append(img);
  } else {
    const img = document.createElement("img");
    img.classList.add("d-flex", "align-items-center", "m-auto", "mb-3");
    img.setAttribute("style", "width: 50%");
    img.src = "/assets/icons/card-image-2.png";
    img.alt = `Placeholder for ${title}`;
    postContent.append(img);
  }

  // Presents a preview of the body-text, and a read more-link
  const infoHolder = document.createElement("div");
  infoHolder.classList.add("text-start", "m-3", "m-auto", "w-75")
  postContent.append(infoHolder);

  if (body && body.length) {
    const postBody = document.createElement("p");
    const bodyLimited = body.substring(0, 60);
    postBody.innerHTML = bodyLimited + "...";

    infoHolder.append(postBody);

    const readMore = document.createElement("div");
    readMore.classList.add("mb-4");
    const readMoreLink = document.createElement("a");
    readMoreLink.classList.add("text-info");
    readMoreLink.setAttribute("href", `/pages/singlepost.html?id=${id}`);
    readMoreLink.innerHTML = "See more";

    readMore.append(readMoreLink)
    postBody.append(readMore)
  } else {
    const readMore = document.createElement("div");
    readMore.classList.add("mb-4");
    const readMoreLink = document.createElement("a");
    readMoreLink.classList.add("text-info");
    readMoreLink.setAttribute("href", `/pages/singlepost.html?id=${id}`);
    readMoreLink.innerHTML = "See more";

    readMore.append(readMoreLink)
    infoHolder.append(readMore)
  }

  // Adds counter for comments
  const interactions = document.createElement("div");
  interactions.classList.add("d-flex", "flex-row", "align-items-center", "mb-3")

  const commentsCounter = document.createElement("div");
  commentsCounter.classList.add("me-2")
  const commentsLink = document.createElement("a");
  commentsLink.classList.add("d-flex", "align-items-center", "p-0", "btn", "text-decoration-none");

  commentsLink.setAttribute("href", `/pages/singlepost.html?id=${id}`);

  const commentIcon = document.createElement("img");
  commentIcon.src = "/assets/icons/chat-dots-fill.png";
  commentIcon.alt = "Comments";
  commentIcon.height = "30";
  commentIcon.width = "32";

  commentsCounter.append(commentsLink)
  commentsLink.append(commentIcon);
  interactions.append(commentsCounter);

  if (_count) {
    const commentsCount = document.createElement("p");
    commentsCount.classList.add("m-auto", "ms-1")
    commentsCount.innerHTML = "(" + _count.comments + ")";

    commentsLink.append(commentsCount);
  }

  infoHolder.append(interactions);

  // Adds edit and delete options if on logged in users page 
  if (profile === name) {
    const buttons = document.createElement("div");
    buttons.classList.add("d-flex", "justify-content-end", "align-items-center", "me-3");
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "p-1", "me-2");
    editButton.setAttribute("id", "editButton");
    const editButtonIcon = document.createElement("img");
    editButtonIcon.src = "/assets/icons/pencil-fill.png";
    editButtonIcon.width = "24";
    editButton.append(editButtonIcon);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "p-1");
    deleteButton.setAttribute("id", "deleteButton");
    const deleteButtonIcon = document.createElement("img");
    deleteButtonIcon.src = "/assets/icons/trash3-fill_edt.png";
    deleteButtonIcon.width = "24";
    deleteButton.append(deleteButtonIcon);

    buttons.append(editButton, deleteButton);

    editButton.addEventListener("click", () => location.href = `editpost.html?id=${id}`)
    deleteButton.addEventListener("click", async () => {
      await removePost(id);
      location.reload();
    })

    postContent.append(buttons);
  }

  return post;
}


/**
 * Displays the fetched posts that matches the logged in name on the chosen location in html
 * 
 * @param {string} postDataList that fetches the posts to be displayed.
 * @param {string} parent - the chosen location in the html 
 */
export function renderPostsProfile(postDataList, parent) {
  const message = document.querySelector("#errorMessage")

  postDataList.forEach(e => {
    message.innerHTML = "";
    parent.append(postTemplateProfile(e));
  })
}