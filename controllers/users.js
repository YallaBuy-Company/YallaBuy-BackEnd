const userService = require('../services/users');

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

exports.createUser = async (req, res) => {

};

exports.getUserById = async (req, res) => {

};

exports.updateUser = async (req, res) => {

};

exports.deleteUser = async (req, res) => {
};