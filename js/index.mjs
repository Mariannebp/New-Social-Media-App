import * as profile from "./api/profile/index.mjs";
import * as posts from "./handlers/getPosts.mjs";
import * as handler from "./handlers/index.mjs";

const path = location.pathname;

// Cover pathways on both netlify and local server
if (path === `/pages/login.html` || path === `/pages/login`) {
  handler.setLoginUserFormListener();
} else if (path === `/pages/register.html` || path === `/pages/register`) {
  handler.setRegisterUserFormListener();
} else if (path === `/pages/profile.html` || path === `/pages/profile`) {
  profile.checkIfLoggedIn();
  profile.viewProfile();
  handler.setUpdateAvatarListener();
  handler.setTogglePostFormListener();
  handler.setCreateNewPostListener();
  handler.scrollToTop();
  handler.setLogoutListener();
} else if (path === `/pages/editpost.html` || path === `/pages/editpost`) {
  profile.checkIfLoggedIn();
  handler.setUpdatePostListener();
  handler.scrollToTop();
  handler.setLogoutListener();
} else if (path === `/index.html` || path === `/`) {
  profile.checkIfLoggedIn();
  handler.setTogglePostFormListener();
  handler.setCreateNewPostListener();
  posts.getPostsFeedMain();
  posts.getPostsFeedSearchedMain();
  posts.getPostFeedFilteredMain();
  handler.scrollToTop();
  handler.setLogoutListener();
} else if (path === `/pages/singlepost.html` || path === `/pages/singlepost`) {
  profile.checkIfLoggedIn();
  await posts.getPostSingle();
  handler.setCreateNewCommentListener();
  handler.scrollToTop();
  handler.setLogoutListener();
} 