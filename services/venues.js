import Venue from '../models/venues.js';

const getVenues = async (filterParams = {}) => {
  try {
    const { city, country } = filterParams; // Destructure filter parameters

    let query = {};
    if (city) {
      query.city = city;
    }
    if (country) {
      query.country = country;
    }

    const venues = await Venue.find(query); // Apply filtering based on params
    return venues;
  } catch (error) {
    throw error; // Re-throw for controller to handle
  }
};

export default { getVenues };