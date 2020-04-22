import * as player from "./player.js";
import * as addPlayList from "./addPlayList.js";
import * as musicList from './musicList.js';

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

// localstorage
const myStorage = window.localStorage;

const login = async (id, password) => {
  let user = await axios.post('/login', { id, password });
  user = user.data;
  myStorage.setItem('id', user.id);
  myStorage.setItem('name', user.name);
  myStorage.setItem('premium', user.premium);

  player.setPlayList.fromServer(id);
  player.setMusic();
  player.listRender();
};

const setGuestMode = () => {
  myStorage.setItem('id', 'guest');
  myStorage.setItem('name', 'Guest');
  myStorage.setItem('premium', false);
  myStorage.setItem('playList', '[]');
};

// 수정해야함
window.onload = async () => {
  // login('ysungkoon', '111111');
  setGuestMode();
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

  player.playSelectedList(index);
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
$playList.addEventListener('click', player.listDown);

$playList.addEventListener('click', player.listUp);

$playList.addEventListener('click', player.deleteList);


// album list
$albumList.addEventListener('click', addPlayList.addPlayList);
