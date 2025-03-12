import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginCredentials, RegisterData, AuthState, User } from '../../types/AuthTypes';
import axios from 'axios';
// import toast from 'react-hot-toast';
import apiClient from '../../services/apiClient';

// Define the initial state
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1/";

// Define async thunks for login and register
export const login = createAsyncThunk(
  'auth/login',
  async ({ data, navigate }: { data: LoginCredentials; navigate: Function }, { rejectWithValue }) => {
    try {
      const responsePromise = axios.post(`${URL}auth/login/`, data);
      // const response = await toast.promise(responsePromise, {
      //   loading: 'Logging in...',
      //   success: 'Logged in successfully!',
      // });

      // if(response?.data?.access) {
      //   localStorage.setItem('access_token', response?.data?.access);
      // }
      navigate('/');
      // return response?.data?.user; 
    } catch (error: any) {
      if (error?.response?.data) {
        const errorMessages = Object.values(error?.response?.data).join(', ');
        // toast.error(errorMessages);
       }
      
       return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ data, navigate }: { data: RegisterData; navigate: Function }, { rejectWithValue }) => {
    try {
      const responsePromise = axios.post(`${URL}auth/registration/`, data);
      // toast.promise(responsePromise, {
      //   loading: 'Creating your account...',
      //   success: 'Welcome! Your account has been created successfully',
      // });
      await responsePromise;
      navigate('/auth');  
    } catch (error: any) {
     if (error?.response?.data) {
      const errorMessages = Object.values(error?.response?.data).join(', ');
      // toast.error(errorMessages);
     }
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('auth/user/');
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async ({ navigate }: { navigate: Function }, { rejectWithValue }) => {
  try {
    const response =  apiClient.post('auth/logout/', {});
    // await toast.promise(response, {
    //   loading: 'Logging out...',
    //   success: 'Logged out successfully!',
    // });
    localStorage.removeItem('access_token');
    navigate('/auth');
    return response;
  } catch (error: any) {
    // toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ data }: { data: Partial<User>}, { rejectWithValue }) => {
    try {
      const response =  apiClient.put('auth/user/', data);
      // await toast.promise(response, {
      //   loading: 'Updating profile...',
      //   success: 'Profile updated successfully!',
      // });
      return response;
    } catch (error: any) {
      // toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = payload as User;
      })
      .addCase(fetchUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload as User;
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export default authSlice.reducer;
