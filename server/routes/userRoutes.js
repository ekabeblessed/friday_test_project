const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

//QUICK NOTE,
//  To protect a route from unauthenticated users just added the
//  middleware function in front of the route you want to protect
//  example to protect the getAllUsers route user
//  authController.protect before userController.getAllUsers as seen in
//  userController.getUser.

//  Please try implementation in postman

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.post('/signup', authController.signup);
router.post('/signin', authController.login);

module.exports = router;
