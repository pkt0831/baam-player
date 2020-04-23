import * as player from "./player.js";
// dom

// 재생목록 click 
const $listOpenBtn = document.querySelector('.play-list-open');
const $playListAll = document.querySelector('.play-list-all');
        
const $favoriteCloseBtn = document.querySelector('.favorite-list-close');
const $favoriteListAll = document.querySelector('.favorite-list-all');

const $favorOpenBtn = document.querySelector('.sign-favorite');
const $favoriteList = document.querySelector('.favorite-list-all');

const $logoBox = document.querySelector('.logo-box');
const $musicList = document.querySelector('.music-list');

// 음악 장르
const $jazzGenre = document.querySelector('.jazz-ganre');
const $rockGenre = document.querySelector('.rock-ganre');
const $classicGenre = document.querySelector('.classic-ganre');
const $danceGenre = document.querySelector('.dance-ganre');
const $hiphopGenre = document.querySelector('.hiopop-ganre');

const myStorage = window.localStorage;
// music top
const $musicTop = document.querySelector('.music-top');


const setBackgroundImg = data => {
  const $albumImgs = document.querySelectorAll('.album-img');
  $albumImgs.forEach((imgs, i) => {
    imgs.style = `background-image: url(./css/al-img/${data[i].fileName}.png)`;
  });
};

const renderMusics = async (musics) => {
  const id = myStorage.getItem('id');
  let favoriteMusics;

  if (id !== 'guest') {
    const { data } = await axios.post('/favorite', { id });
    favoriteMusics = data;
  }

  let musicItems = '';
  musics.forEach((music, i) => {
    musicItems += `<li id="ml-${i}" class="music">
         <div class="album-con-outer">
           <div class="album-con-inner">
             <div class="album-img"></div>
             <div class="album-blur hidden"></div>
             <div class="album-btn-set hidden">
               <button class="album-btn favorite ${id === 'guest' ? '' : favoriteMusics.find((fmusic) => fmusic.title === music.title) ? 'select' : ''}"></button>
               <button class="album-btn play"></button>
               <button class="album-btn plus"></button>
             </div>
           </div>
         </div>
         <div class="album-title">${music.title}</div>
         <div class="album-artist">${music.composer}</div>
       </li>`;
  });
  // for (let i = 0; i < data.length; i++) {
  //   const musicItem = data[i];
  //   musicItems += `<li id="ml-${i}" class="music">
  //     <div class="album-con-outer">
  //       <div class="album-con-inner">
  //         <div class="album-img"></div>
  //         <div class="album-blur hidden"></div>
  //         <div class="album-btn-set hidden">
  //           <button class="album-btn favorite ${id === 'guest' ? '' : d}"></button>
  //           <button class="album-btn play"></button>
  //           <button class="album-btn plus"></button>
  //         </div>
  //       </div>
  //     </div>
  //     <div class="album-title">${musicItem.title}</div>
  //     <div class="album-artist">${musicItem.composer}</div>
  //   </li>`;
  // }
  $musicList.innerHTML = musicItems;
  setBackgroundImg(musics);
};

// 렌더함수
const renderAllMusic = async () => {
  const { data } = await axios.get('/musics');
  renderMusics(data);
};


// 장르별 음악
const getTypeList = async ganre => {
  const type = ganre;
  const { data } = await axios.post('/typelist', { type });
  const typeMusicList = data;
  renderMusics(typeMusicList);
};


const getTop10Musics = async (e) => {
  const { data } = await axios.get('/top10');
  const musics = data;
  renderMusics(musics);
};


$logoBox.addEventListener('click', renderAllMusic);

$musicTop.addEventListener('click', getTop10Musics);



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





// 재생목록 click event
$listOpenBtn.addEventListener('click', async () => {
  $playListAll.classList.toggle('active');
  $favoriteList.classList.remove('active');
  // await player.setPlayList.fromServer(myStorage.getItem('id'));
  await player.listRender();
});

