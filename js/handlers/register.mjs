import { register } from "../api/auth/register.mjs";

/**
 * A listener for when new users register
 */
export function setRegisterUserFormListener() {
  const form = document.querySelector("#registerUserForm");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
    
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      register(profile)
    })
  }
  
}
