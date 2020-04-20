let todos = [];

const $signinId = document.querySelector('.signin-id-input');
const $popupWindow = document.querySelector('.popup-window');
const $signIn = document.querySelector('.sign-in');
const $signinPopup = document.querySelector('.signin-popup.hidden');
const $popupClose = document.querySelector('.popup-close');
const $signUp = document.querySelector('.sign-up');
const $signupPopup = document.querySelector('.signup-popup.hidden');
const $signupClose = document.querySelector('.signup-popup-close');
const $signinInput = document.querySelector('.signin-id-input');

$signinId.onkeyup = () => {
  // console.log(1);
};

$popupClose.onclick = () => {
  $signinPopup.classList.add('hidden');
};

$signIn.onclick = () => {
  $signinPopup.classList.remove('hidden');
};

$signinPopup.onclick = () => {
  // console.log(1);
};

$signUp.onclick = () => {
  $signupPopup.classList.remove('hidden');
};

$signupClose.onclick = () => {
  $signupPopup.classList.add('hidden');
};

$signinInput.onkeyup = () => {
  console.log(1);
};