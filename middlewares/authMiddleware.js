import jwt from 'jsonwebtoken';
import userService from '../services/users.js'; // Corrected spelling
import dotenv from 'dotenv';

dotenv.config();

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error('Authorization header is required');
    const token = authorization;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const admin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error('Authorization header is required');

    const token = authorization;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await userService.findUserByEmail(decoded.email);
    if (!user) throw new Error('User not found');
    if (user.isAdmin !== true) { // Use strict comparison for booleans
      throw new Error('Unauthorized');
    }
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
