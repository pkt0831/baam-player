const $signupBtn = document.querySelector('.signup-signup-btn');
const $signupIdInput = document.querySelector('.signup-id-input');
const $signupPasswordInput = document.querySelector('.signup-password-input');
const $signupNameInput = document.querySelector('.signup-name-input');
const $signupEmailInput = document.querySelector('.signup-email-input');
const $rejectSignupMsg = document.querySelector('.reject-signup-msg');


const completeSignUp = message => {
  console.log(message);
};

const rejectSignUp = message => {
  console.log(message);
};

const signup = async (id, name, password, email) => {
  try {
    // eslint-disable-next-line no-undef
    const { data } = await axios.post('/signup', {
      id, name, password, email
    });
    if (data.type) {
      completeSignUp(data.message);
    } else {
      rejectSignUp(data.message);
    }
  } catch (e) {
    console.error(e);
  }
};


$signupBtn.addEventListener('click', () => {
  const id = $signupIdInput.value;
  const name = $signupNameInput.value;
  const password = $signupPasswordInput.value;
  const email = $signupEmailInput.value;

  signup(id, name, password, email);
});
