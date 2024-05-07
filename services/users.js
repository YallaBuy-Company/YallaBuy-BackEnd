import User from '../models/users.js';


  const getAllUsers = async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error; // Re-throw for controller to handle
    }
  };

  const createUser = async (newUser) => {

  };

  const getUserById = async (id) => {

  };

  const updateUser = async (id, updatedUser) => {
  };

  const deleteUser = async (id) => {

  };

export default {getAllUsers,createUser,getUserById,updateUser,deleteUser}