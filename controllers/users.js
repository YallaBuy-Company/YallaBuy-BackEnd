import userService from '../services/users.js';

export default{
  getUsers : async (req, res) => {
      try {
          const users = await userService.getAllUsers();
          res.json(users);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  },

  createUser : async (req, res) => {

  },

  getUserById : async (req, res) => {

  },

  updateUser : async (req, res) => {

  },

  deleteUser : async (req, res) => {
  }
};