import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    totalSpent: 0,
    favoriteVenue: null,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [bookingStats, setBookingStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Replace with actual API calls
        const [statsResponse, bookingsResponse] = await Promise.all([
          fetch('http://localhost:8000/api/dashboard/stats', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
          fetch('http://localhost:8000/api/dashboard/recent-bookings', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
        ]);

        if (!statsResponse.ok || !bookingsResponse.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const [statsData, bookingsData] = await Promise.all([
          statsResponse.json(),
          bookingsResponse.json(),
        ]);

        setStats(statsData);
        setRecentBookings(bookingsData.bookings);
        setBookingStats(bookingsData.monthlyStats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography color="text.secondary" gutterBottom>
              Total Bookings
            </Typography>
            <Typography component="p" variant="h4">
              {stats.totalBookings}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <EventIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                All time bookings
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography color="text.secondary" gutterBottom>
              Active Bookings
            </Typography>
            <Typography component="p" variant="h4">
              {stats.activeBookings}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <CalendarIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Current bookings
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography color="text.secondary" gutterBottom>
              Total Spent
            </Typography>
            <Typography component="p" variant="h4">
              ${stats.totalSpent}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <MoneyIcon color="error" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                All time spending
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography color="text.secondary" gutterBottom>
              Favorite Venue
            </Typography>
            <Typography component="p" variant="h6" noWrap>
              {stats.favoriteVenue?.name || 'None'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <StarIcon color="warning" sx={{ mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Most booked venue
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Booking Statistics Chart */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Booking Statistics
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Bookings */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recent Bookings
            </Typography>
            <List>
              {recentBookings.map((booking) => (
                <React.Fragment key={booking.id}>
                  <ListItem
                    button
                    onClick={() => navigate(`/venues/${booking.venue.id}`)}
                  >
                    <ListItemIcon>
                      <Avatar src={booking.venue.image} />
                    </ListItemIcon>
                    <ListItemText
                      primary={booking.venue.name}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {new Date(booking.startDate).toLocaleDateString()}
                          </Typography>
                          {' — '}
                          {booking.purpose}
                        </>
                      }
                    />
                    <Chip
                      size="small"
                      label={booking.status}
                      color={
                        booking.status === 'Active'
                          ? 'success'
                          : booking.status === 'Upcoming'
                          ? 'primary'
                          : 'default'
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/bookings')}
                startIcon={<EventIcon />}
              >
                View All Bookings
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 