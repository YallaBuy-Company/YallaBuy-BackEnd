import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  apiId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  founded: {
    type: Number,
    required: true,
  },
  national: {
    type: Boolean,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  }
});

export default mongoose.model('Team', teamSchema);
