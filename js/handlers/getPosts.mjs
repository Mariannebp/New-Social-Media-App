import { renderPosts, renderPostFeedSearched, renderPostFeedFiltered, renderPostsUser, renderPostSingle } from "../templates/posts.mjs";
import * as post from "../api/posts/index.mjs";

/**
 * Function that will get the posts for the home page. 
 */
export async function getPostsFeed() {
  const posts = await post.getPosts();
  const container = document.querySelector("#postsFeed");
  renderPosts(posts, container)
}

/**
 * Function that will get the searched posts for the home page. 
 */
export async function getPostsFeedSearched() {
  const posts = await post.getPostsMany();
  const container = document.querySelector("#postsFeed");
  renderPostFeedSearched(posts, container)
}

/**
 * Function that will get the filtered posts for the home page.
 */
export async function getPostFeedFiltered() {
  const posts = await post.getPostsMany();
  const container = document.querySelector("#postsFeed");
  renderPostFeedFiltered(posts, container)
}

/**
 * Function that will get the posts for the profile page. This uses the getPostsMany-function to be able to render more of the users post.
 */
export async function getPostFeedUser() {
  const posts = await post.getPostsMany();
  const container = document.querySelector("#usersPosts");
  renderPostsUser(posts, container)
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
  renderPostSingle(postSingle, container)
}

