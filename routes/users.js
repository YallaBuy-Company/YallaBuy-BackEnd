import express from 'express';
import userController from '../controllers/users.js';

const router = express.Router();

router.get('/', userController.getUsers);

router.post('/', );

router.get('/:id', );

router.put('/:id', );

router.delete('/:id', );

export default router;