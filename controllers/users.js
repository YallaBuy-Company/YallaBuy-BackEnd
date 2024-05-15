import userService from '../services/users.js';

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Use specific error message
  }
};

const createUser = async (req, res) => {
  const userData = req.body;

  try {
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    // Handle potential validation errors or conflicts
    if (error.code && error.code === 11000) { // Duplicate key error (e.g., email)
      res.status(400).json({ message: 'Duplicate user data' });
    } else {
      res.status(500).json({ message: 'Error creating user' }); // Generic error for other issues
    }
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedUser = await userService.updateUser(userId, updatedData);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    // Handle potential validation errors or conflicts (similar to createUser)
    res.status(500).json({ message: 'Error updating user' });
  }
};

const addFavorite = async (req, res) => {
  const userId = req.params.id;
  const newFav= req.body;

  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.games.push(newFav); // Add newFav object to the user's games array
    await user.save();
    res.json({ message: 'Game added to favorites successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding favorite game' });
    }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await userService.deleteUser(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' }); // Or return the deleted user object
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

const deleteFavorite = async (req, res) => {
  const userId = req.params.id;
  const gameIdToDelete = req.body.gameId; // Assuming gameId is sent in the request body

  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter the user.games array to exclude the game with the matching ID
    const filteredGames = user.games.filter((game) => game._id.toString() !== gameIdToDelete);
    user.games = filteredGames;

    await user.save(); // Save the updated user document

    res.json({ message: 'Game deleted from favorites successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting game from favorites' });
  }
};



export default { getUsers, createUser, getUserById, updateUser, addFavorite, deleteUser, deleteFavorite};
