import express from 'express';
import userController from '../controllers/users.js';

const router = express.Router();

// Get all users
router.get('/', userController.getUsers);

// Create a new user
router.post('/', userController.createUser);
  
// Get a user by ID
router.get('/details', userController.getUserDetails);

// Update a user by ID
router.put('/:id', userController.updateUser);
router.put('/favorites/:id',userController.addFavorite)
// Delete a user by ID
router.delete('/:id', userController.deleteUser);
router.delete('/favorites/:id', userController.deleteFavorite);

export default router;
