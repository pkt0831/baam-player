import * as player from "./player.js";
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
const $listDownBtn = document.querySelector('.list-down');

let nowPlayList = [];

const id = 'ysungkoon';

// 수정해야함
window.onload = async () => {
  const { data } = await axios.post('/playlist', { id });
  nowPlayList = data;

  player.setPlaylist(nowPlayList);
  player.setMusic();
  player.listRender(nowPlayList);
  musicList.render();
};

$playBtn.addEventListener('click', () => {
  if (nowPlayList.length === 0) return;

  player.setPlaylist(nowPlayList);
  player.setPlayStatus(player.isPlaying());
});

$prevBtn.addEventListener('click', () => {
  if (nowPlayList.length === 0) return;

  player.setPlaylist(nowPlayList);
  player.playPrev();
});

$nextBtn.addEventListener('click', () => {
  if (nowPlayList.length === 0) return;

  player.setPlaylist(nowPlayList);
  player.playNext(nowPlayList);
});

$playList.addEventListener('click', (e) => {
  if (e.target.matches('.list-remove, .list-down, .list-up')) return;
  const id = e.target.matches('li') ? +e.target.id.replace('pl-', '') : +e.target.parentNode.id.replace('pl-', '');

  player.playSelectedList(id);
});

// shffle
$shuffleBtn.addEventListener('click', player.setShuffleStatus);


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

// list
$playList.addEventListener('click', (e) => {
  player.listDown(e, id);
});

$playList.addEventListener('click', (e) => {
  player.listUp(e, id);
});

$playList.addEventListener('click', (e) => {
  player.deleteList(e, id);
});
