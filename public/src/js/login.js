const myStorage = window.localStorage;
// signIn,signUp On,Close
const $signIn = document.querySelector('.sign-in');
const $signinPopup = document.querySelector('.signin-popup');
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
// const $signInBtn = document.querySelector('.signin-signin-btn');
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

// User Info On,Close Function
const UserInfoOn = () => {
  $userinfoPopUp.classList.remove('hidden');
  $signinPopup.classList.add('hidden');
  $signupPopup.classList.add('hidden');
};
const UserInfoClose = () => {
  $userinfoPopUp.classList.add('hidden');
};
// User Info On,Close
$userInfo.addEventListener('click', function () {
  UserInfoOn();
});
$userinfoPopUpClose.addEventListener('click', function () {
  UserInfoClose();
});

// User Info function
const UserInfoSignBtn = () => {
  $userinfoPopUp.classList.add('hidden');
  $signinPopup.classList.remove('hidden');
  $signInError.textContent = '';
  $signinIdInput.value = '';
  $signPwInput.value = '';
  $signInErrorPw.textContent = '';
};
const UserinfoBtnSignup = () => {
  $userinfoPopUp.classList.add('hidden');
  $signupPopup.classList.remove('hidden');
  $signUpIdInput.value = '';
  $signUpPwInput.value = '';
  $signUpError.textContent = '';
  $signUpErrorPw.textContent = '';
  $signUpErrorPwRe.textContent = '';
  $signUpErrorName.textContent = '';
  $signUpErrorEmail.textContent = '';
};
// User Info
$userinfoSigninBtn.addEventListener('click', function () {
  UserInfoSignBtn();
});
$userinfoSignUpBtn.addEventListener('click', function () {
  UserinfoBtnSignup();
});


// SignIn Popup On,Close Functinon
const closePopup = () => {
  $signinPopup.classList.add('hidden');
  $signInError.textContent = '';
  $signinIdInput.value = '';
  $signinIdInput.style.border = '1px solid #70707093';
  $signPwInput.style.border = '1px solid #70707093';
};

const signInClick = () => {
  $signinPopup.classList.remove('hidden');
  $signupPopup.classList.add('hidden'); // signInUpPopUP 중복 방지.
  $userinfoPopUp.classList.add('hidden'); // userPopUp 중복 방지.
  $signInError.textContent = '';
  $signinIdInput.value = '';
  $signPwInput.value = '';
  $signInErrorPw.textContent = '';
};
const BtnsignInSignUp = () => {
  $signupPopup.classList.remove('hidden');
  $signinPopup.classList.add('hidden');
  $signUpError.textContent = '';
  $signUpErrorPw.textContent = '';
  $signUpErrorPwRe.textContent = '';
  $signUpErrorName.textContent = '';
  $signUpErrorEmail.textContent = '';
};

// SignIn Popup On,Close

$popupClose.addEventListener('click', function () {
  closePopup();
});

$signIn.addEventListener('click', function () {
  signInClick();
});

$signInSignUpBtn.addEventListener('click', function () {
  BtnsignInSignUp();
});
// SignIn PopUp Function
const signInKeyDown = () => {
  const regexrid = /^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){4,}$/;
  if (!regexrid.test($signinIdInput.value)) {
    $signinIdInput.style.border = '1px solid red';
    $signInError.textContent = '영문,영문과 숫자의 조합으로만 가능합니다.';
  } else {
    $signinIdInput.style.border = '1px solid green';
    $signInError.textContent = '';
  }
};
const inputSignPw = () => {
  const regexrpw = /^[A-Za-z0-9]{0,15}$/;
  if (!regexrpw.test($signPwInput.value)) {
    $signPwInput.style.border = '1px solid red';
    $signInErrorPw.textContent = '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.';
  } else {
    $signPwInput.style.border = '1px solid green';
    $signInErrorPw.textContent = '';
  }
};
// const signInBtnClick = () => {
// };

// SignIn PopUp
$signinIdInput.addEventListener('keydown', function () {
  signInKeyDown();
});

$signPwInput.addEventListener('keydown', function () {
  inputSignPw();
});
// $signInBtn.addEventListener('click', function () {
//   signInBtnClick();
// });
// SignUp Popup On,Close Function
const signUpClick = () => {
  $signupPopup.classList.remove('hidden');
  $signinPopup.classList.add('hidden'); // signIn PopUP 중복 방지.
  $userinfoPopUp.classList.add('hidden'); // userinfo PopUp 중복 방지.
  $signUpIdInput.value = '';
  $signUpPwInput.value = '';
  $signUpError.textContent = '';
  $signUpErrorPw.textContent = '';
  $signUpErrorPwRe.textContent = '';
  $signUpErrorName.textContent = '';
  $signUpErrorEmail.textContent = '';
};
const closeSignUp = () => {
  $signupPopup.classList.add('hidden');
  $signUpError.textContent = '';
  $signUpErrorPw.textContent = '';
  $signUpErrorPwRe.textContent = '';
  $signUpErrorName.textContent = '';
  $signUpErrorEmail.textContent = '';
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
};

