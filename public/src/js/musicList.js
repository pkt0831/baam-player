const $musicList = document.querySelector('.music-list');
let $albumBlurs = document.querySelectorAll('.album-blur');
let $albumBtns = document.querySelectorAll('.album-btn-set');
let $favoriteBtns = document.querySelectorAll('.album-btn.favorite');

// 재생목록 click event dom
const $listOpenBtn = document.querySelector('.play-list-open');
const $playListAll = document.querySelector('.play-list-all');


// $musicList.addEventListener('mouseover', ({ target }) => {
//   if (!target.matches('.album-img')) return;

//   $albumBlurs = document.querySelectorAll('.album-blur');
//   $albumBtns = document.querySelectorAll('.album-btn-set');

//   const index = +target.parentNode.id.replace('ml-', '');

//   $albumBlurs[index].classList.remove('hidden');
//   $albumBtns[index].classList.remove('hidden');

//   $albumBtns.forEach(btnset => {
//     btnset.addEventListener('mouseleave', ({ target }) => {
//       $albumBlurs = document.querySelectorAll('.album-blur');
//       $albumBtns = document.querySelectorAll('.album-btn-set');
    
//       const index = +target.parentNode.id.replace('ml-', '');
//       $albumBlurs[index].classList.add('hidden');
//       $albumBtns[index].classList.add('hidden');
//     });
//   })
// });




// 재생목록 click event
$listOpenBtn.addEventListener('click', () => {
  $playListAll.classList.toggle('active');
});


// 즐겨찾기!

$favoriteBtns.addEventListener('click', () => {
  console.dir($favoriteBtns);
});
