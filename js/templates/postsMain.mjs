import { load } from "../storage/index.mjs";

/**
 * Sets the template to display each post fetched to the main feed om home page
 * @param {string} postData that fetches the posts to be displayed.
 */
export function postTemplateMain(postData) {
  const { title, media, body, author, updated, id, _count, comments } = postData;
  const { name, avatar } = author;
  const userInfo = load("profile");
  const profile = userInfo.name;

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

  //Presenting the title
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
    const bodyLimited = body.split(' ').slice(0, 15).join(' ');
    postBody.innerHTML = bodyLimited + "...";

    infoHolder.append(postBody);

    const readMore = document.createElement("div");
    readMore.classList.add("mb-4");
    const readMoreLink = document.createElement("a");
    readMoreLink.classList.add("text-info");
    readMoreLink.setAttribute("href", `/pages/singlePost.html?id=${id}`);
    readMoreLink.innerHTML = "See more";

    readMore.append(readMoreLink)
    postBody.append(readMore)
  } else {
    const readMore = document.createElement("div");
    readMore.classList.add("mb-4");
    const readMoreLink = document.createElement("a");
    readMoreLink.classList.add("text-info");
    readMoreLink.setAttribute("href", `/pages/singlePost.html?id=${id}`);
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

  commentsLink.setAttribute("href", `/pages/singlePost.html?id=${id}`);

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

  return post;
}


/**
 * Displays the fetched posts on the chosen location in html
 * @param {string} postDataList that fetches the posts to be displayed.
 * @param {string} parent - the chosen location in the html 
 */
export function renderPostsMain(postDataList, parent) {
  parent.append(...postDataList.map(postTemplateMain));
}

/**
 * Filters and displays the fetched posts on the chosen location in html
 * @param {string} postDatalist that fetches the posts to be displayed.
 * @param {string} parent - the chosen location in the html 
 */
export function renderPostFeedFilteredMain(postDatalist, parent) {
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
    parent.append(...postDatalist.map(postTemplateMain))
  })


  filterTwentyFourHours.addEventListener("click", () => {
    const twentyFour = new Date(currentTime - day).toISOString();
    container.innerHTML = "";
    filterText.innerHTML = "Last 24 hours";

    const filteredDates = postDatalist.filter(post => post.updated >= twentyFour)

    filteredDates.forEach(i => {
      if (i) {
        parent.append(postTemplateMain(i))
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
        parent.append(postTemplateMain(i))
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
        parent.append(postTemplateMain(i))
      }
    })
  })
}


/**
 * Displays the fetched posts that matches the search input, on the chosen location in html
 * @param {string} postDataList that fetches the posts to be displayed.
 * @param {string} parent to the chosen location in the html 
 */
export function renderPostFeedSearchedMain(postDataList, parent) {
  const searchInput = document.querySelector("#search");

  searchInput.addEventListener("input", e => {
    let searchValue = e.target.value.toLowerCase();

    const container = document.querySelector("#postsFeed");
    container.innerHTML = "";

    postDataList.forEach(i => {
      if (i.title.toLowerCase().startsWith(searchValue)) {
        parent.append(postTemplateMain(i));
      }
    })
  })
}