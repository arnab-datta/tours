const express = require('express');
const User = require('../models/userModel');

// users
const getAllUsers = (req, res) => {
  const users = User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users: users,
    },
  });
};

const getUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: { id: req.params.id },
    },
  });
};

const createUsers = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      user: req.body,
    },
  });
};

const updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'User updated',
  });
};

const deleteUser = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

module.exports = {
  getAllUsers,
  getUser,
  createUsers,
  updateUser,
  deleteUser,
};
