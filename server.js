const app = require('./app');
const dotenv = require('dotenv');
const Sequelize = require('sequelize');
const db = require('./models');
dotenv.config({ path: './config.env' });

const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    logging: false,
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const port = 3001;
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`listening on: http://localhost:${port}`);
  });
});
