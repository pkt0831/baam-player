const $toastContainer = document.querySelector('.toast-container');
const $albumList = document.querySelector('.music-list');

const myStorage = window.localStorage;

const toastControl = (() => {
  // let count = 0;

  const makeMessage = (type, title, message) => {
    const $newDiv = document.createElement('div');
    $newDiv.classList.add('toast', type);

    const $strong = document.createElement('strong');
    const $title = document.createTextNode(`${title}`);
    const $message = document.createTextNode(message);
    // const $closeBtn = document.createElement('button');
    // const $closeBtnText = document.createTextNode('X');

    // $closeBtn.appendChild($closeBtnText);
    // $closeBtn.classList.add('close');

    $strong.appendChild($title);

    $newDiv.appendChild($strong);
    $newDiv.appendChild($message);
    // $newDiv.appendChild($closeBtn);

    $toastContainer.appendChild($newDiv);

    setTimeout(() => {
      if (![...$toastContainer.children].includes($newDiv)) return;

      $toastContainer.removeChild($newDiv);
      // count--;
    }, 1500);

    // $closeBtn.onclick = () => {
    //   $toastContainer.removeChild($newDiv);
    //   count--;
    // };

    // count++;
  };

  const addPlayListToast = () => makeMessage('addplaylistToast', 'Playlist 추가', 'Playlist에 추가하였습니다.');
  const addFavoriteToast = () => makeMessage('addfavoriteToast', 'Favorite 추가', 'Favorite에 추가하였습니다');
  const deleteFavoriteToast = () => makeMessage('deletefavoriteToast', 'Favorite 제거', 'Favorite에서 제거하였습니다');
  // const warning = () => makeMessage('warning', 'Check it out!', 'This is warning alert');

  return { addPlayListToast, addFavoriteToast, deleteFavoriteToast };
})();

const addPlayListMessage = ({ target }) => {
  if (!target.matches('.album-btn.plus')) return;

  toastControl.addPlayListToast();
};

const addFavoriteMessage = ({ target }) => {
  if (!target.matches('.album-btn.favorite ') || myStorage.getItem('id') === 'guest') return;

  if (target.matches('.select')) {
    toastControl.deleteFavoriteToast();
    return;
  }
  toastControl.addFavoriteToast();
};

$albumList.addEventListener('click', addPlayListMessage);
$albumList.addEventListener('click', addFavoriteMessage);
