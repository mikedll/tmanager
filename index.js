// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`);
};

document.addEventListener('DOMContentLoaded', () => {

  console.log("Loaded app.");

});
