import * as player from "./player.js";

// music list dom
const $musicList = document.querySelector('.music-list');
let $albumBlurs = document.querySelectorAll('.album-blur');
let $albumBtns = document.querySelectorAll('.album-btn-set');
const $favoriteBtns = document.querySelectorAll('.album-btn.favorite');
const $plusBtns = document.querySelectorAll('.album-btn.plus');


// 재생목록 click event dom
const $listOpenBtn = document.querySelector('.play-list-open');
const $playListAll = document.querySelector('.play-list-all');





// 재생목록 click event
$listOpenBtn.addEventListener('click', () => {
  $playListAll.classList.toggle('active');
});


// 즐겨찾기!

const favorite = $favoriteBtns.forEach(album => {
  album.addEventListener('click', ({ target }) => {
    target.classList.toggle('select');
  });
});

const deletePlaylist = async (e) => {
  const id = 'ysungkoon';
  const deleteIndex = 0;

  const {data} = await axios.patch('/deleteplaylist', { id, deleteIndex });
  playlist = data;
  render(playlist);
};


const addFavorite = async (e) => {
  const id = 'ysungkoon';
  const title = 'Nightingale';

  const {data} = await axios.post('/addFavorite', { id, title });
  playlist = data;
  render(playlist);
};
