// signIn,signUp On,Close
const $signIn = document.querySelector('.sign-in');
const $signinPopup = document.querySelector('.signin-popup.hidden');
const $popupClose = document.querySelector('.popup-close');
const $signUp = document.querySelector('.sign-up');
const $signupPopup = document.querySelector('.signup-popup.hidden');
const $signupClose = document.querySelector('.signup-popup-close');
// signIn
const $signinIdInput = document.querySelector('.signin-id-input');
const $signInError = document.querySelector('.signin-error');
const $signInErrorPw = document.querySelector('.signin-errorpw');
const $signPwInput = document.querySelector('.signin-password-input');
// signUp
const $signUpError = document.querySelector('.signup-error');
const $signUpErrorPw = document.querySelector('.signup-errorpw');
const $signUpErrorPwRe = document.querySelector('.signup-errorpwre');
const $signUpErrorName = document.querySelector('.signup-errorname');
const $signUpErrorEmail = document.querySelector('.signup-erroremail');
const $signUpIdInput = document.querySelector('.signup-id-input');
const $signUpPwInput = document.querySelector('.signup-password-input');
const $signUpPwInputRe = document.querySelector('.signup-password-re-input');
const $signupNameInput = document.querySelector('.signup-name-input');
const $signUpMailInput = document.querySelector('.signup-email-input');
// userInfo
const $userInfo = document.querySelector('.user-info');
const $userinfoPopUp = document.querySelector('.userinfo-popup');
const $userinfoPopUpClose = document.querySelector('.userinfo-popup-close');
const $userinfoSigninBtn = document.querySelector('.userinfo-signin-btn');
const $userinfoSignUpBtn = document.querySelector('.userinfo-signup-btn');
const $signupBtn = document.querySelector('.signup-signup-btn');
const $signupInput = document.querySelectorAll('.signup-popup > div > input');


// User Info On,Close
$userInfo.addEventListener('click', function () {
  $userinfoPopUp.classList.remove('hidden');
});
$userinfoPopUpClose.addEventListener('click', function () {
  $userinfoPopUp.classList.add('hidden');
});
// User Info
$userinfoSigninBtn.addEventListener('click', function () {
  $userinfoPopUp.classList.add('hidden');
  $signinPopup.classList.remove('hidden');
  $signInError.innerText = '';
  $signinIdInput.value = '';
  $signPwInput.value = '';
  $signInErrorPw.innerText = '';
});
$userinfoSignUpBtn.addEventListener('click', function () {
  $userinfoPopUp.classList.add('hidden');
  $signupPopup.classList.remove('hidden');
  $signUpIdInput.value = '';
  $signUpPwInput.value = '';
  $signUpError.innerText = '';
  $signUpErrorPw.innerText = '';
  $signUpErrorPwRe.innerText = '';
  $signUpErrorName.innerText = '';
  $signUpErrorEmail.innerText = '';
});


// SignIn Popup On,Close

$popupClose.addEventListener('click', function () {
  $signinPopup.classList.add('hidden');
  $signInError.innerText = '';
  $signinIdInput.value = '';
});

$signIn.addEventListener('click', function () {
  $signinPopup.classList.remove('hidden');
  $signupPopup.classList.add('hidden'); // signInUpPopUP 중복 방지.
  $signInError.innerText = '';
  $signinIdInput.value = '';
  $signPwInput.value = '';
  $signInErrorPw.innerText = '';
});


// SignIn PopUp
$signinIdInput.addEventListener('keydown', function () {
  const regexrid = /^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){4,}$/;
  if (!regexrid.test($signinIdInput.value)) {
    $signInError.innerText = '영문,영문과 숫자의 조합으로만 가능합니다.';
    return false;
  }
  $signInError.innerText = '';
  return true;
});

$signPwInput.addEventListener('keydown', function () {
  const regexrpw = /^[A-Za-z0-9]{5,15}$/;
  if (!regexrpw.test($signPwInput.value)) {
    $signInErrorPw.innerText = '6자리 이상으로만 가능합니다.';
    return false;
  }
  $signInErrorPw.innerText = '';
  return true;
});

// SignUp Popup On,Close
$signUp.addEventListener('click', function () {
  $signupPopup.classList.remove('hidden');
  $signinPopup.classList.add('hidden'); // signIn PopUP 중복 방지.
  $signUpIdInput.value = '';
  $signUpPwInput.value = '';
  $signUpError.innerText = '';
  $signUpErrorPw.innerText = '';
  $signUpErrorPwRe.innerText = '';
  $signUpErrorName.innerText = '';
  $signUpErrorEmail.innerText = '';
});

$signupClose.addEventListener('click', function () {
  $signupPopup.classList.add('hidden');
  $signUpError.innerText = '';
  $signUpErrorPw.innerText = '';
  $signUpErrorPwRe.innerText = '';
  $signUpErrorName.innerText = '';
  $signUpErrorEmail.innerText = '';
  $signUpIdInput.value = '';
  $signUpPwInput.value = '';
  $signUpPwInputRe.value = '';
  $signupNameInput.value = '';
  $signUpMailInput.value = '';
});

// SignUp PopUp
$signUpIdInput.addEventListener('keyup', function () {
  const regexr = /^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){4,}$/;
  if (!regexr.test($signUpIdInput.value)) {
    $signUpError.innerText = '영문,영문과 숫자의 조합으로만 가능합니다.';
    return false;
  }
  $signUpError.innerText = '';
  return true;
});

$signUpPwInput.addEventListener('keyup', function () {
  const regexr = /^[A-Za-z0-9]{6,15}$/;
  if (!regexr.test($signUpPwInput.value)) {
    $signUpErrorPw.innerText = '6자리 이상으로만 가능합니다';
    return false;
  }
  $signUpErrorPw.innerText = '';
  return true;
});

$signUpPwInputRe.addEventListener('keyup', function () {
  if ($signUpPwInput.value !== $signUpPwInputRe.value) {
    $signUpErrorPwRe.innerText = '비밀번호를 다시 입력해 주세요, 비밀번호가 일치하지 않습니다';
  }
  if ($signUpPwInput.value === $signUpPwInputRe.value) {
    $signUpErrorPwRe.innerText = '';
  }
  return true;
});


$signupNameInput.addEventListener('keyup', function () {
  const regexr = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
  if (!regexr.test($signupNameInput.value)) {
    $signUpErrorName.innerText = '이름을 입력하세요';
    return false;
  }
  $signUpErrorName.innerText = '';
  return true;
});

$signUpMailInput.addEventListener('keyup', function () {
  const regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  if (!regexr.test($signUpMailInput.value)) {
    $signUpErrorEmail.innerText = 'E-mail 형식에 맞게 입력해 주세요';
    return false;
  }
  // $signupBtn.disabled = false;
  $signUpErrorEmail.innerText = '';
  return true;
});

// const signinputhover = () => {
//   if ([...$signupInput].forEach(input => input.value === regexr.value)) {
//     input.disabled = false;
//   }
// };
// [...$signupInput].forEach(input => {
//   if (regexr.test() === input.value) {
//     $signupBtn.disabled = false;
//   }
// });
