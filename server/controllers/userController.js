const asyncErrors = require('../utils/asyncErrors');
const userModel = require('../models/userModel');
const AppError = require('../utils/appError');

//route for admin to basically add users
exports.createUser = asyncErrors(async (req, res) => {
  //quick note i have not encrypted the password for the users that the admin created. I encrypted the passwords just for the users who actually signed up for our application

  const { name, email, password } = req.body;
  const createdUser = await userModel.insert(name, email, password);
  res.status(200).json({
    user: createdUser,
  });
});

exports.getAllUsers = asyncErrors(async (req, res) => {
  const users = await userModel.find();

  res.status(200).json(users);
});

exports.getUser = asyncErrors(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    user,
  });
});

exports.updateUser = asyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const updatedUser = await userModel.update(name, email, id);

  if (!updatedUser) {
    return next(new AppError('No user found with that user ID', 404));
  }

  res.status(200).json(updatedUser);
});

exports.deleteUser = asyncErrors(async (req, res, next) => {
  const deletedUser = await userModel.delete(req.params.id);

  if (!deletedUser) {
    return next(new AppError('No user found with that user ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
