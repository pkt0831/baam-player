import * as player from "./player.js";

const $playBtn = document.querySelector('.player-play');
const $prevBtn = document.querySelector('.player-prev');
const $nextBtn = document.querySelector('.player-next');
const $musicPlayer = document.querySelector('.musicPlayer');
const $progOuter = document.querySelector('.play-bar-outer');
const $progGetevent = document.querySelector('.play-bar-getevent');
const $shuffleBtn = document.querySelector('.player-shuffle');
const $playList = document.querySelector('.play-list');


let nowPlayList = [];

// 수정해야함
window.onload = async () => {
  const id = 'ysungkoon';

  const { data } = await axios.post('/playlist', { id });
  nowPlayList = data;

  player.setPlaylist(nowPlayList);
  player.listRender(nowPlayList);
};

$playBtn.addEventListener('click', () => {
  if (nowPlayList.length === 0) return;

  player.setPlaylist(nowPlayList);
  player.setMusic();
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


$musicPlayer.addEventListener('timeupdate', player.setProgToRuntime);

$progOuter.addEventListener('click', player.setRuntimeToProg);

$progGetevent.addEventListener('mousedown', (e) => {
  document.addEventListener('mousemove', player.setRuntimeToProg);
});

document.addEventListener('mouseup', () => {
  document.removeEventListener('mousemove', player.setRuntimeToProg);
});
