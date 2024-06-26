import { removeComment } from "../api/posts/remove.mjs";
import { load } from "../storage/index.mjs";

/**
 * Sets the template to display a single post with its comments
 * @param {string} postData that fetches the posts to be displayed.
 */
export function postTemplateSingle(postData) {
  const { title, media, body, author, updated, id, _count, comments } = postData;
  const { name, avatar } = author;
  const userInfo = load("profile");
  const profile = userInfo.name;

  const headTitle = document.querySelector("title");
  headTitle.innerHTML = "The Place | " + title;

  const post = document.createElement("div");
  post.classList.add("shadow", "rounded", "bg-gray", "m-auto", "mb-4", "p-3");
  post.setAttribute("style", "max-width: 900px");

  const postContent = document.createElement("div");
  postContent.classList.add("border", "border-info", "pb-3")
  post.append(postContent)

  // Presenting author of the post, and adds a link to their profile page
  const userLink = document.createElement("a");
  userLink.classList.add("btn", "p-0", "d-flex");
  userLink.setAttribute("href", `/pages/profile.html?name=${name}`);

  const user = document.createElement("div");
  user.classList.add("d-flex", "mt-3", "me-3", "align-items-center");

  const postAuthor = document.createElement("p");
  postAuthor.classList.add("ms-3", "mb-0");
  postAuthor.innerHTML = name;

  if (avatar) {
    const userAvatar = document.createElement("img");
    userAvatar.classList.add("ms-3", "d-flex", "justify-items-start", "rounded-circle")
    userAvatar.src = avatar;
    userAvatar.alt = "Avatar";
    userAvatar.height = "36";
    userAvatar.width = "36";
    userAvatar.style.objectFit = "cover";
    user.append(userAvatar, postAuthor);
  } else {
    const UserAvatar = document.createElement("img");
    UserAvatar.src = "/assets/img/avatar-1606939.png";
    UserAvatar.classList.add("ms-3", "d-flex");
    UserAvatar.alt = "Avatar";
    UserAvatar.height = "36";
    user.append(UserAvatar, postAuthor);
  }
  userLink.append(user);
  postContent.append(userLink);

  // Presenting the date
  const date = new Date(updated).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });
  const postDate = document.createElement("p");
  postDate.classList.add("text-end", "me-4", "mt-0");
  postDate.setAttribute("style", "font-size: 0.9rem");
  postDate.innerHTML = date;

  // Presenting the title
  const postTitle = document.createElement("h4");
  postTitle.classList.add("font-monospace", "m-3", "text-center");
  postTitle.innerHTML = title;

  postContent.append(postDate, postTitle)

  // Presenting the posts media
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

  // Presenting the body-text
  const infoHolder = document.createElement("div");
  infoHolder.classList.add("text-start", "m-3", "m-auto", "w-75")
  postContent.append(infoHolder);

  const postBody = document.createElement("p");
  postBody.classList.add("mb-3");
  postBody.innerHTML = body;

  infoHolder.append(postBody);

  // Presenting the comments for the posts
  const interactions = document.createElement("div");
  interactions.classList.add("d-flex", "flex-row", "align-items-center", "mb-3")

  const commentsCounter = document.createElement("div");
  commentsCounter.classList.add("me-2")
  const commentsLink = document.createElement("a");
  commentsLink.classList.add("d-flex", "align-items-center", "p-0", "btn", "text-decoration-none");

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

  const commentSection = document.createElement("div");
  commentSection.classList.add("m-auto", "mb-3", "w-75", "text-start");

  const commentsTitle = document.createElement("h2");
  commentsTitle.classList.add("h5");
  commentsTitle.innerHTML = "Comments";

  const commentsAdd = document.createElement("form");
  commentsAdd.classList.add("d-flex", "mb-3");
  commentsAdd.setAttribute("id", "addNewComment")
  const commentInput = document.createElement("input");
  commentInput.classList.add("form-control");
  commentInput.setAttribute("id", "newComment");
  commentInput.setAttribute("type", "text");
  commentInput.setAttribute("maxLength", 280);
  commentInput.setAttribute("placeholder", "Comment...");

  const commentInputLabel = document.createElement("label");
  commentInputLabel.setAttribute("for", "newComment");
  commentInputLabel.classList.add("form-label", "visually-hidden");
  commentInputLabel.innerHTML = "comment field";

  commentsAdd.append(commentInputLabel, commentInput);

  const commentButton = document.createElement("button");
  commentButton.classList.add("btn");
  const commentButtonIcon = document.createElement("img");
  commentButtonIcon.src = "/assets/icons/chat-dots.png";
  commentButtonIcon.alt = "Post comment";
  commentButtonIcon.height = "28";
  commentButtonIcon.width = "30";

  commentButton.append(commentButtonIcon);
  commentsAdd.append(commentButton);

  commentSection.append(commentsTitle, commentsAdd);

  if (comments && comments.length) {

    const commentsSorted = comments.sort((a, b) => Date.parse(b.created) - Date.parse(a.created));

    commentsSorted.forEach(i => {
      const commentsEach = document.createElement("div");
      commentsEach.classList.add("border", "border-dark", "rounded", "mb-2");

      const commentsInfo = document.createElement("div");
      commentsInfo.classList.add("d-flex", "justify-content-between", "me-2", "mt-2");
      const commentsInfoLink = document.createElement("a");
      commentsInfoLink.classList.add("btn", "p-0");
      commentsInfoLink.setAttribute("href", `/pages/profile.html?name=${i.author.name}`);

      if (i.author.avatar && i.author.avatar.length) {
        const commentAuthor = document.createElement("div");
        commentAuthor.classList.add("d-flex", "mt-2");

        const commentName = document.createElement("p");
        commentName.classList.add("ms-2", "mb-1");
        commentName.innerHTML = i.author.name;

        const userAvatar = document.createElement("img");
        userAvatar.classList.add("ms-3", "d-flex", "justify-items-start", "rounded-circle")
        userAvatar.src = i.author.avatar;
        userAvatar.alt = "Avatar";
        userAvatar.height = "24";
        userAvatar.width = "24";
        userAvatar.style.objectFit = "cover";

        commentAuthor.append(userAvatar, commentName);
        commentsInfoLink.append(commentAuthor);
        commentsInfo.append(commentsInfoLink);
      } else {
        const commentAuthor = document.createElement("div");
        commentAuthor.classList.add("d-flex");

        const commentName = document.createElement("p");
        commentName.classList.add("ms-2", "mb-1");
        commentName.innerHTML = i.author.name;

        const UserAvatar = document.createElement("img");
        UserAvatar.src = "/assets/img/avatar-1606939.png";
        UserAvatar.classList.add("ms-3", "d-flex");
        UserAvatar.alt = "Avatar";
        UserAvatar.height = "24";

        commentAuthor.append(UserAvatar, commentName);
        commentsInfoLink.append(commentAuthor);
        commentsInfo.append(commentsInfoLink);
      }

      if (i.author.name === profile) {
        const deleteCommentButton = document.createElement("button");
        deleteCommentButton.classList.add("btn", "p-0");
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "/assets/icons/trash3-fill_edt.png";
        deleteIcon.alt = "Delete comment";
        deleteIcon.height = "18";
        deleteCommentButton.append(deleteIcon);

        deleteCommentButton.addEventListener("click", async () => {
          await removeComment(id, i.id);
          location.reload();
        })

        commentsInfo.append(deleteCommentButton);
      }

      commentsEach.append(commentsInfo);

      if (i.body) {
        const commentContent = document.createElement("p");
        commentContent.classList.add("mx-3", "text-black", "mb-1");
        commentContent.innerHTML = i.body;

        commentsEach.append(commentContent);
      } else {
        const commentContent = document.createElement("p");
        commentContent.classList.add("mx-3", "mb-1", "text-dark", "fst-italic");
        commentContent.innerHTML = "no content";

        commentsEach.append(commentContent);
      }

      function timeElapsed(currentTime, createdTime) {
        const minutes = 60 * 1000;
        const hours = minutes * 60;
        const days = hours * 24;
        const maxCountTime = days * 8;

        const elapsedTime = currentTime - createdTime;

        if (elapsedTime < minutes) {
          return Math.round(elapsedTime / 1000) + ' seconds ago';
        }
        else if (elapsedTime < hours) {
          return Math.round(elapsedTime / minutes) + ' minutes ago';
        }
        else if (elapsedTime < days) {
          return Math.round(elapsedTime / hours) + ' hours ago';
        }
        else if (elapsedTime < maxCountTime) {
          return Math.round(elapsedTime / days) + ' days ago';
        }
        else if (elapsedTime >= maxCountTime) {
          return new Date(i.created).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });
        }
      }

      const time = new Date(i.created).getTime();
      const timeAgo = timeElapsed(new Date(), time);

      const timeCount = document.createElement("p");
      timeCount.classList.add("me-3", "mb-1", "text-darker", "text-end");
      timeCount.setAttribute("style", "font-size: 0.9rem");
      timeCount.innerHTML = timeAgo;

      commentsEach.append(timeCount)

      commentSection.append(commentsEach);
    })
  } else {
    const commentsEmpty = document.createElement("p");
    commentsEmpty.classList.add("ms-3", "mb-2", "text-darker", "fst-italic");
    commentsEmpty.innerHTML = "No comments yet..";

    commentSection.append(commentsEmpty);
  }
  postContent.append(commentSection)

  return post;
}



/**
 * Displays the single fetched post on the chosen location in html
 * 
 * @param {string} postDataSingle that fetches the posts to be displayed.
 * @param {string} parent to the chosen location in the html 
 */
export function renderPostSingle(postDataSingle, parent) {
  parent.append(postTemplateSingle(postDataSingle));
}