# traditional-games

Challenge FWD Binar Chapter 6 <br />
Assalamualaikum wr, wb. Pada challenge chapter 6 ini membuat Aplikasi Dashboard untuk mengolah data user pada aplikasi traditional games yang di dalam nya terdapat fungsi Create Read Update dan Delete data user, aplikasi ini dirancang menggunakan NodeJS, Express, Sequelize, Postgres dll.

install modules : npm install <br />
running server : npm start <br />

data admin <br />
username: admin<br />
password: 12345678<br />
<br />
endpoint<br />

1. POST http://127.0.0.1:3001/api/v1/users/signup <br />
   Signup untuk mendaftarkan user dengan menggunakan format data sebagai berikut : <br />
   { <br />
   "username": "String", <br />
   "password": "String", <br />
   "name": "String", <br />
   "email": "String", <br />
   "role": "admin || user", <br />
   "phone": Number, <br />
   }<br />
   note: data example ada di folder db_csv
2. POST http://127.0.0.1:3001/api/v1/users/login <br />
   Setelah register dilakukan user di harap login, untuk memasuki halaman tertentu.
3. GET http://127.0.0.1:3001/api/v1/users/logout <br />
   Logout digunakan untuk menhapus cookie dan mengeluarkan akun dari halaman.
   <br />
   note : harus login dengan admin untuk mengakses endpoint dibawah
   <br />
4. GET http://127.0.0.1:3001/api/v1/users/ <br />
   Menampilkan semua data users
5. POST http://127.0.0.1:3001/api/v1/users/ <br />
   Membuat user baru
6. GET http://127.0.0.1:3001/api/v1/users/:UserGameId <br />
   Menampilkan spesifik user
7. PATCH http://127.0.0.1:3001/api/v1/users/:UserGameId <br />
   Update spesifik user
8. DELETE http://127.0.0.1:3001/api/v1/users/:UserGameId <br />
   Menghapus spesifik user<br />
   <br />
   view endpoint
   <br />
9. GET http://127.0.0.1:3001/ <br />
   Menampikan halaman utama.
10. GET http://127.0.0.1:3001/login <br />
    Menampilkan form login.
11. GET http://127.0.0.1:3001/rock-paper-scissors <br />
    Menampikan halaman game.
    <br />
    note : harus login dengan admin untuk mengakses endpoint dibawah
    <br />
12. GET http://127.0.0.1:3001/admin/dashboard <br />
    Menampikan halaman dashboard.
13. GET http://127.0.0.1:3001/admin/dashboard/add-new-user <br />
    Menampikan halaman form add new user.
14. GET http://127.0.0.1:3001/admin/dashboard/form-edit/:id <br />
    Menampikan halaman form edit user.
    <br />
    Trima kasih atas perhatian nya,
    mohon saran dan masukan nya 🙏
