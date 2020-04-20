const PLAY_ON = false;

const $musicPlayer = document.querySelector('.musicPlayer');
const $playBtn = document.querySelector('.player-play');
const $musicCover = document.querySelector('.playing-music-img');
const $musicTitle = document.querySelector('.playing-music-title');
const $composer = document.querySelector('.playing-music-artist');
const $playList = document.querySelector('.play-list');
const $progOuter = document.querySelector('.play-bar-outer');
const $proginner = document.querySelector('.play-bar-inner');

console.dir($progOuter);


// control player to button
const isPlaying = () => ([...$playBtn.classList].includes('playing'));

let playingIndex = 0;

// set music func
const setMusic = (musics) => {
  const music = musics[playingIndex];
  $musicPlayer.src = `musics/${music.fileName}.mp3`;
  $musicTitle.innerText = music.title;
  $composer.innerText = music.composer;

  $musicCover.style.backgroundImage = `url(css/album-img/${music.fileName}.jpg)`;
  // $musicCover.style.backgroundSize = 'cover';
};

const setPlayStatus = (boolean) => {
  if (boolean) {
    $playBtn.classList.remove('playing');
    $musicPlayer.pause();
  } else {
    $playBtn.classList.add('playing');
    $musicPlayer.play();
  }
};

const playSelectedList = (index, musics) => {
  playingIndex = index;
  setMusic(musics);
  setPlayStatus(PLAY_ON);
};

const playNext = (musics) => {
  playingIndex++;

  if (playingIndex > musics.length - 1) playingIndex = 0;

  setMusic(musics);
  setPlayStatus(PLAY_ON);
};

const playPrev = (musics) => {
  playingIndex--;

  if (playingIndex < 0) playingIndex = musics.length - 1;

  setMusic(musics);
  setPlayStatus(PLAY_ON);
};


// list render
const listRender = (musics) => {
  let playList = '';
  musics.forEach((music, i) => {
    playList += `<li id=pl-${i} class="play-list-item">
                  <span class="list-item-title">${music.title}</span>
                  <span class="list-item-artist">${music.composer}</span>
                  <button class="list-up"></button>
                  <button class="list-down"></button>
                  <button class="list-remove"></button>
                </li>`;
  });
  $playList.innerHTML = playList;
};


// progressbar funcs
const calcTime = (time) => {
  const min = Math.floor(time / 60);
  let sec = Math.floor(time - (min * 60));
  sec = sec >= 10 ? sec : `0${sec}`;

  return `${min}:${sec}`;
};

const setProgToRuntime = () => {

  const isNaNDuration = isNaN($musicPlayer.duration);
  console.log(isNaNDuration);

  // $proginner.style.width = '13%'
  $proginner.style.width = isNaNDuration ? '0%' : `${($musicPlayer.currentTime / $musicPlayer.duration) * 100 }%`;
  console.log($proginner.style.width);
  // $audioDuration.innerText = isNaNDuration ? '0:00' : calcTime($musicPlayer.duration);
  // $audioCurrentTime.innerText = calcTime($musicPlayer.currentTime);
};

// const setRuntimeToProg = () => {
//   const duration = isNaN($musicPlayer.duration) ? 0 : $musicPlayer.duration;
//   $musicPlayer.currentTime = ($progressbar.value / 100) * duration;
// };

// const removeSetProg = () => $musicPlayer.removeEventListener('timeupdate', setProgToRuntime);
// const addSetProg = () => $musicPlayer.addEventListener('timeupdate', setProgToRuntime);


export {
  isPlaying, setMusic, setPlayStatus, playSelectedList, playNext, playPrev, listRender, setProgToRuntime
};
