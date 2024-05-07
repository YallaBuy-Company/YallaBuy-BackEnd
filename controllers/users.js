import userService from '../services/users.js';


  const getUsers = async (req, res) => {
      try {
          const users = await userService.getAllUsers();
          res.json(users);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  };

  const createUser = async (req, res) => {

  };

  const getUserById = async (req, res) => {

  };

  const updateUser = async (req, res) => {

  };

  const deleteUser = async (req, res) => {
  };

  export default {getUsers,createUser,getUserById,updateUser,deleteUser}