// SignUp Popup On,Close
$signUp.addEventListener('click', function () {
  signUpClick();
});

$signupClose.addEventListener('click', function () {
  closeSignUp();
});
// SignUp PopUp Function
const signupStatus = [false, false, false, false, false];

const completedSignUp = () => {
  const signupHover = signupStatus.every(item => item);
  if (!signupHover) return;
  $signupBtn.disabled = false;
};

const signUpInputKeyUp = () => {
  const regexr = /^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){4,}$/;
  if (!regexr.test($signUpIdInput.value)) {
    $signUpIdInput.style.border = '1px solid red';
    $signUpError.textContent = '영문,영문과 숫자의 조합으로만 가능합니다.';
    signupStatus[0] = false;
  } else {
    $signUpIdInput.style.border = '1px solid green';
    $signUpError.textContent = '';
    signupStatus[0] = true;
    completedSignUp();
  }
};

const signUpPwInputKeyUp = () => {
  const regexr = /^[A-Za-z0-9]{6,15}$/;
  if (!regexr.test($signUpPwInput.value)) {
    $signUpPwInput.style.border = '1px solid red';
    $signUpErrorPw.textContent = '6자리 이상으로만 가능합니다';
    signupStatus[1] = false;
  } else {
    $signUpPwInput.style.border = '1px solid green';
    $signUpErrorPw.textContent = '';
    signupStatus[1] = true;
    completedSignUp();
  }
};
const signUpPwInputReKeyUp = () => {
  if ($signUpPwInput.value !== $signUpPwInputRe.value) {
    $signUpPwInputRe.style.border = '1px solid red';
    signupStatus[2] = false;
  }
  if ($signUpPwInput.value === $signUpPwInputRe.value) {
    $signUpPwInputRe.style.border = '1px solid green';
    $signUpErrorPwRe.textContent = '';
    signupStatus[2] = true;
    completedSignUp();
  }
};
const signupNameInputKeyUp = () => {
  const regexr = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
  if (!regexr.test($signupNameInput.value)) {
    $signupNameInput.style.border = '1px solid red';
    $signUpErrorName.textContent = '이름을 입력하세요';
    signupStatus[3] = false;
  } else {
    $signupNameInput.style.border = '1px solid green';
    $signUpErrorName.textContent = '';
    signupStatus[3] = true;
    completedSignUp();
  }
};
const signUpMailInputKeyUp = () => {
  const regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  if (!regexr.test($signUpMailInput.value)) {
    $signUpMailInput.style.border = '1px solid red';
    $signUpErrorEmail.textContent = 'E-mail 형식에 맞게 입력해 주세요';
    signupStatus[4] = false;
  } else {
    $signUpMailInput.style.border = '1px solid green';
    $signUpErrorEmail.textContent = '';
    signupStatus[4] = true;
    completedSignUp();
  }
};
const signupBtnClick = () => {
  $signupPopup.classList.add('hidden');
};
// SignUp PopUp

$signUpIdInput.addEventListener('keyup', function () {
  signUpInputKeyUp();
});

$signUpPwInput.addEventListener('keyup', function () {
  signUpPwInputKeyUp();
});

$signUpPwInputRe.addEventListener('keyup', function () {
  signUpPwInputReKeyUp();
});

$signupNameInput.addEventListener('keyup', function () {
  signupNameInputKeyUp();
});

$signUpMailInput.addEventListener('keyup', function () {
  signUpMailInputKeyUp();
});
$signupBtn.addEventListener('click', function () {
  signupBtnClick();
});

// PremiumPopUp
const premiumPop = () => {
  if (myStorage.getItem('id') === 'guest') {
    $nomalUserPop.classList.add('hidden');
  } else if (JSON.parse(myStorage.getItem('premium'))) {
    $nomalUserPop.classList.remove('hidden');
  } else {
    $nomalUserPop.classList.add('hidden');
  }
};
//   } else if (JSON.parse(myStorage.getItem('premium') === false))) {
//   }
//   else {
//     $nomalUserPop.classList.add('hidden');
//   }
// };

  // {premiumPop,UserInfoOn,UserInfoClose,UserInfoSignBtn,UserinfoBtnSignup,closePopup,signInClick,BtnsignInSignUp
  // signInKeyDown,inputSignPw,signUpClick,closeSignUp,completedSignUp,signUpInputKeyUp,signUpPwInputKeyUp,signUpPwInputReKeyUp
  // signupNameInputKeyUp};


export { premiumPop };
