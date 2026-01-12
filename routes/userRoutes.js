const express = require('express');
const userController = require('./../controllers/userController');

// ROUTES for Users
const userRouter = express.Router();
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
