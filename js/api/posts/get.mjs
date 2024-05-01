import { socialBaseUrl } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { load } from "../../storage/index.mjs";

const action = "/posts";
const profile = "/profiles/";
const user = load("profile");

const author = "?_author=true";
const comments = "&_comments=true";
const reactions = "&_reactions=true";

/**
 * function that call for default number of posts from the API
 */
export async function getPosts() {
  const getPostsUrl = `${socialBaseUrl}${action}${author}`;

  const response = await authFetch(getPostsUrl);

  return await response.json();
}

/**
 * function that call for posts by the author
 */
export async function getPostsProfile() {
  const getPostsUrl = `${socialBaseUrl}${profile}${user.name}${action}${author}`;

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

  const getPostUrl = `${socialBaseUrl}${action}/${id}${author}${comments}${reactions}`;

  const response = await authFetch(getPostUrl);

  return await response.json();
}