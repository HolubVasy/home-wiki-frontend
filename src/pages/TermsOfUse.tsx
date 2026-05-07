import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function TermsOfUse() {
  return (
    <Box sx={{ 
      maxWidth: 800, 
      mx: 'auto', 
      p: 3,
      minHeight: '100vh'
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4,
          backgroundColor: 'white',
          borderRadius: 2
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Terms of Use
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing and using Home Wiki, you accept and agree to be bound by the terms and conditions of this agreement.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            2. Use License
          </Typography>
          <Typography variant="body1" paragraph>
            Permission is granted to temporarily access and use Home Wiki for personal, non-commercial purposes. This is the grant of a license, not a transfer of title.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            3. Content
          </Typography>
          <Typography variant="body1" paragraph>
            All articles, categories, and tags within Home Wiki are provided for informational purposes only. Users are responsible for verifying any information before relying on it.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            4. User Contributions
          </Typography>
          <Typography variant="body1" paragraph>
            Users may contribute content to Home Wiki. By submitting content, you grant Home Wiki a non-exclusive license to use, modify, and distribute the content.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            5. Privacy
          </Typography>
          <Typography variant="body1" paragraph>
            Your use of Home Wiki is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the site and informs users of our data collection practices.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            6. Disclaimer
          </Typography>
          <Typography variant="body1" paragraph>
            The materials on Home Wiki are provided on an 'as is' basis. Home Wiki makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            7. Limitations
          </Typography>
          <Typography variant="body1" paragraph>
            In no event shall Home Wiki or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Home Wiki.
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
            Last updated: {new Date().toLocaleDateString()}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
} 