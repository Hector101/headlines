
let localStorage = {};
export default {
  setItem(key, value) {
    Object.assign(localStorage, { [key]: value });
  },
  getItem(key) {
    return localStorage[key];
  },
  removeItem(key) {
    delete localStorage[key];
  },
  clear() {
    localStorage = {};
  },
};
