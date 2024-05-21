import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // Ensures unique email addresses
  },
  salt: {
    type: String,
    required: true // Used for password hashing
  },
  passwordHash: {
    type: String,
    required: true // Hashed password
  },
  fullName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 0 // Optional validation for minimum age
  },
  favoriteTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teams' // Reference to teams model
  },
  games: [{
    type: Object,
    ref: 'Game' // Reference to Game model (if you have one)
  }],
  isAdmin: {
    type: Boolean,
    required: true
  }
});

export default mongoose.model('User', userSchema);
