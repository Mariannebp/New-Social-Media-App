/**
 * Save logged in users information to localstorage
 * @param {string} key - description
 * @param {object, string} value - values
 */
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Loads the logged in users information from localstorage
 * @param {string} key - description
 * @param {object, string} value - values
 */
export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value)
} catch {
  return null
}}

/**
 * Removes the logged in users information from localstorage
 * @param {string} key - description
 * @param {object, string} value - values
 */
export function remove(key) {
  localStorage.removeItem(key)
}