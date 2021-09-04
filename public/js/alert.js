const playgame = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3001/rock-paper-scissors',
    });

    window.setTimeout(() => {
      location.assign('/rock-paper-scissors');
    }, 100);
  } catch (err) {
    alert(err.response.data.message);
    window.setTimeout(() => {
      location.assign('/login');
    }, 500);
  }
};

const goDashboard = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3001/admin/dashboard',
    });

    window.setTimeout(() => {
      location.assign('/admin/dashboard');
    }, 100);
  } catch (err) {
    alert(err.response.data.message);
    window.setTimeout(() => {
      location.assign('/');
    }, 500);
  }
};

document.querySelector('.btn-play').addEventListener('click', (e) => {
  playgame();
});

document.querySelector('.btn-dashboard').addEventListener('click', (e) => {
  goDashboard();
});
