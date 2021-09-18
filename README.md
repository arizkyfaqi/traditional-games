# traditional-games

Challenge FWD Binar Chapter 7 <br />
Assalamualaikum wr, wb. Pada challenge chapter 7 ini membuat APi endpoint create room untuk membuat room permainan, endpoint fight untuk dua player dan menjalankan permainan kemudian menyimpan hasil permainan pada database, menggunakan Json Web Token untuk authentication, memfilter (restrict) jenis user, menggunakan model design pattern MVC, dan sebagainya.
<br />

install modules : npm install <br />
running server : npm start <br />

contoh data user ada pada folder db_csv <br />
login admin <br />
username: admin<br />
password: 12345678<br />
login user <br />
username: test/test2/test3<br />
password: 12345678<br />

<br />
endpoint on postman :
<br />

1. https://documenter.getpostman.com/view/9961117/UUxtDpqA

view endpoint :

2. GET http://127.0.0.1:3001/ <br />
   Menampikan halaman utama.
3. GET http://127.0.0.1:3001/login <br />
   Menampilkan form login.
4. GET http://127.0.0.1:3001/register <br />
   Menampilkan form register.
5. GET http://127.0.0.1:3001/rock-paper-scissors <br />
   Menampikan halaman game.
   <br />
   note : harus login dengan admin untuk mengakses endpoint dibawah
   <br />
6. GET http://127.0.0.1:3001/admin/dashboard <br />
   Menampikan halaman dashboard.
7. GET http://127.0.0.1:3001/admin/dashboard/add-new-user <br />
   Menampikan halaman form add new user.
8. GET http://127.0.0.1:3001/admin/dashboard/form-edit/:id <br />
   Menampikan halaman form edit user.
   
   Trima kasih atas perhatian nya,
   mohon saran dan masukan nya 🙏
