// music list dom
const $musicList = document.querySelector('.music-list');
let $albumBlurs = document.querySelectorAll('.album-blur');
let $albumBtns = document.querySelectorAll('.album-btn-set');
const $favoriteBtns = document.querySelectorAll('.album-btn.favorite');
const $plusBtns = document.querySelectorAll('.album-btn.plus');


// 재생목록 click event dom
const $listOpenBtn = document.querySelector('.play-list-open');
const $playListAll = document.querySelector('.play-list-all');


$musicList.addEventListener('mouseover', ({ target }) => {
  if (!target.matches('.album-img')) return;

  $albumBlurs = document.querySelectorAll('.album-blur');
  $albumBtns = document.querySelectorAll('.album-btn-set');

  const index = +target.parentNode.id.replace('ml-', '');

  $albumBlurs[index].classList.remove('hidden');
  $albumBtns[index].classList.remove('hidden');

$musicList.addEventListener('mouseout', ({ target }) => {
  if (!target.matches('.album-btn-set')) return;

  $albumBlurs = document.querySelectorAll('.album-blur');
  $albumBtns = document.querySelectorAll('.album-btn-set');
  $albumBtns.forEach(btnset => {
    btnset.addEventListener('mouseleave', ({ target }) => {
    
      $albumBlurs = document.querySelectorAll('.album-blur');
      $albumBtns = document.querySelectorAll('.album-btn-set');
    
      const index = +target.parentNode.id.replace('ml-', '');
      $albumBlurs[index].classList.add('hidden');
      $albumBtns[index].classList.add('hidden');
    });
  })
});


// 재생목록 click event
$listOpenBtn.addEventListener('click', () => {
  $playListAll.classList.toggle('active');
});


// 즐겨찾기!

$favoriteBtns.forEach(album => {
  album.addEventListener('click', ({ target }) => {
    target.classList.toggle('select');
  });
  //id.. 노래를 알아야한다.
});