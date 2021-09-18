const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/login', viewController.getLoginForm);
router.get('/register', viewController.getRegisterForm);

router.use(authController.protect);

router.get('/rock-paper-scissors', viewController.rockPaperScr);

router.use(authController.protect, authController.restrictTo('admin'));

router.get('/admin/dashboard', viewController.getDashboard);
router.get('/admin/dashboard/add-new-user', viewController.getFormNewUser);
router.get('/admin/dashboard/form-edit/:id', viewController.getFormUser);

module.exports = router;
