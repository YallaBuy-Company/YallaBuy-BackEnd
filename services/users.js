const User = require('../models/users');

exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error; // Re-throw for controller to handle
  }
};

exports.createUser = async (newUser) => {

};

exports.getUserById = async (id) => {

};

exports.updateUser = async (id, updatedUser) => {

};

exports.deleteUser = async (id) => {

};
