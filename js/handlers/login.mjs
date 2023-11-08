import { login } from "../api/auth/login.mjs";

/**
 * A listener for when users a logging in
 */
export function setLoginUserFormListener() {
  const form = document.querySelector("#loginUserForm");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
    
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());
      
      login(profile)    
    }) 
  } 
}

