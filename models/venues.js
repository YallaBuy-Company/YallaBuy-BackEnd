import mongoose from 'mongoose';

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
  },
  surface: {
    type: String,
  },
  image: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  apiId: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Venue', venueSchema);
