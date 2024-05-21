import Country from '../models/countries.js';
import City from '../models/city.js';
import Venue from '../models/venues.js';

const fetchVenues = async (req, res) => {
  const { country, city } = req.query;

  try {
    // Fetch the country document to get city IDs
    const countryDoc = await Country.findOne({ name: country });
    if (!countryDoc) {
      return res.status(404).json({ message: 'Country not found' });
    }

    let venueIds = [];

    // If a city is specified, narrow down to that city
    if (city) {
      const cityDoc = await City.findOne({ name: city, _id: { $in: countryDoc.cityIds } });
      if (!cityDoc) {
        return res.status(404).json({ message: 'City not found in specified country' });
      }
      venueIds = cityDoc.venueIds;
    } else {
      // Fetch all cities in the country
      const cityDocs = await City.find({ _id: { $in: countryDoc.cityIds } });
      cityDocs.forEach(cityDoc => {
        venueIds = venueIds.concat(cityDoc.venueIds);
      });
    }

    // Fetch venues using the accumulated venue IDs
    const venues = await Venue.find({ _id: { $in: venueIds } });
    if (!venues.length) {
      return res.status(404).json({ message: 'No venues found' });
    }

    // Filter out venues that do not match the specified country
    const filteredVenues = venues.filter(venue => venue.country === country);

    if (!filteredVenues.length) {
      return res.status(404).json({ message: 'No venues found in the specified country' });
    }

    const venueApiIds = filteredVenues.map(venue => venue.apiId);
    return res.status(200).json(venueApiIds);
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export default { fetchVenues };
