import User from '../models/users.js';

export default{
  getAllUsers : async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error; // Re-throw for controller to handle
    }
  },

  createUser : async (newUser) => {

  },

  getUserById : async (id) => {

  },

  updateUser : async (id, updatedUser) => {

  },

  deleteUser : async (id) => {

  },
};