$favorOpenBtn.addEventListener('click', async () => {
  $favoriteList.classList.toggle('active');
  $playListAll.classList.remove('active');
  // await player.setFavoriteList(myStorage.getItem('id'));
  await player.favoriteRender();
});

$favoriteCloseBtn.addEventListener('click', () => {
  $favoriteListAll.classList.toggle('active');
});

export {
  renderAllMusic, renderMusics
};



// import * as player from "./player.js";
// // dom

// // 재생목록 click 
// const $listOpenBtn = document.querySelector('.play-list-open');
// const $playListAll = document.querySelector('.play-list-all');

// const $favorOpenBtn = document.querySelector('.sign-favorite');
// const $favoriteList = document.querySelector('.favorite-list-all');

// const $musicList = document.querySelector('.music-list');

// // 음악 장르
// const $jazzGenre = document.querySelector('.jazz-ganre');
// const $rockGenre = document.querySelector('.rock-ganre');
// const $classicGenre = document.querySelector('.classic-ganre');
// const $danceGenre = document.querySelector('.dance-ganre');
// const $hiphopGenre = document.querySelector('.hiopop-ganre');

// const myStorage = window.localStorage;
// // music top
// const $musicTop = document.querySelector('.music-top');


// const setBackgroundImg = data => {
//   console.log('bg-func', data);
//   const $albumImgs = document.querySelectorAll('.album-img');
//   console.log('bg-func', $albumImgs);
//   $albumImgs.forEach((imgs, i) => {
//     imgs.style = `background-image: url(./css/al-img/${data[i].fileName}.png)`;
//   });
// };

// const renderMusics = data => {
//   let musicItems = '';
//   for (let i = 0; i < data.length; i++) {
//     const musicItem = data[i];
//     musicItems += `<li id="ml-${i}" class="music">
//       <div class="album-con-outer">
//         <div class="album-con-inner">
//           <div class="album-img"></div>
//           <div class="album-blur hidden"></div>
//           <div class="album-btn-set hidden">
//             <button class="album-btn favorite select"></button>
//             <button class="album-btn play"></button>
//             <button class="album-btn plus"></button>
//           </div>
//         </div>
//       </div>
//       <div class="album-title">${musicItem.title}</div>
//       <div class="album-artist">${musicItem.composer}</div>
//     </li>`;
//   }
//   $musicList.innerHTML = musicItems;
//   setBackgroundImg(data);
// };

// // 렌더함수
// const render = () => {
//   getMusics();
// };


// const getMusics = async () => {
//   const { data } = await axios.get('/musics');
//   renderMusics(data);
// };


// // 장르별 음악
// const getTypeList = async ganre => {
//   const type = ganre;
//   const { data } = await axios.post('/typelist', { type });
//   const typeMusicList = data;
//   renderMusics(typeMusicList);
// };


// const getTop10Musics = async (e) => {
//   const { data } = await axios.get('/top10');
//   const musics = data;
//   renderMusics(musics);
// };


// $musicTop.addEventListener('click', getTop10Musics);



// $jazzGenre.addEventListener('click', () => {
//   getTypeList('jazz');
// });
// $rockGenre.addEventListener('click', () => {
//   getTypeList('rock');
// });
// $classicGenre.addEventListener('click', () => {
//   getTypeList('classic');
// });
// $danceGenre.addEventListener('click', () => {
//   getTypeList('dance');
// });
// $hiphopGenre.addEventListener('click', () => {
//   getTypeList('hiphop');
// });


// // 재생목록 click event
// $listOpenBtn.addEventListener('click', async () => {
//   $playListAll.classList.toggle('active');
//   $favoriteList.classList.remove('active');
//   // await player.setPlayList.fromServer(myStorage.getItem('id'));
//   await player.listRender();
// });

// $favorOpenBtn.addEventListener('click', async () => {
//   $favoriteList.classList.toggle('active');
//   $playListAll.classList.remove('active');
//   // await player.setFavoriteList(myStorage.getItem('id'));
//   await player.favoriteRender();
// });

// export {
//   render, renderMusics
// };
