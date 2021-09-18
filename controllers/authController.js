const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsyc');
// const User = require('./../models/userModel');
const db = require('../models');
const catchAsyc = require('./../utils/catchAsyc');
const console = require('console');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPRISES_IN,
  });
};

createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.getUsers = catchAsync(async (req, res, next) => {
  res.json({
    message: 'Welcome to restfullapi',
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  let newUser = await db.UserGame.create({
    username: req.body.username,
    password: req.body.password,
  });

  if (!newUser) {
    return res.status(400).json('Something went wrong, Please try again!');
  }

  const userGameId = newUser.id;
  const userBio = await db.UserGameBiodata.create({
    fullname: req.body.fullname,
    email: req.body.email,
    phone: req.body.phone,
    role: 'user',
    UserGameId: userGameId,
  });

  // newUser.password = undefined;
  const userData = {
    authuser: { ...newUser },
    userbio: { ...userBio },
  };

  createSendToken(userData, 201, res);
});

exports.signin = catchAsync(async (req, res, next) => {
  const { password, username } = req.body;

  //1) cek email & paswd
  if (!username || !password) {
    res.status(400).json({
      status: 'fail',
      message: 'provide username and password',
    });
  }

  //2) validasi email & pswd
  const user = await db.UserGame.findOne({
    where: {
      username: req.body.username,
    },
  });

  // userData = user[0].dataValues;
  const passwordMatch = await user.validPassword(password, user.password);

  if (!user || !passwordMatch) {
    res.status(400).json({
      status: 'fail',
      message: 'Incorrect email or password!',
    });
  }

  //send token to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res.status(401).json({
      status: 'fail',
      message: 'You are not logged in! Please log in to get access.',
    });
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await db.UserGameBiodata.findAll({
    where: {
      UserGameId: decode.id,
    },
  });

  if (!currentUser) {
    res.status(401).json({
      status: 'fail',
      message: 'The user belonging to this token does no longer exist.',
    });
  }
  // console.log(decode);
  // console.log(currentUser);
  req.user = currentUser[0].dataValues;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      //1. veification token
      const decode = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      const currentUser = await db.UserGameBiodata.findAll({
        where: { UserGameId: decode.id },
      });

      if (!currentUser) {
        return next();
      }
      // console.log(currentUser[0].dataValues);
      // req.user = currentUser[0].dataValues;
      res.locals.user = currentUser[0].dataValues;

      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles ['admin', 'lead-guide']
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action',
      });
    }
    next();
  };
};
