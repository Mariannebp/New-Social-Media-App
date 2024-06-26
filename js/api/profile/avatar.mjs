import { load } from "../../storage/index.mjs";
import { getLoggedInAvatar } from "../posts/get.mjs";

/**
 * Sets profile avatar in header if user have registered one
 */
export async function setAvatarHeader() {
  const profile = load("profile");
  const { name } = profile;
  const getLoggedInUser = await getLoggedInAvatar();
  const { avatar } = getLoggedInUser;

  const header = document.querySelector("#headerAvatar");
  header.setAttribute("href", `/pages/profile.html?name=${name}`)
  const avatarHolder = "../../../assets/img/avatar-1606939.png";

  if (avatar) {
    const userAvatar = document.createElement("img");
    userAvatar.classList.add("rounded-circle");
    userAvatar.src = avatar;
    userAvatar.alt = name;
    userAvatar.width = "36";
    userAvatar.height = "36";
    userAvatar.style.objectFit = "cover";
    header.append(userAvatar);
  } else {
    const userAvatar = document.createElement("img");
    userAvatar.classList.add("rounded-circle");
    userAvatar.src = avatarHolder;
    userAvatar.alt = name;
    userAvatar.width = "36";
    userAvatar.height = "36";
    header.append(userAvatar);
  }
}