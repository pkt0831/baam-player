
// 재생목록 click event dom
const $listOpenBtn = document.querySelector('.play-list-open');
const $playListAll = document.querySelector('.play-list-all');


const $musicList = document.querySelector('.music-list')

// 음악 장르
const $jazzGenre = document.querySelector('.jazz-ganre');
const $rockGenre = document.querySelector('.rock-ganre');
const $classicGenre = document.querySelector('.classic-ganre');
const $danceGenre = document.querySelector('.dance-ganre');
const $hiphopGenre = document.querySelector('.hiopop-ganre');


const renderMusics = data => {
  let musicItems = '';
  for (let i = 0; i < data.length; i++) {
    const musicItem = data[i];
    musicItems += `<li id="ml-0" class="music">
      <div class="album-con-outer">
        <div class="album-con-inner">
          <div class="album-img"></div>
          <div class="album-blur hidden"></div>
          <div class="album-btn-set hidden">
            <button class="album-btn favorite select"></button>
            <button class="album-btn play"></button>
            <button class="album-btn plus"></button>
          </div>
        </div>
      </div>
      <div class="album-title">${musicItem.title}</div>
      <div class="album-artist">${musicItem.composer}</div>
    </li>`;
  }

<<<<<<< HEAD
  $musicList.innerHTML = musicItems;
};
=======
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
>>>>>>> 420d3fdcca5760bc406471ff09d5656f0c251963

// 렌더함수
const render = () => {
  getMusics();
};

<<<<<<< HEAD

const getMusics = async () => {
  const { data } = await axios.get('/musics');
  renderMusics(data);
};

=======
// 재생목록 click event
$listOpenBtn.addEventListener('click', () => {
  $playListAll.classList.toggle('active');
});
>>>>>>> 420d3fdcca5760bc406471ff09d5656f0c251963

// 장르별 음악
const getTypeList = async ganre => {
  const type = ganre;
  const { data } = await axios.post('/typelist', { type });
  const typeMusicList = data;
  renderMusics(typeMusicList);
};


$jazzGenre.addEventListener('click', () => {
  getTypeList('jazz');
});
$rockGenre.addEventListener('click', () => {
  getTypeList('rock');
});
$classicGenre.addEventListener('click', () => {
  getTypeList('classic');
});
$danceGenre.addEventListener('click', () => {
  getTypeList('dance');
});
$hiphopGenre.addEventListener('click', () => {
  getTypeList('hiphop');
});


export {
  render
};
