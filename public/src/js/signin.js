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
const $userinfoPrisignoutBtn = document.querySelector('.userinfo-prisignout-btn');

const $musicPlayer = document.querySelector('.musicPlayer');
const $playBtn = document.querySelector('.player-play');

const $favoriteListAll = document.querySelector('.favorite-list-all');

const $nomalIcon = document.querySelector('.normal-icon');
const $premiumIcon = document.querySelector('.premium-icon');


// localstorage
const myStorage = window.localStorage;


const setUserImage = () => {
  [...$userInnerImgs].forEach(img => {
    if (myStorage.id !== 'ysungkoon' || myStorage.id !== 'angryboo' || myStorage.id !== 'hozero' || myStorage.id !== 'pkt0831') {
      img.style = 'background-image: url(./css/user-img/guest.png)';
    } else {
      img.style = `background-image: url(./css/user-img/${myStorage.id}.png)`;
    }
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

  if (premium === 'true') {
    $nomalIcon.classList.add('hidden');
    $premiumIcon.classList.remove('hidden');
  } else {
    $nomalIcon.classList.remove('hidden');
    $premiumIcon.classList.add('hidden');
  }
};

const renderUserInfo = () => {
  $mainId.textContent = myStorage.getItem('id');
  $popId.textContent = myStorage.getItem('id');
  $userName.textContent = myStorage.getItem('name');
  $userGrade.textContent = myStorage.getItem('premium') === 'true' ? '프리미엄 회원' : '일반회원';
  $userEmail.textContent = myStorage.getItem('email');
  setUserInfo(myStorage.getItem('id'), myStorage.getItem('name'), myStorage.getItem('premium'), myStorage.getItem('email'));
  exchangeUserWindow();
  setUserImage();
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

      $playBtn.childNodes[0].classList.remove('fa-pause');
      $playBtn.childNodes[0].classList.add('fa-play');
      $musicPlayer.pause();
      $musicPlayer.currentTime = 0;

      await player.setPlayList.fromServer(id);
      player.setMusic();
      player.listRender();
      popSignCompleteWindow();
      renderUserInfo();
      // setUserImage(data.id);
      // player.setPlayStatus(PLAY_OFF);
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

  $playBtn.childNodes[0].classList.remove('fa-pause');
  $playBtn.childNodes[0].classList.add('fa-play');
  $musicPlayer.pause();
  $musicPlayer.currentTime = 0;

  player.setMusic();
  player.clearPlayList();
  player.clearFavorite();
  $favoriteListAll.classList.remove('active');

  renderUserInfo();
  setUserImage('guest');
  // player.setPlayStatus(PLAY_OFF);
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

$userinfoPrisignoutBtn.addEventListener('click', () => {
  popCheckSignout();
  interlock.UserInfoClose();
});

$signoutCancelBtn.addEventListener('click', () => {
  $signoutCheckPopup.classList.add('hidden');
});

export {
  renderUserInfo, setUserInfo, removeRejectText, logout
};
