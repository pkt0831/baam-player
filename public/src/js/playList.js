const $musicList = document.querySelector('.music-list');
const $albumBlur = document.querySelector('.album-blur');
const $albumBtn = document.querySelector('.album-btn-set');
const $music = document.querySelector('.music');

// 재생목록 click event dom
const $listOpenBtn = document.querySelector('.play-list-open');
const $playListAll = document.querySelector('.play-list-all');


// music top 10   dom

const $ganre = document.querySelector('.ganre')

// $musicList.addEventListener('mouseover', ({ target }) => {
//   if (!target.matches('.album-img', '.album-blur', '.album-btn-set') || target.parentNode.id === target.id) {
//     $albumBtn.classList.add('hidden');
//     $albumBlur.classList.add('hidden');
//   } else {
//     $albumBtn.classList.remove('hidden');
//     $albumBlur.classList.remove('hidden');
//   }
// });


// 재생목록 click event dom
$listOpenBtn.addEventListener('click', () => {
  $playListAll.classList.toggle('active');
});



// music top 10

$ganre.addEventListener('click')



