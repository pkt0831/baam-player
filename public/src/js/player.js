const PLAY_ON = false;

const $musicPlayer = document.querySelector('.musicPlayer');
const $playBtn = document.querySelector('.player-play');
const $musicCover = document.querySelector('.playing-music-img');
const $musicTitle = document.querySelector('.playing-music-title');
const $composer = document.querySelector('.playing-music-artist');
const $playList = document.querySelector('.play-list');
const $progInner = document.querySelector('.play-bar-inner');
const $progOuter = document.querySelector('.play-bar-outer');
const $playTimeIng = document.querySelector('.play-time-ing');
const $playTime = document.querySelector('.play-time');
const $volumeInner = document.querySelector('.sound-bar-inner');
const $volumeOuter = document.querySelector('.sound-bar');
const $soundBtn = document.querySelector('.player-sound');
const $soundGetevent = document.querySelector('.sound-bar-getevent');
const $shuffleBtn = document.querySelector('.player-shuffle');

let playingIndex = 0;
let shuffled = false;

// set playlist
let musics = [];

const setPlaylist = (music) => { musics = music; };

// control player to button
const isPlaying = () => ([...$playBtn.classList].includes('playing'));

// set music func
const setMusic = () => {
  const music = musics[playingIndex];
  $musicPlayer.src = `musics/${music.fileName}.mp3`;
  $musicTitle.innerText = music.title;
  $composer.innerText = music.composer;

  $musicCover.style.backgroundImage = `url(css/album-img/${music.fileName}.jpg)`;
};

const paintSelectedList = (index) => {
  [...$playList.children].forEach((li) => li.classList.remove('playing'));
  $playList.children[index].classList.add('playing');
};

const setPlayStatus = (boolean) => {
  if (boolean) {
    $playBtn.classList.remove('playing');

    $musicPlayer.pause();
  } else {
    $playBtn.classList.add('playing');

    paintSelectedList(playingIndex);
    $musicPlayer.play();
  }
};


const setShuffleStatus = () => {
  if (shuffled) {
    $shuffleBtn.classList.remove('random');
    shuffled = false;
  } else {
    $shuffleBtn.classList.add('random');
    shuffled = true;
  }
};

const playSelectedList = (index) => {
  playingIndex = index;

  paintSelectedList(playingIndex);
  setMusic();
  setPlayStatus(PLAY_ON);
};

const playNext = () => {
  if (shuffled === false) {
    playingIndex++;
    if (playingIndex > musics.length - 1) playingIndex = 0;
  } else {
    let randomIndex = 0;
    do {
      randomIndex = Math.floor(Math.random() * musics.length);
    } while (playingIndex === randomIndex);
    playingIndex = randomIndex;
  }

  paintSelectedList(playingIndex);
  setMusic();
  setPlayStatus(PLAY_ON);
};

const playPrev = () => {
  if (shuffled === false) {
    playingIndex--;
    if (playingIndex < 0) playingIndex = musics.length - 1;
  } else {
    let randomIndex = 0;
    do {
      randomIndex = Math.floor(Math.random() * musics.length);
    } while (playingIndex === randomIndex);
    playingIndex = randomIndex;
  }

  paintSelectedList(playingIndex);
  setMusic();
  setPlayStatus(PLAY_ON);
};


// list render
const listRender = () => {
  let playList = '';
  musics.forEach((music, i) => {
    playList += `<li id="pl-${i}" class="play-list-item">
                  <span class="list-item-title">${music.title}</span>
                  <span class="list-item-artist">${music.composer}</span>
                  <button class="list-up"></button>
                  <button class="list-down"></button>
                  <button class="list-remove"></button>
                </li>`;
  });
  $playList.innerHTML = playList;
};

const listDown = async (e, id) => {
  if (!e.target.matches('.list-down')) return;

  const index = +e.target.parentNode.id.replace('pl-', '');

  const nowMusicTitle = musics[playingIndex].title;

  const { data } = await axios.patch('/patchplaylist', { id, index, isUp: false });

  musics = data;

  playingIndex = musics.findIndex(music => music.title === nowMusicTitle);

  listRender();
  paintSelectedList(playingIndex);
};

const listUp = async (e, id) => {
  if (!e.target.matches('.list-up')) return;

  const index = +e.target.parentNode.id.replace('pl-', '');

  const nowMusicTitle = musics[playingIndex].title;

  const { data } = await axios.patch('/patchplaylist', { id, index, isUp: true });

  musics = data;

  playingIndex = musics.findIndex(music => music.title === nowMusicTitle);

  listRender();
  paintSelectedList(playingIndex);
};

const deleteList = async ({ target }, id) => {
  if (!target.matches('li > .list-remove')) return;

  const deleteIndex = +target.parentNode.id.replace('pl-', '');

  const { data } = await axios.patch('/deletePlaylist', { id, deleteIndex });

  const newMusicList = data;

  musics = newMusicList;

  listRender();
  paintSelectedList(playingIndex);
};

// progressbar funcs
const calcTime = (time) => {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time - (min * 60));
  sec = sec >= 10 ? sec : `0${sec}`;
  min = min >= 10 ? min : `0${min}`;

  return `${min}:${sec}`;
};

const setProgToRuntime = () => {
  const isNaNDuration = isNaN($musicPlayer.duration);

  $progInner.style.width = isNaNDuration ? '0%' : `${($musicPlayer.currentTime / $musicPlayer.duration) * 100}%`;
  $playTime.innerText = isNaNDuration ? '00:00' : calcTime($musicPlayer.duration);
  $playTimeIng.innerText = calcTime($musicPlayer.currentTime);
};

const setRuntimeToProg = (e) => {
  const duration = isNaN($musicPlayer.duration) ? 0 : $musicPlayer.duration;
  $musicPlayer.currentTime = (e.offsetX / $progOuter.offsetWidth) * duration;
};

const removeSetProg = () => $musicPlayer.removeEventListener('timeupdate', setProgToRuntime);
const addSetProg = () => $musicPlayer.addEventListener('timeupdate', setProgToRuntime);


// volume
const setVolume = (e) => {
  let volume = e.offsetX / $soundGetevent.offsetWidth;

  if (e.target.matches('.play-list-all') && e.offsetX < 250) volume = 0;
  else if (e.target.matches('.main-window') && e.offsetX < 800) volume = 0;

  volume = volume > 200 || volume <= 0 ? 0 : volume > 1 ? 1 : volume;

  if (volume <= 0) $soundBtn.classList.add('mute');
  else $soundBtn.classList.remove('mute');

  $volumeInner.style.width = `${volume * 100}%`;
  $musicPlayer.volume = volume;
};

export {
  setPlaylist,
  isPlaying, setMusic, setPlayStatus, playSelectedList, playNext, playPrev, listRender,
  setProgToRuntime, setRuntimeToProg, removeSetProg, addSetProg,
  setShuffleStatus,
  setVolume,
  listDown, listUp, deleteList
};

