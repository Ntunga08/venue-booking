// Mock venue service for testing
// This provides sample venue data until the backend is ready

const MOCK_VENUES = [
  {
    id: 1,
    name: 'Grand Ballroom',
    image: 'https://source.unsplash.com/random/800x600/?ballroom',
    location: 'Downtown',
    type: 'Wedding Venue',
    categories: ['Wedding', 'Gala Dinner', 'Corporate Meeting'],
    capacity: 500,
    price: 2000,
    rating: 4.5,
    reviewCount: 128,
    description: 'A luxurious ballroom perfect for elegant weddings and corporate events. Features crystal chandeliers, marble floors, and state-of-the-art sound system.',
    features: ['WiFi', 'Parking', 'Restaurant', 'Accessible', 'Audio/Visual Equipment', 'Catering Service'],
  },
  {
    id: 2,
    name: 'Garden Pavilion',
    image: 'https://source.unsplash.com/random/800x600/?garden',
    location: 'City Park',
    type: 'Garden/Outdoor',
    categories: ['Wedding', 'Birthday Party', 'Graduation'],
    capacity: 200,
    price: 1500,
    rating: 4.8,
    reviewCount: 95,
    description: 'Beautiful outdoor venue surrounded by lush gardens and scenic views. Perfect for intimate gatherings and outdoor celebrations.',
    features: ['WiFi', 'Parking', 'Outdoor Space', 'Garden Access', 'Photography Areas'],
  },
  {
    id: 3,
    name: 'Modern Conference Hall',
    image: 'https://source.unsplash.com/random/800x600/?conference',
    location: 'Business District',
    type: 'Conference Center',
    categories: ['Conference', 'Corporate Meeting', 'Workshop', 'Product Launch'],
    capacity: 300,
    price: 1800,
    rating: 4.3,
    reviewCount: 156,
    description: 'State-of-the-art conference facility with modern amenities, perfect for business meetings, conferences, and professional events.',
    features: ['WiFi', 'Parking', 'Audio/Visual Equipment', 'Projector', 'Whiteboards', 'Coffee Service'],
  },
  {
    id: 4,
    name: 'Riverside Restaurant',
    image: 'https://source.unsplash.com/random/800x600/?restaurant',
    location: 'Riverside',
    type: 'Restaurant',
    categories: ['Wedding', 'Birthday Party', 'Corporate Meeting', 'Gala Dinner'],
    capacity: 150,
    price: 1200,
    rating: 4.6,
    reviewCount: 89,
    description: 'Elegant restaurant with stunning river views. Perfect for intimate gatherings and special occasions.',
    features: ['WiFi', 'Parking', 'Restaurant', 'Riverside Views', 'Private Dining'],
  },
  {
    id: 5,
    name: 'Community Hall',
    image: 'https://source.unsplash.com/random/800x600/?community-hall',
    location: 'Suburbs',
    type: 'Community Hall',
    categories: ['Birthday Party', 'Graduation', 'Workshop', 'Community Event'],
    capacity: 100,
    price: 800,
    rating: 4.2,
    reviewCount: 67,
    description: 'Versatile community space suitable for various events. Affordable and accessible for local gatherings.',
    features: ['WiFi', 'Parking', 'Kitchen', 'Accessible', 'Flexible Layout'],
  },
  {
    id: 6,
    name: 'Exhibition Center',
    image: 'https://source.unsplash.com/random/800x600/?exhibition',
    location: 'Business District',
    type: 'Exhibition Space',
    categories: ['Exhibition', 'Product Launch', 'Conference', 'Trade Show'],
    capacity: 1000,
    price: 3000,
    rating: 4.7,
    reviewCount: 203,
    description: 'Large exhibition space with high ceilings and flexible layout. Ideal for trade shows, exhibitions, and large-scale events.',
    features: ['WiFi', 'Parking', 'Loading Docks', 'Audio/Visual Equipment', 'Exhibition Booths'],
  },
];

export const venueService = {
  // Get all venues
  async getVenues() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_VENUES;
  },

  // Get venue by ID
  async getVenueById(id) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const venue = MOCK_VENUES.find(v => v.id === parseInt(id));
    if (!venue) {
      throw new Error('Venue not found');
    }
    return venue;
  },

  // Search venues
  async searchVenues(filters = {}) {
    await new Promise(resolve => setTimeout(resolve, 600));
    let filteredVenues = [...MOCK_VENUES];

    if (filters.searchTerm) {
      filteredVenues = filteredVenues.filter(venue =>
        venue.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.type && filters.type !== 'All') {
      filteredVenues = filteredVenues.filter(venue => venue.type === filters.type);
    }

    if (filters.category && filters.category !== 'All') {
      filteredVenues = filteredVenues.filter(venue => 
        venue.categories.includes(filters.category)
      );
    }

    if (filters.location && filters.location !== 'All') {
      filteredVenues = filteredVenues.filter(venue => venue.location === filters.location);
    }

    if (filters.priceRange) {
      filteredVenues = filteredVenues.filter(venue =>
        venue.price >= filters.priceRange[0] && venue.price <= filters.priceRange[1]
      );
    }

    if (filters.capacityRange) {
      filteredVenues = filteredVenues.filter(venue =>
        venue.capacity >= filters.capacityRange[0] && venue.capacity <= filters.capacityRange[1]
      );
    }

    return filteredVenues;
  }
}; 