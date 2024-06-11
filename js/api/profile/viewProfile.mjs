import { getPostFeedUser } from "../../handlers/getPosts.mjs";
import { toggleViewFollow } from "../../handlers/toggleFollowView.mjs";
import { load } from "../../storage/index.mjs";
import { getProfile } from "../posts/get.mjs";
import * as p from "./index.mjs";

/**
 * Sets up the content on the profile page
 */
export async function viewProfile() {
  const userName = document.querySelector("#userName");
  const userEmail = document.querySelector("#userEmail");
  const userAvatar = document.querySelector("#userAvatar");
  const userPostCount = document.querySelector("#postCount");
  const userFollowersCount = document.querySelector("#followersCount");
  const userFollowingCount = document.querySelector("#followingCount");
  const followButtonContainer = document.querySelector("#followButtonContainer");
  const followButton = document.querySelector("#followButton");
  const newPostProfile = document.querySelector("#newPostProfile");

  const profileData = await getProfile();
  const { name, email, _count, avatar, followers, following } = profileData;

  const headTitle = document.querySelector("title");
  headTitle.innerHTML = "The Place | " + name;

  userName.innerHTML = name;
  userEmail.innerHTML = email;
  userPostCount.innerHTML = _count.posts;
  userFollowersCount.innerHTML = _count.followers;
  userFollowingCount.innerHTML = _count.following;

  if (avatar) {
    const img = document.createElement("img");
    img.classList.add("d-flex", "align-items-center", "m-auto", "w-75")
    img.src = avatar;
    img.alt = `Profile image of ${name}`;
    userAvatar.append(img);
  } else {
    const img = document.createElement("img");
    img.classList.add("d-flex", "align-items-center", "m-auto", "w-50")
    img.src = "/assets/img/avatar-1606939.png";
    img.alt = "Profile avatar default";
    userAvatar.append(img);
  }

  const user = load("profile");

  if (user.name === name) {
    followButtonContainer.classList.add("d-none");
    newPostProfile.classList.remove("d-none");
  } else {
    const checkFollow = followers.find((n) => n.name === user.name);
    if (checkFollow) {
      followButton.innerHTML = "Following";
    } else {
      followButton.innerHTML = "Follow +";
    }

    followButton.addEventListener("click", async () => {
      if (checkFollow) {
        await p.unFollow(name);
        followButton.innerHTML = "Follow +";
        location.reload();
      } else {
        await p.follow(name);
        followButton.innerHTML = "Following";
        location.reload();
      }
    })
  }

  toggleViewFollow();
  p.showFollowing(following)
  p.showFollowers(followers)

  getPostFeedUser(name);
}