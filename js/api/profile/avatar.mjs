import { load } from "../../storage/index.mjs";

/**
 * Sets profile avatar in header if user have registered one
 */
export function setAvatarHeader() {
  const header = document.querySelector("#headerAvatar");
  const profile = load("profile");
  const { avatar, name } = profile;
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