import { load } from "../storage/index.mjs";
import { removePost } from "../api/posts/remove.mjs";


/**
 * Sets the template to display each post fetched with variations according to which page they are to be displayed on.
 * @param {string} postData that fetches the posts to be displayed.
 */
export function postTemplate(postData) {
  const { title, media, body, author, updated, id } = postData;
  const { name, avatar } = author;

  const path = location.pathname;

  if (path === `/pages/singlePost.html`) {
    const headTitle = document.querySelector("title");
    const navTitle = document.querySelector("#navTitle");

    headTitle.innerHTML = title;
    navTitle.innerHTML = title;
  }

  const post = document.createElement("div");
  post.classList.add("shadow", "rounded", "m-auto", "mb-4", "p-3");
  post.setAttribute("style", "max-width: 900px");

  const postContent = document.createElement("div");
  postContent.classList.add("border")
  post.append(postContent)

  if (path === `/index.html` || path === `/pages/singlePost.html`) {
    if (avatar) {
      const user = document.createElement("div");
      user.classList.add("d-flex", "mt-3");

      const postAuthor = document.createElement("p");
      postAuthor.classList.add("ms-3", "mb-4");
      postAuthor.innerHTML = name;

      const userAvatar = document.createElement("img");
      userAvatar.classList.add("ms-3", "d-flex", "justify-items-start")
      userAvatar.src = avatar;
      userAvatar.alt = "Avatar";
      userAvatar.height = "32";
      user.append(userAvatar, postAuthor)
      postContent.append(user)
    } else {
      const user = document.createElement("div");
      user.classList.add("d-flex", "mt-3");

      const postAuthor = document.createElement("p");
      postAuthor.classList.add("ms-3", "mb-4");
      postAuthor.innerHTML = name;

      const UserAvatar = document.createElement("img");
      UserAvatar.src = "/assets/img/avatar-1606939.png";
      UserAvatar.classList.add("ms-3", "d-flex");
      UserAvatar.alt = "Avatar";
      UserAvatar.height = "32";
      user.append(UserAvatar, postAuthor)
      postContent.append(user)
    }
  }

  const date = new Date(updated).toLocaleDateString();
  const postDate = document.createElement("p")
  postDate.classList.add("text-end", "me-5", "mt-3")
  postDate.innerHTML = date;

  const postTitle = document.createElement("h4");
  postTitle.classList.add("font-monospace", "m-3", "text-center");
  postTitle.innerHTML = title;

  postContent.append(postDate, postTitle)

  if (media) {
    const img = document.createElement("img");
    img.classList.add("d-flex", "align-items-center", "m-auto", "mb-3", "w-75")
    img.src = media;
    img.alt = `Image from ${title}`;
    postContent.append(img)
  }

  if (path === `/index.html`) {
    const readMore = document.createElement("a");
    readMore.classList.add("d-flex", "justify-content-end", "text-info", "m-3", "me-5");
    readMore.setAttribute("href", `/pages/singlePost.html?id=${id}`);
    readMore.innerHTML = "Read more...";

    postContent.append(readMore)
  }

  if (path === `/pages/profile.html` || path === `/pages/singlePost.html`) {
    const postBody = document.createElement("p");
    postBody.classList.add("m-3", "mb-4");
    postBody.innerHTML = body;

    postContent.append(postBody);
  }

  if (path === `/pages/profile.html`) {
    const buttons = document.createElement("div");
    buttons.classList.add("d-flex", "justify-content-end", "align-items-center", "m-3");
    const editButton = document.createElement("button");
    editButton.classList.add("btn", "btn-edit", "me-3");
    editButton.setAttribute("id", "editButton");
    editButton.innerHTML = "Edit";
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-delete", "me-3");
    deleteButton.setAttribute("id", "deleteButton");
    deleteButton.innerHTML = "Delete";
    buttons.append(editButton, deleteButton);

    editButton.addEventListener("click", () => location.href = `editPost.html?id=${id}`)
    deleteButton.addEventListener("click", async () => {
      await removePost(id);
      location.reload();
    })

    postContent.append(buttons);
  }

  return post;
}


