import User from '../models/users.js';
import Team from '../models/teams.js';

const bcrypt = require('bcryptjs'); // For password hashing

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error; // Re-throw for controller to handle
  }
};

const createUser = async (userData) => {
  const { password, favoriteTeamName, ...otherUserData } = userData;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const team = await Team.findOne({ name: favoriteTeamName });
  const userDataWithoutPassword = { ...otherUserData, favoriteTeam: team ? team._id : null };

  const newUser = new User({
    ...userDataWithoutPassword,
    salt,
    passwordHash
  });

  await newUser.save();
  return newUser;
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error; // Re-throw for controller to handle
  }
};

const updateUser = async (userId, updatedData) => {
  if (updatedData.password) {
    const salt = await bcrypt.genSalt(10);
    updatedData.passwordHash = await bcrypt.hash(updatedData.password, salt);
    delete updatedData.password; // Remove plain text password after hashing
  }

  const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
  return user;
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser; // Return the deleted user object (optional)
  } catch (error) {
    throw error; // Re-throw for controller to handle
  }
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

 export default {
   getAllUsers,
   createUser,
   getUserById,
   updateUser,
   deleteUser,
   findUserByEmail
 };
