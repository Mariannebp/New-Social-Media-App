import { setRegisterUserFormListener } from "./handlers/register.mjs";
import { setLoginUserFormListener } from "./handlers/login.mjs";
import { setUpdatePostListener } from "./handlers/updatePost.mjs";
import { setCreateNewPostListener } from "./handlers/createPost.mjs";
import { getProfile } from "./api/profile/index.mjs";
import * as posts from "./handlers/getPosts.mjs";
import { load } from "./storage/index.mjs";

const path = location.pathname;
const profile = load("profile");

if (!profile) {
  if (path === `/index.html` || path === `/pages/profile.html`) {
    const body = document.querySelector("main");
    body.innerHTML = `<div class="m-auto mb-5 text-center">
                        <h1 class="m-4 fs-2">Seems like you are not logged in yet</h1>
                        <a class="text-info" href="/pages/login.html">Please log in here</a>
                      <div>`;
  } 
}

if (path === `/pages/login.html`) {
  setLoginUserFormListener();
} else if (path === `/pages/register.html`) {
  setRegisterUserFormListener();
} else if (path === `/pages/profile.html`) {
  getProfile();
  setCreateNewPostListener();
  posts.getPostFeedUser();
} else if (path === `/pages/editPost.html`) {
  setUpdatePostListener();
} else if (path === `/index.html`) {
  setCreateNewPostListener();
  posts.getPostsFeed();
  posts.getPostsFeedSearched();
  posts.getPostFeedFiltered();
} else if (path === `/pages/singlePost.html`) {
  posts.getPostSingle();
}
