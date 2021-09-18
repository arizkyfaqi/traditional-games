const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');
const logOutBtn = document.querySelector('.logout-btn');

const login = async (username, password) => {
  console.log(username, password);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3001/api/v1/users/signin',
      data: {
        username,
        password,
      },
    });

    if (res.data.status === 'success') {
      alert('Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

const register = async (username, password, fullname, email, phone) => {
  console.log(username, password, fullname, email, phone);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3001/api/v1/users/signup',
      data: {
        username,
        password,
        fullname,
        email,
        phone,
      },
    });

    if (res.data.status === 'success') {
      alert('Reguster success, please logged in!');
      window.setTimeout(() => {
        location.assign('/login');
      }, 500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3001/api/v1/users/logout',
    });

    if (res.data.status === 'success') location.reload(true);
  } catch (err) {
    alert('Error loggin out! Try again.');
  }
};

if (loginForm) {
  document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
  });
} else if (registerForm) {
  document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    register(username, password, fullname, email, phone);
  });
} else if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}
