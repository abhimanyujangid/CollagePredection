import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginCredentials, RegisterData, AuthState, User } from '../../ZODtypes/AuthTypes';
import { getCurrentUserService, loginService, logoutService, registerService } from '@/services/apis.ts';
import { toast } from 'sonner';
import { LocalStorage } from '@/utils';
// import toast from 'react-hot-toast';

// Define the initial state
const initialState: AuthState = {
  user: {} as User,
  loading: false,
  error: null,
  isAuthenticated: false,
};


// Define async thunks for login and register
export const loginAction = createAsyncThunk(
  'auth/login',
  async ({ data, navigate }: { data: LoginCredentials; navigate: Function }, { rejectWithValue }) => {
    try {
      const response = await loginService(data);

      if (response?.status) {
        const data = response?.data?.data;
          LocalStorage.set('accessToken', data?.accessToken);
          LocalStorage.set('refreshToken', data?.refreshToken);
      }
      navigate('/dashboard');  // Move navigation after storing tokens
      toast.success('Login successful');
      const resData = response?.data?.data?.user;
      return resData;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error.message);
    }
  }
);


export const registerAction = createAsyncThunk(
  'auth/register',
  async ({ data, navigate }: { data: RegisterData; navigate: Function }, { rejectWithValue }) => {
    try {
      const response = await registerService(data); // Ensure registerS correctly returns response data
      navigate('/auth');  // Move navigation after data is successfully returned
      return response;  
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutAction = createAsyncThunk(
  'auth/logout',
  async (navigate: Function) => {
    try {
      await logoutService();
      LocalStorage.clear();
      window.location.reload(); 
      navigate('/auth');  // Move navigation after tokens are cleared
      toast.success('Logout successful');
      return true;
    } catch (error: any) {
      return false;
    }
  }
);

export const getCurrentUserAction = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUserService();
      return response.data.data;
    } catch (error: any) {
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
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        console.log("payload",payload)
        state.loading = false;
        state.isAuthenticated = true;
        state.user = payload ;
      })
      .addCase(loginAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(registerAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(logoutAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(getCurrentUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUserAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = payload as User;
      })
      .addCase(getCurrentUserAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = payload as string;
      })
      
     ;
      
  },
});

export default authSlice.reducer;
