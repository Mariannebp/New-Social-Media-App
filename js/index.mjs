import * as profile from "./api/profile/index.mjs";
import * as posts from "./handlers/getPosts.mjs";
import * as handler from "./handlers/index.mjs";

const path = location.pathname;

if (path === `/pages/login.html`) {
  handler.setLoginUserFormListener();
} else if (path === `/pages/register.html`) {
  handler.setRegisterUserFormListener();
} else if (path === `/pages/profile.html`) {
  profile.checkIfLoggedIn();
  profile.viewProfile();
  handler.setUpdateAvatarListener();
  handler.setTogglePostFormListener();
  handler.setCreateNewPostListener();
  handler.scrollToTop();
  handler.setLogoutListener();
} else if (path === `/pages/editpost.html`) {
  profile.checkIfLoggedIn();
  handler.setUpdatePostListener();
  handler.scrollToTop();
  handler.setLogoutListener();
} else if (path === `/index.html`) {
  profile.checkIfLoggedIn();
  handler.setTogglePostFormListener();
  handler.setCreateNewPostListener();
  posts.getPostsFeedMain();
  posts.getPostsFeedSearchedMain();
  posts.getPostFeedFilteredMain();
  handler.scrollToTop();
  handler.setLogoutListener();
} else if (path === `/pages/singlepost.html`) {
  profile.checkIfLoggedIn();
  await posts.getPostSingle();
  handler.setCreateNewCommentListener();
  handler.scrollToTop();
  handler.setLogoutListener();
} 