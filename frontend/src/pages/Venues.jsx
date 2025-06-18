import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  Slider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Button,
  Collapse,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessibleIcon from '@mui/icons-material/Accessible';
import DirectionsIcon from '@mui/icons-material/Directions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { venueService } from '../services/venueService';

const venueTypes = [
  'All',
  'Wedding Venue',
  'Conference Center',
  'Meeting Room',
  'Banquet Hall',
  'Garden/Outdoor',
  'Restaurant',
  'Hotel Ballroom',
  'Community Hall',
  'Exhibition Space',
  'Sports Facility',
  'Theater/Auditorium'
];

const eventCategories = [
  'All',
  'Wedding',
  'Corporate Meeting',
  'Conference',
  'Birthday Party',
  'Exhibition',
  'Concert',
  'Sports Event',
  'Graduation',
  'Gala Dinner',
  'Product Launch',
  'Workshop'
];

const locations = [
  'All',
  'Downtown',
  'City Park',
  'Business District',
  'Suburbs',
];

function Venues() {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [capacityRange, setCapacityRange] = useState([0, 1000]);
  const [expandedVenues, setExpandedVenues] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use mock venue service
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const data = await venueService.getVenues();
        setVenues(data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handleVenueClick = (venueId) => {
    const newExpanded = new Set(expandedVenues);
    if (newExpanded.has(venueId)) {
      newExpanded.delete(venueId);
    } else {
      newExpanded.add(venueId);
    }
    setExpandedVenues(newExpanded);
  };

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch = venue.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === 'All' || venue.type === selectedType;
    const matchesCategory =
      selectedCategory === 'All' || venue.categories?.includes(selectedCategory);
    const matchesLocation =
      selectedLocation === 'All' || venue.location === selectedLocation;
    const matchesPrice =
      venue.price >= priceRange[0] && venue.price <= priceRange[1];
    const matchesCapacity =
      venue.capacity >= capacityRange[0] && venue.capacity <= capacityRange[1];

    return (
      matchesSearch &&
      matchesType &&
      matchesCategory &&
      matchesLocation &&
      matchesPrice &&
      matchesCapacity
    );
  });

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography>Loading venues...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Filters Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Search Venues"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Venue Type</Typography>
              <TextField
                select
                fullWidth
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {venueTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Event Category</Typography>
              <TextField
                select
                fullWidth
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {eventCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Location</Typography>
              <TextField
                select
                fullWidth
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Price Range (per day)</Typography>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={5000}
                step={100}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">${priceRange[0]}</Typography>
                <Typography variant="body2">${priceRange[1]}</Typography>
              </Box>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Capacity Range</Typography>
              <Slider
                value={capacityRange}
                onChange={(e, newValue) => setCapacityRange(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                step={50}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{capacityRange[0]} people</Typography>
                <Typography variant="body2">{capacityRange[1]} people</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Venues List */}
        <Grid item xs={12} md={9}>
          <List>
            {filteredVenues.map((venue) => {
              const isExpanded = expandedVenues.has(venue.id);
              return (
                <React.Fragment key={venue.id}>
                  <Paper
                    sx={{
                      mb: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        transition: 'transform 0.2s ease-in-out',
                        boxShadow: 3,
                      },
                    }}
                    onClick={() => handleVenueClick(venue.id)}
                  >
                    <Grid container>
                      {/* Venue Image */}
                      <Grid item xs={12} md={4}>
                        <CardMedia
                          component="img"
                          height="250"
                          image={venue.image}
                          alt={venue.name}
                          sx={{
                            height: '100%',
                            minHeight: 250,
                            objectFit: 'cover',
                          }}
                        />
                      </Grid>

                      {/* Venue Details */}
                      <Grid item xs={12} md={8}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Typography variant="h5" component="h2" gutterBottom>
                              {venue.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Rating value={venue.rating} readOnly precision={0.5} size="small" />
                              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                ({venue.reviewCount})
                              </Typography>
                              <IconButton size="small" sx={{ ml: 1 }}>
                                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                              </IconButton>
                            </Box>
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {venue.location}
                            </Typography>
                          </Box>

                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            <Chip
                              icon={<EventIcon />}
                              label={venue.type}
                              color="primary"
                              size="small"
                            />
                            {venue.categories?.slice(0, 3).map((category) => (
                              <Chip
                                key={category}
                                label={category}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Box>

                          <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={6} sm={3}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PeopleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2">
                                  {venue.capacity} people
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AttachMoneyIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2">
                                  ${venue.price}/day
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <WifiIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2">
                                  {venue.features?.includes('WiFi') ? 'WiFi Available' : 'No WiFi'}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocalParkingIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2">
                                  {venue.features?.includes('Parking') ? 'Parking Available' : 'No Parking'}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>

                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {venue.description?.substring(0, 150)}...
                          </Typography>

                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              {venue.features?.slice(0, 3).map((feature) => (
                                <Chip
                                  key={feature}
                                  icon={
                                    feature === 'Restaurant' ? <RestaurantIcon /> :
                                    feature === 'Accessible' ? <AccessibleIcon /> :
                                    <DirectionsIcon />
                                  }
                                  label={feature}
                                  size="small"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                            <Typography variant="body2" color="primary">
                              Click to {isExpanded ? 'collapse' : 'expand'} details
                            </Typography>
                          </Box>
                        </CardContent>
                      </Grid>
                    </Grid>

                    {/* Expanded Details */}
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 3, bgcolor: 'grey.50' }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                              Full Description
                            </Typography>
                            <Typography variant="body1" paragraph>
                              {venue.description}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                              All Features & Amenities
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                              {venue.features?.map((feature) => (
                                <Chip
                                  key={feature}
                                  icon={
                                    feature === 'WiFi' ? <WifiIcon /> :
                                    feature === 'Parking' ? <LocalParkingIcon /> :
                                    feature === 'Restaurant' ? <RestaurantIcon /> :
                                    feature === 'Accessible' ? <AccessibleIcon /> :
                                    <DirectionsIcon />
                                  }
                                  label={feature}
                                  size="small"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                            <Typography variant="h6" gutterBottom>
                              All Event Categories
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {venue.categories?.map((category) => (
                                <Chip
                                  key={category}
                                  label={category}
                                  size="small"
                                  color="secondary"
                                />
                              ))}
                            </Box>
                          </Grid>
                        </Grid>
                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                          <Button
                            variant="contained"
                            size="large"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/venues/${venue.id}`);
                            }}
                          >
                            Book This Venue
                          </Button>
                        </Box>
                      </Box>
                    </Collapse>
                  </Paper>
                  <Divider />
                </React.Fragment>
              );
            })}
            {filteredVenues.length === 0 && (
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  No venues found matching your criteria
                </Typography>
              </Paper>
            )}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Venues; 