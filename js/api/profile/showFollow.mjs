/**
 * Displays the user the logged in profile are following, with link to their profile page
 * @param {*} following - gets the data
 */
export function showFollowing(following) {
  const followingContainer = document.querySelector("#following");

  if (following && following.length) {

    following.forEach(i => {
      const followingUser = document.createElement("div");
      followingUser.classList.add("m-3");

      const followingUserLink = document.createElement("a");
      followingUserLink.classList.add("btn", "d-flex", "flex-column", "align-items-center", "p-0");
      followingUserLink.setAttribute("href", `/pages/profile.html?name=${i.name}`);

      if (i.avatar && i.avatar.length) {
        const userAvatar = document.createElement("img");
        userAvatar.classList.add("d-flex", "justify-items-start", "rounded-circle")
        userAvatar.src = i.avatar;
        userAvatar.alt = "Avatar";
        userAvatar.height = "40";
        userAvatar.width = "40";
        userAvatar.style.objectFit = "cover";

        const userName = document.createElement("p");
        userName.classList.add("mb-1", "text-secondary");
        userName.innerHTML = i.name;

        followingUserLink.append(userAvatar, userName);
      } else {
        const userAvatar = document.createElement("img");
        userAvatar.classList.add("d-flex", "justify-items-start", "rounded-circle")
        userAvatar.src = "/assets/img/avatar-1606939.png";
        userAvatar.alt = "Avatar";
        userAvatar.height = "40";
        userAvatar.width = "40";
        userAvatar.style.objectFit = "cover";

        const userName = document.createElement("p");
        userName.classList.add("mb-1", "text-secondary");
        userName.innerHTML = i.name;

        followingUserLink.append(userAvatar, userName);
      }

      followingUser.append(followingUserLink);
      followingContainer.append(followingUser)

    })

  } else {
    const noFollowing = document.createElement("p");
    noFollowing.classList.add("ms-2", "mb-1", "fst-italic");
    noFollowing.innerHTML = "Not following anyone yet";

    followingContainer.append(noFollowing)
  }
}


/**
 * Displays the logged in users followers, with link to their profile page
 * @param {*} followers - gets the data
 */
export function showFollowers(followers) {
  const followersContainer = document.querySelector("#followers");

  if (followers && followers.length) {

    followers.forEach(i => {
      const followersUser = document.createElement("div");
      followersUser.classList.add("m-3");

      const followersUserLink = document.createElement("a");
      followersUserLink.classList.add("btn", "d-flex", "flex-column", "align-items-center", "p-0");
      followersUserLink.setAttribute("href", `/pages/profile.html?name=${i.name}`);

      if (i.avatar && i.avatar.length) {
        const userAvatar = document.createElement("img");
        userAvatar.classList.add("d-flex", "justify-items-start", "rounded-circle")
        userAvatar.src = i.avatar;
        userAvatar.alt = "Avatar";
        userAvatar.height = "40";
        userAvatar.width = "40";
        userAvatar.style.objectFit = "cover";

        const userName = document.createElement("p");
        userName.classList.add("mb-1", "text-secondary");
        userName.innerHTML = i.name;

        followersUserLink.append(userAvatar, userName);
      } else {
        const userAvatar = document.createElement("img");
        userAvatar.classList.add("d-flex", "justify-items-start", "rounded-circle")
        userAvatar.src = "/assets/img/avatar-1606939.png";
        userAvatar.alt = "Avatar";
        userAvatar.height = "40";
        userAvatar.width = "40";
        userAvatar.style.objectFit = "cover";

        const userName = document.createElement("p");
        userName.classList.add("mb-1", "text-secondary");
        userName.innerHTML = i.name;

        followersUserLink.append(userAvatar, userName);
      }

      followersUser.append(followersUserLink);
      followersContainer.append(followersUser)

    })

  } else {
    const noFollowers = document.createElement("p");
    noFollowers.classList.add("ms-2", "mb-1", "fst-italic");
    noFollowers.innerHTML = "Not following anyone yet";

    followersContainer.append(noFollowers)
  }
}