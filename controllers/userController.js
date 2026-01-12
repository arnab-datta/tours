const express = require('express');

// users
const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      users: [],
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
