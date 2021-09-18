const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const viewRoutes = require('./routes/viewRoutes');
const gameRoutes = require('./routes/gameRoutes');
const app = express();

//specify pug template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//read data from body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// app.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// });

//Routes Handler
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/games', gameRoutes);
app.use('/', viewRoutes);

module.exports = app;
