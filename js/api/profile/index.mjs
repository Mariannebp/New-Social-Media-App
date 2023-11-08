import { load } from "../../storage/index.mjs";

export function getProfile() {
  const userName = document.querySelector("#userName");
  const userEmail = document.querySelector("#userEmail");
  const userAvatar = document.querySelector("#userAvatar");
  
  const userInfo = load("profile");
  const { name, email, avatar } = userInfo;

  userName.innerHTML = name;
  userEmail.innerHTML = email;

  if (avatar) {
    const img = document.createElement("img");
    img.classList.add("d-flex", "align-items-center", "m-auto", "w-50")
    img.src = avatar;
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