import { socialBaseUrl } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { load } from "../../storage/index.mjs";
// import { load } from "../../storage/index.mjs";

const actionPosts = "/posts";
const actionProfiles = "/profiles/";
const profile = "/profiles/";
// const user = load("profile");

const author = "?_author=true";
const comments = "&_comments=true";

/**
 * function that call for default number of posts from the API
 */
export async function getPosts() {
  const getPostsUrl = `${socialBaseUrl}${actionPosts}${author}`;

  const response = await authFetch(getPostsUrl);

  return await response.json();
}

/**
 * function that call for posts by the author
 */
export async function getPostsProfile(name) {
  const getPostsUrl = `${socialBaseUrl}${profile}${name}${actionPosts}${author}`;

  const response = await authFetch(getPostsUrl);
  return await response.json();
}

/**
 * function that call for a post matching the ID being passed from the API
 * @param {number} id the id of the post being targeted
 */
export async function getPost(id) {
  if (!id) {
    throw new Error("A postId is required");
  }

  const getPostUrl = `${socialBaseUrl}${actionPosts}/${id}${author}${comments}`;

  const response = await authFetch(getPostUrl);

  return await response.json();
}

/**
 * function that call for the user profile being targeted
 */
export async function getProfile() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const name = params.get("name");

  const addOns = "?_followers=true&_following=true&_posts=true"
  const getProfileUrl = `${socialBaseUrl}${actionProfiles}${name}${addOns}`;
  const response = await authFetch(getProfileUrl);

  return await response.json();
}

export async function getLoggedInAvatar() {
  const userInfo = load("profile");
  const { name } = userInfo;
  const getLoggedInAvatarUrl = `${socialBaseUrl}${actionProfiles}${name}`;
  const response = await authFetch(getLoggedInAvatarUrl);

  return await response.json();
}