import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Rating,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useForm, Controller } from 'react-hook-form';
import { venueService } from '../services/venueService';

const steps = ['Event Details', 'Contact Information', 'Review & Confirm'];

function VenueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const watchedValues = watch();

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        setLoading(true);
        const data = await venueService.getVenueById(id);
        setVenue(data);
      } catch (error) {
        setError('Failed to load venue details');
      } finally {
        setLoading(false);
      }
    };

    fetchVenueDetails();
  }, [id]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleBookingSubmit = async (data) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Booking submitted:', {
        venueId: id,
        venueName: venue.name,
        ...data,
      });
      
      setBookingSuccess(true);
      setTimeout(() => {
        setOpenBookingDialog(false);
        setActiveStep(0);
        setBookingSuccess(false);
        navigate('/bookings');
      }, 2000);
    } catch (error) {
      setError('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    if (!venue || !watchedValues.startDate || !watchedValues.endDate) return 0;
    
    const startDate = new Date(watchedValues.startDate);
    const endDate = new Date(watchedValues.endDate);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
    return venue.price * days;
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Event Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: 'Start date is required' }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Start Date"
                        value={field.value}
                        onChange={field.onChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            error={!!errors.startDate}
                            helperText={errors.startDate?.message}
                          />
                        )}
                        minDate={new Date()}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{ required: 'End date is required' }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="End Date"
                        value={field.value}
                        onChange={field.onChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            error={!!errors.endDate}
                            helperText={errors.endDate?.message}
                          />
                        )}
                        minDate={watchedValues.startDate || new Date()}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="attendees"
                  control={control}
                  rules={{ 
                    required: 'Number of attendees is required',
                    min: { value: 1, message: 'Minimum 1 attendee' },
                    max: { value: venue?.capacity || 1000, message: `Maximum ${venue?.capacity} attendees` }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Number of Attendees"
                      type="number"
                      error={!!errors.attendees}
                      helperText={errors.attendees?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="eventType"
                  control={control}
                  rules={{ required: 'Event type is required' }}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.eventType}>
                      <InputLabel>Event Type</InputLabel>
                      <Select {...field} label="Event Type">
                        {venue?.categories?.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.eventType && (
                        <FormHelperText>{errors.eventType.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="purpose"
                  control={control}
                  rules={{ required: 'Purpose is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Purpose of Booking"
                      multiline
                      rows={3}
                      error={!!errors.purpose}
                      helperText={errors.purpose?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="contactName"
                  control={control}
                  rules={{ required: 'Contact name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Contact Name"
                      error={!!errors.contactName}
                      helperText={errors.contactName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="contactPhone"
                  control={control}
                  rules={{ required: 'Contact phone is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Contact Phone"
                      error={!!errors.contactPhone}
                      helperText={errors.contactPhone?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="contactEmail"
                  control={control}
                  rules={{ 
                    required: 'Contact email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Contact Email"
                      type="email"
                      error={!!errors.contactEmail}
                      helperText={errors.contactEmail?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="specialRequirements"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Special Requirements (Optional)"
                      multiline
                      rows={3}
                      placeholder="Any special requirements, dietary needs, equipment, etc."
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review & Confirm
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Booking Summary
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <EventIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Venue"
                          secondary={venue?.name}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CalendarTodayIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Dates"
                          secondary={`${watchedValues.startDate?.toLocaleDateString()} - ${watchedValues.endDate?.toLocaleDateString()}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Attendees"
                          secondary={watchedValues.attendees}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Event Type"
                          secondary={watchedValues.eventType}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Pricing
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Venue Rate:</Typography>
                      <Typography>${venue?.price}/day</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Duration:</Typography>
                      <Typography>
                        {watchedValues.startDate && watchedValues.endDate
                          ? `${Math.ceil((new Date(watchedValues.endDate) - new Date(watchedValues.startDate)) / (1000 * 60 * 60 * 24)) + 1} days`
                          : '0 days'}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                      <Typography variant="h6">Total:</Typography>
                      <Typography variant="h6" color="primary">
                        ${calculateTotalPrice()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  if (loading && !venue) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error || !venue) {
    return (
      <Container>
        <Alert severity="error">{error || 'Venue not found'}</Alert>
      </Container>
    );
  }

  const images = venue.images?.map((image) => ({
    original: image,
    thumbnail: image,
  })) || [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Image Gallery */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            {images.length > 0 ? (
              <ImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={true}
                showNav={true}
                showThumbnails={true}
              />
            ) : (
              <Box
                sx={{
                  height: 400,
                  bgcolor: 'grey.200',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  No images available
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Venue Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {venue.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={venue.rating} readOnly precision={0.5} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({venue.reviewCount} reviews)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">{venue.location}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PeopleIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">
                Capacity: {venue.capacity} people
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AttachMoneyIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">${venue.price}/day</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Venue Type
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Chip
                label={venue.type}
                color="primary"
                sx={{ mr: 1 }}
              />
            </Box>
            <Typography variant="h6" gutterBottom>
              Suitable For
            </Typography>
            <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {venue.categories?.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  variant="outlined"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" paragraph>
              {venue.description}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Features & Amenities
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {venue.features?.map((feature) => (
                  <Chip key={feature} label={feature} />
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Booking Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h5" gutterBottom>
              Book This Venue
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" color="primary">
                ${venue.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                per day
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<EventIcon />}
              onClick={() => setOpenBookingDialog(true)}
            >
              Book Now
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Booking Dialog */}
      <Dialog
        open={openBookingDialog}
        onClose={() => setOpenBookingDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Book {venue.name}
          <IconButton
            aria-label="close"
            onClick={() => setOpenBookingDialog(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {bookingSuccess ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CheckIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Booking Successful!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Your booking has been confirmed. You will receive a confirmation email shortly.
              </Typography>
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <form onSubmit={handleSubmit(handleBookingSubmit)}>
                {getStepContent(activeStep)}
              </form>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {!bookingSuccess && (
            <>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={activeStep === steps.length - 1 ? handleSubmit(handleBookingSubmit) : handleNext}
                disabled={loading}
              >
                {loading ? 'Processing...' : activeStep === steps.length - 1 ? 'Confirm Booking' : 'Next'}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default VenueDetails; 