let todos = [];

const $signinId = document.querySelector('.signin-id-input');
const $popupWindow = document.querySelector('.popup-window');
const $signIn = document.querySelector('.sign-in');
const $signinPopup = document.querySelector('.signin-popup.hidden');

$signinId.onkeyup = () => {
  console.log(1);
};

const $popupClose = document.querySelector('.popup-close');

// $popupClose.onclick = () => {
//   $signinPopup.classList.remove('display');
// };

$signIn.onclick = () => {
  $signinPopup.classList.toggle('hidden', false);
};

$signinPopup.onclick = () => {
  console.log(1);
};
