import mongoose from 'mongoose';

const leagueSchema = new mongoose.Schema({
  apiId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  country: {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    flag: {
      type: String,
    },
  },
});

export default mongoose.model('League', leagueSchema);

