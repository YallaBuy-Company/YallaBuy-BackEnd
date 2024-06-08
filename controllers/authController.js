import userService from '../services/users.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'; // Added import for bcrypt
import { validateCreateUser } from '../middlewares/validations.js'; // Assuming validation.js is in the same directory
import { validationResult } from 'express-validator';
dotenv.config();

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) throw new Error('Email is required');
        if (!password) throw new Error('Password is required');

        const user = await userService.findUserByEmail(email);
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) throw new Error('Invalid password');

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        if (error.message.includes('email')) {
            res.status(400).json({ message: 'Email already in use' });
        } else {
            res.status(500).json({ message: 'Error logging in' });
        }
    }
};

const signup = async (req, res) => {
    const userData = req.body;
    try {
        const newUser = await userService.createUser(userData);
        const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'Signup successful', token });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message + userData} );
    }
};

export default { login, signup };
