import * as player from "./player.js";

const $playBtn = document.querySelector('.player-play');
const $prevBtn = document.querySelector('.player-prev');
const $nextBtn = document.querySelector('.player-next');
const $musicPlayer = document.querySelector('.musicPlayer');


let nowPlayList = [];

// 수정해야함
window.onload = async () => {
  const id = 'ysungkoon';

  const { data } = await axios.post('/playlist', { id });
  nowPlayList = data;
  player.listRender(nowPlayList);
};

$playBtn.onclick = () => {
  if (nowPlayList.length === 0) return;

  player.setMusic(nowPlayList);
  player.setPlayStatus(player.isPlaying());
};


$prevBtn.onclick = () => {
  if (nowPlayList.length === 0) return;

  player.playPrev(nowPlayList);
};

$nextBtn.onclick = () => {
  if (nowPlayList.length === 0) return;

  player.playNext(nowPlayList);
};

$musicPlayer.addEventListener('timeupdate', player.setProgToRuntime);
