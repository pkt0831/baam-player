import * as player from "./player.js";
import * as playListCon from "./addPlayList.js";
import * as musicList from './musicList.js';
import * as search from './search.js';

const $playBtn = document.querySelector('.player-play');
const $prevBtn = document.querySelector('.player-prev');
const $nextBtn = document.querySelector('.player-next');
const $musicPlayer = document.querySelector('.musicPlayer');
const $progOuter = document.querySelector('.play-bar-outer');
const $progGetevent = document.querySelector('.play-bar-getevent');
const $shuffleBtn = document.querySelector('.player-shuffle');
const $playList = document.querySelector('.play-list');
const $soundGetevent = document.querySelector('.sound-bar-getevent');
const $soundBtn = document.querySelector('.player-sound');
const $soundPopup = document.querySelector('.sound-popup');
const $albumList = document.querySelector('.music-list');
const $favoriteList = document.querySelector('.favorite-list');
const $inputSearch = document.querySelector('.input-search');
const $btnSearch = document.querySelector('.search-btn');

// localstorage
const myStorage = window.localStorage;

const login = async (id, password) => {
  let user = await axios.post('/login', { id, password });
  user = user.data;
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

// 수정해야함
window.onload = async () => {
  login('ysungkoon', '111111');
  // init
  logout();
  player.setMusic();
  player.listRender();
  musicList.render();
};

$playBtn.addEventListener('click', () => {
  player.setPlayStatus(player.isPlaying());
});

$prevBtn.addEventListener('click', player.playPrev);

$nextBtn.addEventListener('click', player.playNext);

$playList.addEventListener('click', (e) => {
  if (e.target.matches('.list-remove, .list-down, .list-up')) return;
  const index = e.target.matches('li') ? +e.target.id.replace('pl-', '') : +e.target.parentNode.id.replace('pl-', '');

  myStorage.setItem('playListType', 'playList');
  player.playSelectedList(e, index);
});


// shuffle
$shuffleBtn.addEventListener('click', player.setShuffleStatus);


// play finish -> play next
$musicPlayer.addEventListener('ended', player.playNext);


// progressbar
$musicPlayer.addEventListener('timeupdate', player.setProgToRuntime);

$progOuter.addEventListener('click', player.setRuntimeToProg);

$progGetevent.addEventListener('mousedown', (e) => {
  document.addEventListener('mousemove', player.setRuntimeToProg);
});

document.addEventListener('mouseup', () => {
  document.removeEventListener('mousemove', player.setRuntimeToProg);
});


// sound
$soundBtn.addEventListener('click', () => $soundPopup.classList.toggle('hidden'));

$soundGetevent.addEventListener('click', player.setVolume);

$soundGetevent.addEventListener('mousedown', (e) => {
  document.addEventListener('mousemove', player.setVolume);
});

document.addEventListener('mouseup', () => {
  document.removeEventListener('mousemove', player.setVolume);
});

// playlist
$playList.addEventListener('click', player.listUpDown.playListUpDown);

$playList.addEventListener('click', player.deleteList);

// favorite
$favoriteList.addEventListener('click', player.listUpDown.favoriteListUpDown);
$favoriteList.addEventListener('click', (e) => {
  if (e.target.matches('.list-remove, .list-down, .list-up')) return;
  const index = e.target.matches('li') ? +e.target.id.replace('pl-', '') : +e.target.parentNode.id.replace('pl-', '');

  myStorage.setItem('playListType', 'favorite');
  player.playSelectedList(e, index);
});
$favoriteList.addEventListener('click', player.deleteList);


// album list
$albumList.addEventListener('click', playListCon.addPlayList);

// search
$inputSearch.addEventListener('keyup', e => {
  if (e.keyCode !== 13 || !$inputSearch.value) return;
  search.getMusicListForSearch($inputSearch.value);
  $inputSearch.value = '';
});

$btnSearch.addEventListener('click', () => {
  if (!$inputSearch.value) return;
  search.getMusicListForSearch($inputSearch.value);
  $inputSearch.value = '';
});
