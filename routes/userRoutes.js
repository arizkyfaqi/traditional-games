const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/logout', authController.logout);

router.use(authController.protect, authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createNewUser);
router
  .route('/:UserGameId')
  .get(userController.getUser)
  .patch(userController.editBio)
  .delete(userController.deleteUser);

module.exports = router;