/**
 * Displays the fetched posts on the chosen location in html
 * @param {string} postDataList that fetches the posts to be displayed.
 * @param {string} parent - the chosen location in the html 
 */
export function renderPosts(postDataList, parent) {
  parent.append(...postDataList.map(postTemplate));
}

/**
 * Filters and displays the fetched posts on the chosen location in html
 * @param {string} postDatalist that fetches the posts to be displayed.
 * @param {string} parent - the chosen location in the html 
 */
export function renderPostFeedFiltered(postDatalist, parent) {
  const container = document.querySelector("#postsFeed");
  const filterText = document.querySelector("#filterText");
  const filterNewest = document.querySelector("#newest");
  const filterTwentyFourHours = document.querySelector("#twentyFour");
  const filterMoreThenTwentyFourHours = document.querySelector("#moreThenTwentyFour");
  const filterMoreThenSevenDays = document.querySelector("#moreThenWeek")

  const day = 1000 * 60 * 60 * 24;
  const week = day * 7;
  const currentTime = new Date();


  filterNewest.addEventListener("click", () => {
    filterText.innerHTML = "Newest (default)";
    container.innerHTML = "";
    parent.append(...postDatalist.map(postTemplate))
  })


  filterTwentyFourHours.addEventListener("click", () => {
    const twentyFour = new Date(currentTime - day).toISOString();
    container.innerHTML = "";
    filterText.innerHTML = "Last 24 hours";

    const filteredDates = postDatalist.filter(post => post.updated >= twentyFour)

    filteredDates.forEach(i => {
      if (i) {
        parent.append(postTemplate(i))
      }
    })
  })

  filterMoreThenTwentyFourHours.addEventListener("click", () => {
    const moreThenTwentyFour = new Date(currentTime - day).toISOString();
    container.innerHTML = "";
    filterText.innerHTML = "More than 24 hours ago";

    const filteredDates = postDatalist.filter(post => post.updated <= moreThenTwentyFour)

    filteredDates.forEach(i => {
      if (i) {
        parent.append(postTemplate(i))
      }
    })
  })

  filterMoreThenSevenDays.addEventListener("click", () => {
    const lastSevenDays = new Date(currentTime - week).toISOString();
    container.innerHTML = "";
    filterText.innerHTML = "More then 7 days ago";

    const filteredDates = postDatalist.filter(post => post.updated <= lastSevenDays)

    filteredDates.forEach(i => {
      if (i) {
        parent.append(postTemplate(i))
      }
    })
  })
}


/**
 * Displays the fetched posts that matches the search input, on the chosen location in html
 * @param {string} postDataList that fetches the posts to be displayed.
 * @param {string} parent to the chosen location in the html 
 */
export function renderPostFeedSearched(postDataList, parent) {
  const searchInput = document.querySelector("#search");

  searchInput.addEventListener("input", e => {
    let searchValue = e.target.value.toLowerCase();

    const container = document.querySelector("#postsFeed");
    container.innerHTML = "";

    postDataList.forEach(i => {
      if (i.title.toLowerCase().startsWith(searchValue) || i.author.name.toLowerCase().startsWith(searchValue)) {
        parent.append(postTemplate(i));
      }
    })
  })
}

/**
 * Displays the fetched posts that matches the logged in name on the chosen location in html
 * 
 * @param {string} postDataList that fetches the posts to be displayed.
 * @param {string} parent - the chosen location in the html 
 */
export function renderPostsUser(postDataList, parent) {
  const message = document.querySelector("#errorMessage")

  postDataList.forEach(e => {
    message.innerHTML = "";
    parent.append(postTemplate(e));
  })
}

/**
 * Displays the single fetched post on the chosen location in html
 * 
 * @param {string} postDataSingle that fetches the posts to be displayed.
 * @param {string} parent to the chosen location in the html 
 */
export function renderPostSingle(postDataSingle, parent) {
  parent.append(postTemplate(postDataSingle));
}