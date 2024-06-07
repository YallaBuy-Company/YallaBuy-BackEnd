import userSchema from '../models/users.js'; 
import { body } from 'express-validator'; // Import only the body function

export const validateCreateUser = [
  body('email')
    .exists({ checkNull: true, errMsg: 'Email is required' })
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (value) => {
      const user = await userSchema.findOne({ email: value });
      if (user) {
        return Promise.reject('Email already in use');
      }
      return Promise.resolve();
    }),

  // Full name validation
  body('fullName')
    .exists({ checkNull: true, errMsg: 'Full name is required' })
    .isString()
    .withMessage('Full name must be a string'),

  // Optional favoriteTeamName validation (if applicable)
  body('favoriteTeamName')
    .optional()
    .isString()
    .withMessage('Favorite team name must be a string'),

  // Age validation
  body('age')
    .optional() // Make age optional if desired
    .isInt({ min: 1, max: 120 })
    .withMessage('Age must be a positive integer between 1 and 120'),

  // Password validation with regular expression
  body('password')
    .exists({ checkNull: true, errMsg: 'Password is required' })
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Password must contain only letters and numbers'),

];


