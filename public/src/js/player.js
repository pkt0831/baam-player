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

const myStorage = window.localStorage;

let playingIndex = 0;
let shuffled = false;


// control player to button
const isPlaying = () => !$musicPlayer.paused;

// set music func
const setMusic = () => {
  const musics = JSON.parse(myStorage.getItem('playList'));
  if (musics.length === 0) return;

  const music = musics[playingIndex];
  $musicPlayer.src = `musics/${music.fileName}.mp3`;
  $musicTitle.innerText = music.title;
  $composer.innerText = music.composer;

  $musicCover.style.backgroundImage = `url(css/album-img/${music.fileName}.jpg)`;
};

const paintSelectedList = (index) => {
  [...$playList.children].forEach((li) => li.classList.remove('playing'));
  if (!$musicPlayer.paused) $playList.children[index].classList.add('playing');
};

const setPlayStatus = (boolean) => {
  const musics = JSON.parse(myStorage.getItem('playList'));
  if (musics.length === 0) return;

  if (boolean) {
    $playBtn.childNodes[0].classList.remove('fa-pause');
    $playBtn.childNodes[0].classList.add('fa-play');

    $musicPlayer.pause();
  } else {
    // $playBtn.classList.add('playing');
    $playBtn.childNodes[0].classList.remove('fa-play');
    $playBtn.childNodes[0].classList.add('fa-pause');

    $musicPlayer.play();
    paintSelectedList(playingIndex);
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

  setMusic();
  setPlayStatus(PLAY_ON);
  paintSelectedList(playingIndex);
};

const playNext = () => {
  const musics = JSON.parse(myStorage.getItem('playList'));
  if (musics.length === 0) return;

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

  setMusic();
  setPlayStatus(PLAY_ON);
  paintSelectedList(playingIndex);
};

const playPrev = () => {
  const musics = JSON.parse(myStorage.getItem('playList'));
  if (musics.length === 0) return;

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

  setMusic();
  setPlayStatus(PLAY_ON);
  paintSelectedList(playingIndex);
};


// list render
const listRender = () => {
  const musics = JSON.parse(myStorage.getItem('playList'));
  if (musics.length === 0) return;

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
  paintSelectedList(playingIndex);
};

const setPlayList = (() => {
  const setPlayList = async (type, id, title) => {
    if (type === 'server') {
      const { data } = await axios.post('/playlist', { id });
      myStorage.setItem('playList', JSON.stringify(data));
      return;
    }
    const musicList = JSON.parse(myStorage.getItem('playList'));

    const { data } = await axios.get('/music', { title });
    const newMusicList = [...musicList, data];

    myStorage.setItem('playList', newMusicList);
  };

  const fromServer = (id) => setPlayList('server', id);
  const toLocal = (title) => setPlayList('local', '_', title);

  return { fromServer, toLocal };
})();

// const setPlayList = async (id) => {
//   const { data } = await axios.post('/playlist', { id });
//   myStorage.setItem('playList', JSON.stringify(data));
// };

const setFavoriteList = async (id) => {
  const { data } = await axios.post('/favorite', { id });
  myStorage.setItem('playList', JSON.stringify(data));
};

const listDown = async (e) => {
  if (!e.target.matches('.list-down')) return;

  let musics = JSON.parse(myStorage.getItem('playList'));
  const id = myStorage.getItem('id');

  const index = +e.target.parentNode.id.replace('pl-', '');

  const nowMusicTitle = musics[playingIndex].title;

  const { data } = await axios.patch('/patchplaylist', { id, index, isUp: false });
  musics = data;
  myStorage.setItem('playList', JSON.stringify(data))
  playingIndex = musics.findIndex(music => music.title === nowMusicTitle);


  listRender();
  paintSelectedList(playingIndex);
};

const listUp = async (e) => {
  if (!e.target.matches('.list-up')) return;

  let musics = JSON.parse(myStorage.getItem('playList'));

  const id = myStorage.getItem('id');
  const index = +e.target.parentNode.id.replace('pl-', '');

  const nowMusicTitle = musics[playingIndex].title;

  const { data } = await axios.patch('/patchplaylist', { id, index, isUp: true });
  musics = data;
  myStorage.setItem('playList', JSON.stringify(data));
  playingIndex = musics.findIndex(music => music.title === nowMusicTitle);

  listRender();
  paintSelectedList(playingIndex);
};

const deleteList = async ({ target }) => {
  if (!target.matches('li > .list-remove')) return;

  // let musics = JSON.parse(myStorage.getItem('playList'));

  const id = myStorage.getItem('id');
  const deleteIndex = +target.parentNode.id.replace('pl-', '');

  const { data } = await axios.patch('/deletePlaylist', { id, deleteIndex });

  myStorage.setItem('playList', JSON.stringify(data));

  listRender();
  if (deleteIndex === playingIndex) setMusic();
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
  const isPremium = JSON.parse(myStorage.getItem('premium'));

  const duration = isPremium ? $musicPlayer.duration : 60;

  $progInner.style.width = isNaNDuration ? '0%' : `${($musicPlayer.currentTime / duration) * 100}%`;
  $playTime.innerText = isNaNDuration ? '00:00' : calcTime(duration);
  $playTimeIng.innerText = calcTime($musicPlayer.currentTime);

  if (!isPremium && $musicPlayer.currentTime >= 60) playNext();
};

const setRuntimeToProg = (e) => {
  let duration = isNaN($musicPlayer.duration) ? 0 : $musicPlayer.duration;
  const isPremium = JSON.parse(myStorage.getItem('premium'));

  duration = isPremium ? duration : 60;
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
  isPlaying, setMusic, setPlayStatus, playSelectedList, playNext, playPrev, listRender,
  setPlayList, setFavoriteList,
  setProgToRuntime, setRuntimeToProg, removeSetProg, addSetProg,
  setShuffleStatus,
  setVolume,
  listDown, listUp, deleteList
};
