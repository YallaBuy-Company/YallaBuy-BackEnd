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
    required:true,
    type: Number,
    min: 0 // Optional validation for minimum age
  },
  /*favoriteTeam: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teams' // Reference to teams model
  },*/
  games: [{
    type: Object,
    ref: 'Game' // Reference to Game model (if you have one)
  }],
  isAdmin: {
    required: true,
    default: false,
    type: Boolean
  }
});

export default mongoose.model('User', userSchema);
