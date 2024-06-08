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
  const { games, isAdmin, oldPassword, newPassword, ...userDataToUpdate } = updatedData;

  // Check if both old password and new password are provided
  if (oldPassword && newPassword) {
    // Find the user by email to get the stored password hash
    const user = await findUserByEmail(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the old password hash matches the stored password hash
    const isPasswordValid = await bcrypt.compare(oldPassword, user.passwordHash);

    if (!isPasswordValid) {
      throw new Error('Old password is incorrect');
    }

    // Hash the new password and update the user's passwordHash field
    const salt = await bcrypt.genSalt(10);
    userDataToUpdate.passwordHash = await bcrypt.hash(newPassword, salt);
  }

  try {
    // Construct the update object based on fields to update
    let updateObject = { ...userDataToUpdate };
    // If isAdmin is not provided in the update data, default it to false
    if (isAdmin === undefined) {
      updateObject.isAdmin = false;
    }

    // Find the user by email and update only the specified fields
    const user = await User.findOneAndUpdate({ email: userId }, updateObject, { new: true });

    // Check if games were sent in the update data, if not, update the user's games array
    if (!games) {
      user.games = games; // Set the games array to the existing value in the database
      await user.save(); // Save the updated user document
    }

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
