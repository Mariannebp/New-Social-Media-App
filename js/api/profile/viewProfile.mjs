// import { load } from "../../storage/index.mjs";
// import { socialBaseUrl } from "../constants.mjs";
// import { authFetch } from "../authFetch.mjs";
import { getPostFeedUser } from "../../handlers/getPosts.mjs";
import { getProfile } from "../posts/get.mjs";

export async function viewProfile() {
  const userName = document.querySelector("#userName");
  const userEmail = document.querySelector("#userEmail");
  const userAvatar = document.querySelector("#userAvatar");
  const userPostCount = document.querySelector("#postCount");
  const userFollowersCount = document.querySelector("#followersCount");
  const userFollowingCount = document.querySelector("#followingCount");

  // const userInfo = load("profile");
  // const { name } = userInfo;
  const name = "Erica"


  const profileData = await getProfile(name);

  console.log(profileData)
  console.log(getProfile.response)

  userName.innerHTML = profileData.name;
  userEmail.innerHTML = profileData.email;
  userPostCount.innerHTML = profileData._count.posts;
  userFollowersCount.innerHTML = profileData._count.followers;
  userFollowingCount.innerHTML = profileData._count.following;

  if (profileData.avatar) {
    const img = document.createElement("img");
    img.classList.add("d-flex", "align-items-center", "m-auto", "w-50")
    img.src = profileData.avatar;
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