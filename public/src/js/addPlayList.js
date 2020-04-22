import * as player from "./player.js";

const myStorage = window.localStorage;

const addPlayList = async ({ target }) => {  
  if (!target.matches('.album-btn.plus')) return;
  const albumTitles = document.querySelectorAll('.album-title');

  const index = +target.parentNode.parentNode.parentNode.parentNode.id.replace('ml-', '');
  const title = albumTitles[index].innerText;

  const id = myStorage.getItem('id');


  const { data } = await axios.post('/addplaylist', { id, title });

  await player.setPlayList(id);
  await player.listRender();
};

export {
  addPlayList
};