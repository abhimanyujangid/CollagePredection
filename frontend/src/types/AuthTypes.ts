//=====================Type definitions for auth features======================

// Authservice Types  
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username?: string;
  email?: string;
  password1?: string;
  password2?: string;
  first_name?: string;
  last_name?: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}


// AuthSlice Types

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}


// ProfileSlice Types
export interface User {
  pk?: number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  phone?: string;
}


//
