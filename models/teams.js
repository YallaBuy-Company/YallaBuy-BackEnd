import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  city: {
    type: String
  }
});

export default mongoose.model('Team', teamSchema);
