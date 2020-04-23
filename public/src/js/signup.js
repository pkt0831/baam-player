const $signupBtn = document.querySelector('.signup-signup-btn');
const $signupIdInput = document.querySelector('.signup-id-input');
const $signupPasswordInput = document.querySelector('.signup-password-input');
const $signupNameInput = document.querySelector('.signup-name-input');
const $signupEmailInput = document.querySelector('.signup-email-input');


const signup = async (id, name, password, email) => {
  try {
    const { data } = await axios.post('/signup', { id, name, password, email });
    console.log('[signup http]', data);
  } catch (e) {
    console.error(e);
  }
};


$signupBtn.addEventListener('click', () => {
  const id = $signupIdInput.value;
  const name = $signupNameInput.value;
  const password = $signupPasswordInput.value;
  const email = $signupEmailInput.value;
  console.log('[signup btn event]', id, name, password, email);

  signup(id, name, password, email);
});
