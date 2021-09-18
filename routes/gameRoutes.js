const express = require('express');
const gameController = require('../controllers/gameController');
const authController = require('../controllers/authController');
const router = express();

router.use(authController.protect, authController.restrictTo('user'));

router.post('/create-room', gameController.createRoom);
router.post('/fight/:roomId', gameController.fight);

module.exports = router;
