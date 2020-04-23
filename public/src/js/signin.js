import * as player from "./player.js";
import * as interlock from './login.js';


const $signinIdInput = document.querySelector('.signin-id-input');
const $signinPasswordInput = document.querySelector('.signin-password-input');
const $signinSigninBtn = document.querySelector('.signin-signin-btn');
const $signOut = document.querySelector('.sign-out');
const $mainId = document.querySelector('.id-main');
const $popId = document.querySelector('.id-pop');
const $userName = document.querySelector('.user-name');
const $userGrade = document.querySelector('.user-grade');
const $userEmail = document.querySelector('.user-email');
const $guestMenu = document.querySelector('.guest-menu');
const $userMenu = document.querySelector('.user-menu');
const $popupUserGuest = document.querySelector('.popup-user-guest');
const $popupUserNormal = document.querySelector('.popup-user-normal');
const $popupUserPreimium = document.querySelector('.popup-user-premium');
const $signinCompletePopup = document.querySelector('.signin-complete-popup');
const $signinCompleteBtn = document.querySelector('.signin-complete-btn');
// const $changeGradePopup = document.querySelector('.change-grade-popup');
// const $changeGradeBtn = document.querySelector('.change-grade-btn');
const $signinRejectText = document.querySelector('.signin-reject-text');
const $signoutCheckPopup = document.querySelector('.signout-check-popup');
const $signoutCheckBtn = document.querySelector('.signout-check-btn');
const $signoutCancelBtn = document.querySelector('.signout-cancel-btn');
const $userInnerImgs = document.querySelectorAll('.user-inner-img');

const $signinPopUp = document.querySelector('.signin-popup');
const $userinfoSignoutBtn = document.querySelector('.userinfo-signout-btn');


// localstorage
const myStorage = window.localStorage;


const setUserImage = fileName => {
  [...$userInnerImgs].forEach(img => {
    img.style = `background-image: url(./css/user-img/${fileName}.png)`;
  });
  // $userInnerImg.style = `background-image: url(./css/user-img/${fileName}.png)`;
};

const removeRejectText = () => {
  $signinRejectText.textContent = '';
};

const popSignRejectText = () => {
  $signinRejectText.textContent = '회원 정보를 확인해 주세요!';
};

const popSignCompleteWindow = () => {
  removeRejectText();
  $signinCompletePopup.classList.remove('hidden');
  $signinPopUp.classList.add('hidden');
};


const popCheckSignout = () => {
  $signoutCheckPopup.classList.remove('hidden');
};

const exchangeUserWindow = () => {
  if (myStorage.isuser === 'true' && myStorage.premium === 'true') {
    $guestMenu.classList.add('hidden');
    $userMenu.classList.remove('hidden');
    $popupUserGuest.classList.add('hidden');
    $popupUserNormal.classList.add('hidden');
    $popupUserPreimium.classList.remove('hidden');
  } else if (myStorage.isuser === 'true' && myStorage.premium === 'false') {
    $guestMenu.classList.add('hidden');
    $userMenu.classList.remove('hidden');
    $popupUserGuest.classList.add('hidden');
    $popupUserNormal.classList.remove('hidden');
    $popupUserPreimium.classList.add('hidden');
  } else {
    $guestMenu.classList.remove('hidden');
    $userMenu.classList.add('hidden');
    $popupUserGuest.classList.remove('hidden');
    $popupUserNormal.classList.add('hidden');
    $popupUserPreimium.classList.add('hidden');
  }
};

const setUserInfo = (id, name, premium, email) => {
  myStorage.setItem('id', id);
  myStorage.setItem('name', name);
  myStorage.setItem('premium', premium);
  myStorage.setItem('email', email);
};

const renderUserInfo = () => {
  $mainId.textContent = myStorage.getItem('id');
  $popId.textContent = myStorage.getItem('id');
  $userName.textContent = myStorage.getItem('name');
  $userGrade.textContent = myStorage.getItem('premium') === 'true' ? '프리미엄 회원' : '일반회원';
  $userEmail.textContent = myStorage.getItem('email');
  exchangeUserWindow();
};


const login = async (id, password) => {
  // eslint-disable-next-line no-undef
  const { data } = await axios.post('/login', { id, password });
  try {
    if (data) {
      myStorage.setItem('id', data.id);
      myStorage.setItem('name', data.name);
      myStorage.setItem('premium', data.premium);
      myStorage.setItem('playListType', 'playList');
      myStorage.setItem('email', data.email);
      myStorage.setItem('isuser', true);

      await player.setPlayList.fromServer(id);
      player.setMusic();
      player.listRender();
      popSignCompleteWindow();
      renderUserInfo();
      setUserImage(data.id);
    } else {
      // popup 추가할것
      popSignRejectText();
    }
  } catch (e) {
    console.error(e);
  }
};


const logout = () => {
  if (myStorage.getItem('id') === 'guest') return;

  myStorage.setItem('id', 'guest');
  myStorage.setItem('name', 'Guest');
  myStorage.setItem('premium', false);
  myStorage.setItem('playList', JSON.stringify([]));
  myStorage.setItem('playListType', 'playList');
  myStorage.setItem('isuser', false);
  myStorage.setItem('email', 'call@gmail.com');

  player.setMusic();
  player.clearPlayList();

  renderUserInfo();
  setUserImage('guest');
};


$signinSigninBtn.addEventListener('click', () => {
  const id = $signinIdInput.value;
  const password = $signinPasswordInput.value;
  login(id, password);
});


$signOut.addEventListener('click', () => {
  popCheckSignout();
});

$signinCompleteBtn.addEventListener('click', () => {
  $signinCompletePopup.classList.add('hidden');
});

$signoutCheckBtn.addEventListener('click', () => {
  logout();
  $signoutCheckPopup.classList.add('hidden');
});

$userinfoSignoutBtn.addEventListener('click', () => {
  popCheckSignout();
  interlock.UserInfoClose();
});

$signoutCancelBtn.addEventListener('click', () => {
  $signoutCheckPopup.classList.add('hidden');
});


export {
  renderUserInfo, setUserInfo, removeRejectText
};
