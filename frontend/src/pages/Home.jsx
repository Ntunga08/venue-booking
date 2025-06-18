import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Footer from '../components/layout/Footer';

const featuredVenues = [
  {
    id: 1,
    name: 'Grand Ballroom',
    image: 'https://source.unsplash.com/random/800x600/?ballroom',
    location: 'Downtown',
    capacity: '500 people',
    price: '$2000/day',
  },
  {
    id: 2,
    name: 'Garden Pavilion',
    image: 'https://source.unsplash.com/random/800x600/?garden',
    location: 'City Park',
    capacity: '200 people',
    price: '$1500/day',
  },
  {
    id: 3,
    name: 'Modern Conference Hall',
    image: 'https://source.unsplash.com/random/800x600/?conference',
    location: 'Business District',
    capacity: '300 people',
    price: '$1800/day',
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Box>
        {/* Hero Section */}
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            py: 8,
            mb: 6,
            borderRadius: 2,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Find Your Perfect Venue
            </Typography>
            <Typography variant="h5" align="center" paragraph>
              Book amazing venues for your events. From corporate meetings to
              weddings, we have the perfect space for you.
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/venues')}
              >
                Browse Venues
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                onClick={() => navigate('/register')}
              >
                List Your Venue
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Featured Venues Section */}
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom>
            Featured Venues
          </Typography>
          <Grid container spacing={4}>
            {featuredVenues.map((venue) => (
              <Grid item key={venue.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                >
                  <CardActionArea onClick={() => navigate(`/venues/${venue.id}`)}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={venue.image}
                      alt={venue.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {venue.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {venue.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PeopleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {venue.capacity}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AttachMoneyIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {venue.price}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default Home; 