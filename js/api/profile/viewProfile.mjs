import { getPostFeedUser } from "../../handlers/getPosts.mjs";
import { getProfile } from "../posts/get.mjs";

export async function viewProfile() {
  const userName = document.querySelector("#userName");
  const userEmail = document.querySelector("#userEmail");
  const userAvatar = document.querySelector("#userAvatar");
  const userPostCount = document.querySelector("#postCount");
  const userFollowersCount = document.querySelector("#followersCount");
  const userFollowingCount = document.querySelector("#followingCount");

  const profileData = await getProfile();
  const { name, email, _count, avatar } = profileData;
  const { posts, followers, following } = _count;

  userName.innerHTML = name;
  userEmail.innerHTML = email;
  userPostCount.innerHTML = posts;
  userFollowersCount.innerHTML = followers;
  userFollowingCount.innerHTML = following;

  if (avatar) {
    const img = document.createElement("img");
    img.classList.add("d-flex", "align-items-center", "m-auto", "w-50")
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

  getPostFeedUser(name);
}