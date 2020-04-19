let todos = [];

const $signinId = document.querySelector('.signin-id-input');
const $popupWindow = document.querySelector('.popup-window');
$signinId.onkeyup = () => {
  console.log(1);
};

const $popupClose = document.querySelector('.popup-close');

$popupClose.onclick = () => {
  console.log($popupWindow);
  $popupClose.classList.remove('popupWindow');
};
