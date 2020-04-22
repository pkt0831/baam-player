import * as musicList from './musicList.js';


const getTextContent = value => {
  const $albumTitle = document.querySelectorAll('.album-title');
  const $albumArtist = document.querySelectorAll('.album-artist');

  $albumTitle.forEach(title => {
    let html = '';
    [...title.textContent].forEach(v => {
      if (v === value) console.log(1);
    });
  });
  $albumArtist.forEach(artist => {
    // artist.textContent, artist.textContent.indexOf(value)
  });
};


const toSearch = (list, value) => {
  const searchCompleted = list.filter(({ title, composer }) => !!(
    title.includes(value) || composer.includes(value)));
  musicList.renderMusics(searchCompleted);
  getTextContent(value);
};


const getMusicListForSearch = async value => {
  // eslint-disable-next-line no-undef
  const { data } = await axios.get('/musics');
  const list = data;
  toSearch(list, value);
};


export {
  getMusicListForSearch, toSearch
};
