import { load } from "../../storage/index.mjs";
import { socialBaseUrl } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

export async function getProfile() {
  const userName = document.querySelector("#userName");
  const userEmail = document.querySelector("#userEmail");
  const userAvatar = document.querySelector("#userAvatar");
  const userPostCount = document.querySelector("#postCount");

  const userInfo = load("profile");
  const { name } = userInfo;

  const action = "/profiles/";
  const addOns = "?_followers=true&_following=true&_posts=true"
  const getProfileUrl = `${socialBaseUrl}${action}${name}${addOns}`;
  const response = await authFetch(getProfileUrl);
  const profileData = await response.json();

  console.log(profileData)

  userName.innerHTML = profileData.name;
  userEmail.innerHTML = profileData.email;
  userPostCount.innerHTML = profileData._count.posts;

  if (profileData.avatar) {
    const img = document.createElement("img");
    img.classList.add("d-flex", "align-items-center", "m-auto", "w-50")
    img.src = profileData.avatar;
    img.alt = `Profile image of ${name}`;
    userAvatar.append(img);
  } else {
    const img = document.createElement("img");
    img.classList.add("d-flex", "align-items-center", "m-auto", "w-50")
    img.src = "/img/avatar-1606939.png";
    img.alt = "Profile avatar default";
    userAvatar.append(img);
  }
}