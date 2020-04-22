import * as player from "./player.js";


const $signinIdInput = document.querySelector('.signin-id-input');
const $signinPasswordInput = document.querySelector('.signin-password-input');
const $signinSigninBtn = document.querySelector('.signin-signin-btn');
const $signOut = document.querySelector('.sign-out');
const $userId = document.querySelector('.user-id');
const $userName = document.querySelector('.user-name');
const $userGrade = document.querySelector('.user-grade');
const $userEmail = document.querySelector('.user-email');


// localstorage
const myStorage = window.localStorage;


const setUserInfo = () => {
  $userId.textContent = myStorage.getItem('id');
  $userName.textContent = myStorage.getItem('id');
  $userGrade.textContent = myStorage.getItem('id');
  $userEmail.textContent = myStorage.getItem('id');
};


const login = async (id, password) => {
  let user = await axios.post('/login', { id, password });
  user = user.data;
  console.log(user);
  myStorage.setItem('id', user.id);
  myStorage.setItem('name', user.name);
  myStorage.setItem('premium', user.premium);
  myStorage.setItem('playListType', 'playList');

  player.setPlayList.fromServer(id);
  player.setMusic();
  player.listRender();
};

const logout = () => {
  if (myStorage.getItem('id') === 'guest') return;

  myStorage.setItem('id', 'guest');
  myStorage.setItem('name', 'Guest');
  myStorage.setItem('premium', false);
  myStorage.setItem('playList', '[]');
  myStorage.setItem('playListType', 'playList');

  player.setMusic();
  player.listRender();
};


$signinSigninBtn.addEventListener('click', () => {
  const id = $signinIdInput.value;
  const password = $signinPasswordInput.value;
  login(id, password);
  console.log(myStorage.getItem('id'));
});


$signOut.addEventListener('click', () => {
  logout();
});
