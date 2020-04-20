const $musicList = document.querySelector('.music-list');
let $albumBlurs = document.querySelectorAll('.album-blur');
let $albumBtns = document.querySelectorAll('.album-btn-set');
const $music = document.querySelector('.music');

// 재생목록 click event dom
const $listOpenBtn = document.querySelector('.play-list-open');
const $playListAll = document.querySelector('.play-list-all');


// music top 10   dom


$musicList.addEventListener('mouseover', ({ target }) => {
  if (!target.matches('.album-img')) return;

  $albumBlurs = document.querySelectorAll('.album-blur');
  $albumBtns = document.querySelectorAll('.album-btn-set');

  const index = +target.parentNode.id.replace('ml-', '');

  $albumBlurs[index].classList.remove('hidden');
  $albumBtns[index].classList.remove('hidden');
});

$musicList.addEventListener('mouseout', ({ target }) => {
  if (!target.matches('.album-img')) return;

  $albumBlurs = document.querySelectorAll('.album-blur');
  $albumBtns = document.querySelectorAll('.album-btn-set');

  const index = +target.parentNode.id.replace('ml-', '');

  $albumBlurs[index].classList.add('hidden');
  $albumBtns[index].classList.add('hidden');
});


// if (!target.matches('.album-img', '.album-blur', '.album-btn-set') || target.parentNode.id === dsa) {
//   $albumBtn.classList.add('hidden');
//   $albumBlur.classList.add('hidden');
// } else {
//   $albumBtn.classList.remove('hidden');
//   $albumBlur.classList.remove('hidden');
// }


// 재생목록 click event dom
$listOpenBtn.addEventListener('click', () => {
  $playListAll.classList.toggle('active');
});


// // music top 10

// $ganre.addEventListener('click')
