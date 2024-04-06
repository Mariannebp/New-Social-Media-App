import { setRegisterUserFormListener } from "./handlers/register.mjs";
import { setLoginUserFormListener } from "./handlers/login.mjs";
import { setUpdatePostListener } from "./handlers/updatePost.mjs";
import { setCreateNewPostListener } from "./handlers/createPost.mjs";
import * as profile from "./api/profile/index.mjs";
import * as posts from "./handlers/getPosts.mjs";
import { setLogoutListener } from "./handlers/logout.mjs";

const path = location.pathname;

if (path === `/pages/login.html`) {
  setLoginUserFormListener();
} else if (path === `/pages/register.html`) {
  setRegisterUserFormListener();
} else if (path === `/pages/profile.html`) {
  profile.checkIfLoggedIn();

  profile.getProfile();
  setCreateNewPostListener();
  posts.getPostFeedUser();
  setLogoutListener();
} else if (path === `/pages/editPost.html`) {
  profile.checkIfLoggedIn();
  setUpdatePostListener();
  setLogoutListener();
} else if (path === `/index.html`) {
  profile.checkIfLoggedIn();
  setCreateNewPostListener();
  posts.getPostsFeed();
  posts.getPostsFeedSearched();
  posts.getPostFeedFiltered();
  setLogoutListener();
} else if (path === `/pages/singlePost.html`) {
  profile.checkIfLoggedIn();
  posts.getPostSingle();
  setLogoutListener();
} 