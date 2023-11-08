import { load } from "../storage/index.mjs";

/**
 * Setting headers
 */
export function headers() {
  const token = load("token");

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
}

/**
 * Authorized fetch to be used in create, get, remove and update
 * @param {string} url 
 * @param {string} options 
 */
export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers()
  })
}