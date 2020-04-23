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

};


const login = async (id, password) => {
  let { data } = await axios.post('/login', { id, password });
  // let user = data;
  if (data) {
    console.log(data);
    myStorage.setItem('id', data.id);
    myStorage.setItem('name', data.name);
    myStorage.setItem('premium', data.premium);
    myStorage.setItem('playListType', 'playList');

    player.setPlayList.fromServer(id);
    player.setMusic();
    player.listRender();
  } else {
    console.log('unmatching!', data);
  }
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
