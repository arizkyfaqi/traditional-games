const db = require('../models');
const catchAsync = require('./../utils/catchAsyc');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await db.UserGame.findAll();
  const userBio = await db.UserGameBiodata.findAll().then((res) =>
    console.log(res)
  );

  const x = userBio.values();
  for (el of x) {
    console.log(el.dataValues.fullname);
    console.log(el.dataValues.email);
    console.log(el.dataValues.phone);
  }

  const userData = Object.assign(users, userBio);

  res.status(200).json({
    status: 'success',
    result: userData.length,
    data: {
      userData,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const id = req.params.UserGameId;

  const user = await db.UserGame.findAll({ where: { id } });
  const userBio = await db.UserGameBiodata.findAll({
    where: { UserGameId: id },
  });

  const userData = Object.assign(user, userBio);

  res.status(200).json({
    status: 'success',
    data: {
      userData,
    },
  });
});

exports.editBio = catchAsync(async (req, res, next) => {
  const id = req.params.UserGameId;
  const { fullname, email, phone, role } = req.body;

  const user = await db.UserGameBiodata.update(
    { fullname, email, phone, role },
    { where: { UserGameId: id } }
  )
    .then((result) => {
      res.status(200).json({
        status: 'success',
        message: `updated user bio with ID: ${id} success.`,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: 'fail',
        message: `updated user bio with ID: ${id} fail.`,
      });
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.UserGameId;

  await db.UserGameBiodata.destroy({
    where: { UserGameId: id },
  })
    .then(async () => {
      await db.UserGame.destroy({ where: { id } });
    })
    .then(() => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    });
});

exports.createNewUser = catchAsync(async (req, res, next) => {
  const newUser = await db.UserGame.create({
    username: req.body.username,
    password: req.body.password,
  });

  const userBio = await db.UserGameBiodata.create({
    fullname: req.body.fullname,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
    UserGameId: newUser.id,
  });

  res.status(201).json({
    status: 'success',
    message: 'Create new user successfully',
  });
});
