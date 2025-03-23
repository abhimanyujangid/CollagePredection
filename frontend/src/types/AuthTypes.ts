//=====================Type definitions for auth features======================

// Authservice Types  
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  role?: "STUDENT" | "COLLEGE_ADMIN";
  terms?: false;
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
  email?: string;
  fullName?: string;
  avatar?: string;
  role?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}
//
