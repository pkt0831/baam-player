const $signIn = document.querySelector('.sign-in');
const $signinPopup = document.querySelector('.signin-popup.hidden');
const $popupClose = document.querySelector('.popup-close');
const $signUp = document.querySelector('.sign-up');
const $signupPopup = document.querySelector('.signup-popup.hidden');
const $signupClose = document.querySelector('.signup-popup-close');
const $signinIdInput = document.querySelector('.signin-id-input');
const $signInError = document.querySelector('.signin-error');
const $signInErrorPw = document.querySelector('.signin-errorpw');
const $signPwInput = document.querySelector('.signin-password-input');

// SignIn Popup On,Close

$popupClose.addEventListener('click', function () {
  $signinPopup.classList.add('hidden');
  $signInError.innerText = '';
  $signinIdInput.value = '';
});

$signIn.addEventListener('click', function () {
  $signinPopup.classList.remove('hidden');
  // $signInError.innerText = '';
  // $signinIdInput.value = '';
  // $signPwInput.value = '';
});

// SignIn PopUp.
$signinIdInput.addEventListener('focusout', function () {
  const regexrid = /^[a-zA-Z0-9]{4,15}$/;
  if (!regexrid.test($signinIdInput.value)) {
    $signInError.innerText = '영문과 숫자의 조합으로만 가능합니다.';
    return false;
  }

  $signInError.innerText = '';
  return true;
});

$signPwInput.addEventListener('focusout', function () {
  const regexrpw = /^[A-Za-z0-9]{6,15}$/;
  if (!regexrpw.test($signPwInput.value)) {
    $signInErrorPw.innerText = '6자리 이상으로만 가능합니다.';
    return false;
  }
  return true;
});

// SignUp Popup On,Close
$signUp.addEventListener('click', function () {
  $signupPopup.classList.remove('hidden');
});

$signupClose.addEventListener('click', function () {
  $signupPopup.classList.add('hidden');
});
