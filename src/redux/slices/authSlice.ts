// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';
import { AuthService } from '#/api';
import { AxiosError } from 'axios';

interface ErrorResponse {
  message: string;
  status: number;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Example of async operation
export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await AuthService.login(email, password);
      return user;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(
        error.response?.data?.message || 'Login error'
      );
    }
  }
);

export const register = createAsyncThunk<
  User,
  { email: string; password: string; displayName: string },
  { rejectValue: string }
>(
  'auth/register',
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      const user = await AuthService.register(email, password);
      return user;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      return rejectWithValue(
        error.response?.data?.message || 'Registration error'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
      state.isAuthenticated = true;
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'Login failed';
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(register.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
      state.isAuthenticated = true;
      if (action.payload.token) {
        localStorage.setItem('token', action.payload.token);
      }
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'Registration failed';
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;
