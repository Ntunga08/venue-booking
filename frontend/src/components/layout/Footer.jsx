import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.100', py: 3, mt: 8 }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, md: 0 } }}>
          <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="body1" color="text.secondary">
            © {new Date().getFullYear()} Venue Booking. All rights reserved.
          </Typography>
        </Box>
        <Box>
          <Link href="/" color="primary" underline="hover" sx={{ mr: 2 }}>
            Home
          </Link>
          <IconButton href="https://github.com/" target="_blank" rel="noopener" color="inherit" size="small">
            <GitHubIcon fontSize="small" />
          </IconButton>
          <IconButton href="mailto:info@venuebooking.com" color="inherit" size="small">
            <EmailIcon fontSize="small" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer; 