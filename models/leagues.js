import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  flag: {
    type: String,
    required: true
  }
});

const leagueSchema = new mongoose.Schema({
  apiId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  country: {
    type: countrySchema,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('League', leagueSchema);

