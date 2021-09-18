const path = require('path');
const db = require('../models');
const catchAsync = require('./../utils/catchAsyc');

exports.getOverview = (req, res) => {
  res.status(200).render('overview');
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('loginpage');
};

exports.getRegisterForm = (req, res) => {
  res.status(200).render('registerform');
};

exports.rockPaperScr = (req, res) => {
  res.status(200).render('rockpaperscissors');
};

exports.getDashboard = catchAsync(async (req, res, next) => {
  const users = await db.UserGameBiodata.findAll();

  res.status(200).render('dashboard', {
    users,
  });
});

exports.getFormUser = catchAsync(async (req, res, next) => {
  const user = await db.UserGameBiodata.findAll({
    where: { id: req.params.id },
  });
  const userVal = user[0].dataValues;

  res.status(200).render('formuser', {
    userVal,
  });
});

exports.getFormNewUser = catchAsync(async (req, res, next) => {
  res.status(200).render('formnewuser');
});
