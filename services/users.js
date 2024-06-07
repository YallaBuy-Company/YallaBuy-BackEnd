import User from '../models/users.js';
import Team from '../models/teams.js';

import bcrypt from 'bcryptjs'; // For password hashing

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw new Error('Error fetching users'); // Throw a more specific error message
  }
};

const createUser = async (userData) => {
  console.log('userData:', userData); // Log the entire object
  const { password, ...otherUserData } = userData;

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      ...otherUserData,
      salt,
      passwordHash
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    console.error(error); // Log the error for debugging
    if (error.code === 11000) { // Handle potential duplicate key error (e.g., email)
      throw new Error('User with this email already exists');
    } else {
      throw new Error('Error creating user'); // Generic error message for other errors
    }
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw new Error('Error fetching user'); // Throw a more specific error message
  }
};

const updateUser = async (userId, updatedData) => {
  if (updatedData.password) {
    const salt = await bcrypt.genSalt(10);
    updatedData.passwordHash = await bcrypt.hash(updatedData.password, salt);
    delete updatedData.password; // Remove plain text password after hashing
  }

  try {
    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    return user;
  } catch (error) {
    console.error(error); // Log the error for debugging
    throw new Error('Error updating user'); // Throw a more specific error message
  }
};

const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser; // Return the deleted user object (optional)
  } catch (error) {  
    console.error(error); // Log the error for debugging
    throw new Error('Error deleting user'); // Throw a more specific error message
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
