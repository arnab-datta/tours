const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authenticationController');

// ROUTES for Users
const userRouter = express.Router();

userRouter.post('/signup', authController.signup);

userRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUsers);
userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
