const myStorage = window.localStorage;
// signIn,signUp On,Close
const $signIn = document.querySelector('.sign-in');
const $signinPopup = document.querySelector('.signin-popup.hidden');
const $popupClose = document.querySelector('.popup-close');
const $signUp = document.querySelector('.sign-up');
const $signupPopup = document.querySelector('.signup-popup');
const $signupClose = document.querySelector('.signup-popup-close');
const $signInSignUpBtn = document.querySelector('.signin-signup-btn');
// signIn
const $signinIdInput = document.querySelector('.signin-id-input');
const $signInError = document.querySelector('.signin-error');
const $signInErrorPw = document.querySelector('.signin-errorpw');
const $signPwInput = document.querySelector('.signin-password-input');
const $signInBtn = document.querySelector('.signin-signin-btn');
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
// nomal User Pop
const $nomalUserPop = document.querySelector('.nomal-user-pop');

// User Info On,Close
$userInfo.addEventListener('click', function () {
  $userinfoPopUp.classList.remove('hidden');
  $signinPopup.classList.add('hidden');
  $signupPopup.classList.add('hidden');
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
  $signinIdInput.style.border = '1px solid #70707093';
  $signPwInput.style.border = '1px solid #70707093';
});

$signIn.addEventListener('click', function () {
  $signinPopup.classList.remove('hidden');
  $signupPopup.classList.add('hidden'); // signInUpPopUP 중복 방지.
  $userinfoPopUp.classList.add('hidden'); // userPopUp 중복 방지.
  $signInError.innerText = '';
  $signinIdInput.value = '';
  $signPwInput.value = '';
  $signInErrorPw.innerText = '';
});

$signInSignUpBtn.addEventListener('click', function () {
  $signupPopup.classList.remove('hidden');
  $signinPopup.classList.add('hidden');
});

// SignIn PopUp
$signinIdInput.addEventListener('keydown', function () {
  const regexrid = /^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){4,}$/;
  if (!regexrid.test($signinIdInput.value)) {
    $signinIdInput.style.border = '1px solid red';
    $signInError.innerText = '영문,영문과 숫자의 조합으로만 가능합니다.';
  } else {
    $signinIdInput.style.border = '1px solid green';
    $signInError.innerText = '';
  }
});

$signPwInput.addEventListener('keydown', function () {
  const regexrpw = /^[A-Za-z0-9]{5,15}$/;
  if (!regexrpw.test($signPwInput.value)) {
    $signPwInput.style.border = '1px solid red';
    $signInErrorPw.innerText = '6자리 이상으로만 가능합니다.';
  } else {
    $signPwInput.style.border = '1px solid green';
    $signInErrorPw.innerText = '';
  }
});

// SignUp Popup On,Close
$signUp.addEventListener('click', function () {
  $signupPopup.classList.remove('hidden');
  $signinPopup.classList.add('hidden'); // signIn PopUP 중복 방지.
  $userinfoPopUp.classList.add('hidden'); // userinfo PopUp 중복 방지.
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
  $signUpIdInput.style.border = '1px solid #70707093';
  $signUpPwInput.style.border = '1px solid #70707093';
  $signUpPwInputRe.style.border = '1px solid #70707093';
  $signupNameInput.style.border = '1px solid #70707093';
  $signUpMailInput.style.border = '1px solid #70707093';
  $signupBtn.disabled = true;
});

// SignUp PopUp

const signupStatus = [false, false, false, false, false];

const completedSignUp = () => {
  const signupHover = signupStatus.every(item => item);
  console.log('completed', signupHover);
  if (!signupHover) return;
  $signupBtn.disabled = false;
};

$signUpIdInput.addEventListener('keyup', function () {
  const regexr = /^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){4,}$/;
  if (!regexr.test($signUpIdInput.value)) {
    $signUpIdInput.style.border = '1px solid red';
    $signUpError.innerText = '영문,영문과 숫자의 조합으로만 가능합니다.';
    signupStatus[0] = false;
  } else {
    $signUpIdInput.style.border = '1px solid green';
    $signUpError.innerText = '';
    signupStatus[0] = true;
    completedSignUp();
  }
});

$signUpPwInput.addEventListener('keyup', function () {
  const regexr = /^[A-Za-z0-9]{6,15}$/;
  if (!regexr.test($signUpPwInput.value)) {
    $signUpPwInput.style.border = '1px solid red';
    $signUpErrorPw.innerText = '6자리 이상으로만 가능합니다';
    signupStatus[1] = false;
  } else {
    $signUpPwInput.style.border = '1px solid green';
    $signUpErrorPw.innerText = '';
    signupStatus[1] = true;
    completedSignUp();
  }
});

$signUpPwInputRe.addEventListener('keyup', function () {
  if ($signUpPwInput.value !== $signUpPwInputRe.value) {
    $signUpPwInputRe.style.border = '1px solid red';
    $signUpErrorPwRe.innerText = '비밀번호를 다시 입력해 주세요, 비밀번호가 일치하지 않습니다';
    signupStatus[2] = false;
  }
  if ($signUpPwInput.value === $signUpPwInputRe.value) {
    $signUpPwInputRe.style.border = '1px solid green';
    $signUpErrorPwRe.innerText = '';
    signupStatus[2] = true;
    completedSignUp();
  }
});

$signupNameInput.addEventListener('keyup', function () {
  const regexr = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
  if (!regexr.test($signupNameInput.value)) {
    $signupNameInput.style.border = '1px solid red';
    $signUpErrorName.innerText = '이름을 입력하세요';
    signupStatus[3] = false;
  } else {
    $signupNameInput.style.border = '1px solid green';
    $signUpErrorName.innerText = '';
    signupStatus[3] = true;
    completedSignUp();
  }
});

$signUpMailInput.addEventListener('keyup', function () {
  const regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  if (!regexr.test($signUpMailInput.value)) {
    $signUpMailInput.style.border = '1px solid red';
    $signUpErrorEmail.innerText = 'E-mail 형식에 맞게 입력해 주세요';
    signupStatus[4] = false;
  } else {
    $signUpMailInput.style.border = '1px solid green';
    $signUpErrorEmail.innerText = '';
    signupStatus[4] = true;
    completedSignUp();
  }
});




  // const jsdjadjada = () => {
  //   myStorage.getItem('id');
  //   (JSON.parse(myStorage.getItem('premium'));
  //   console.log('id');
  // }
    // $nomalUserPop.classList.add('hidden');
