import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  venueIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Venue',
    },
  ],
});

export default mongoose.model('City', citySchema);
