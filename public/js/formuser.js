const editForm = document.querySelector('.form-update-user');
const addForm = document.querySelector('.form-new-user');
// const deleteForm = document.querySelector('.form-delete-user');

const updateUser = async (UserGameId, fullname, email, phone, role) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3001/api/v1/users/${UserGameId}`,
      data: {
        fullname,
        email,
        phone,
        role,
      },
    });
    if (res.data.status === 'success') {
      alert(`updated user bio with ID: ${UserGameId} success.`);
      window.setTimeout(() => {
        location.assign('/admin/dashboard');
      }, 500);
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

const addNewUser = async (username, password, fullname, email, phone, role) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3001/api/v1/users/`,
      data: {
        username,
        password,
        fullname,
        email,
        phone,
        role,
      },
    });
    if (res.data.status === 'success') {
      alert(`create new user successfully.`);
      window.setTimeout(() => {
        location.assign('/admin/dashboard');
      }, 500);
    }
  } catch (err) {
    console.log(err.response.data.message);
  }
};

// const deleteUser = async (UserGameId) => {
//   console.log('Hello');
//   try {
//       const res = await axios({
//         method: 'DELETE',
//         url: `http://127.0.0.1:3001/api/v1/users/${UserGameId}`,
//       });
//       if (res.data.status === 'success') {
//         alert(`Delete user successfully.`);
//         window.setTimeout(() => {
//           location.assign('/admin/dashboard');
//         }, 500);
//       }

//   } catch (err) {
//     console.log(err.response.data.message);
//   }
// };

const deleteElements = document.getElementsByClassName('btn-delete-user');
const deleteUser = function (e) {
  e.preventDefault();
  let UserGameId = this.dataset.userid;
  if (confirm(`Are you sure you want to delete user ${UserGameId}?`)) {
    axios
      .delete(`http://127.0.0.1:3001/api/v1/users/${UserGameId}`)
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

for (var i = 0; i < deleteElements.length; i++) {
  deleteElements[i].addEventListener('click', deleteUser);
}

// function hapusUser() {
//   const UserId = document.getElementById('deleteU').value;
//   console.log(UserId);

//   return false;
// }

if (editForm) {
  document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    const UserGameId = document.getElementById('inputUserId').value;
    const fullname = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail').value;
    const phone = document.getElementById('inputPhone').value;
    const role = document.getElementById('inputRole').value;
    updateUser(UserGameId, fullname, email, phone, role);
  });
} else if (addForm) {
  document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('inputUserName').value;
    const password = document.getElementById('inputPassword').value;
    const fullname = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail').value;
    const phone = document.getElementById('inputPhone').value;
    const role = document.getElementById('inputRole').value;
    addNewUser(username, password, fullname, email, phone, role);
  });
}
// else if (deleteForm) {
//   document.querySelector('.form').addEventListener('click', (e) => {
//     e.preventDefault();
//     const UserGameId = document.getElementById('userId').value;
//     console.log(UserGameId);
//     console.log('Hello');
//   });
// }
