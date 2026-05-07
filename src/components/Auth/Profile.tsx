import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useAuth } from '#/hooks/useAuth';

export default function Profile() {
  const { user, loading, updateUserProfile, logout } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setAvatarFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;

    try {
      // For now, just use the preview URL as the avatar URL
      await updateUserProfile(displayName, previewUrl || undefined);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: 'calc(100vh - 64px)',
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ maxWidth: 600, width: '100%', p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Profile
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Avatar
            src={previewUrl || user?.photoURL}
            alt={user?.displayName || 'User avatar'}
            sx={{ width: 100, height: 100 }}
          />
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="avatar-upload"
              type="file"
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-upload">
              <Button variant="outlined" component="span">
                Change Avatar
              </Button>
            </label>
          </Box>

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={user?.email || ''}
            disabled
          />

          <TextField
            label="Display Name"
            type="text"
            fullWidth
            margin="normal"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            Update Profile
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Button variant="outlined" color="secondary" onClick={logout} disabled={loading}>
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
