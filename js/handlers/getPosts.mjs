import * as post from "../api/posts/index.mjs";
import * as p from "../templates/index.mjs";

/**
 * Function that will get the posts for the home page. 
 */
export async function getPostsFeedMain() {
  const posts = await post.getPosts();
  const container = document.querySelector("#postsFeed");
  container.innerHTML = "";
  p.renderPostsMain(posts, container)
}

/**
 * Function that will get the searched posts for the home page. 
 */
export async function getPostsFeedSearchedMain() {
  const posts = await post.getPosts();
  const container = document.querySelector("#postsFeed");
  p.renderPostFeedSearchedMain(posts, container)
}

/**
 * Function that will get the filtered posts for the home page.
 */
export async function getPostFeedFilteredMain() {
  const posts = await post.getPosts();
  const container = document.querySelector("#postsFeed");
  p.renderPostFeedFilteredMain(posts, container)
}

/**
 * Function that will get the posts for the profile page. This uses the getPostsMany-function to be able to render more of the users post.
 */
export async function getPostFeedUser(name) {
  const posts = await post.getPostsProfile(name);
  const container = document.querySelector("#usersPosts");
  p.renderPostsProfile(posts, container)
}

/**
 * Function that will get a single post based on the ID being passed
 * @param {number} id of the post being targeted
 */
export async function getPostSingle() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  const postSingle = await post.getPost(id);
  const container = document.querySelector("#singlePost");
  container.innerHTML = "";
  p.renderPostSingle(postSingle, container)
}

