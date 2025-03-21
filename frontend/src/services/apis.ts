// API functions for different actions

import { LoginCredentials, RegisterData } from "@/types/AuthTypes";
import apiClient from "./apiClient";
export const registerService = async (data: RegisterData) => {
    return await apiClient.post("users/register", data)
  }
  
  export const loginService = async (data: LoginCredentials) => {
    return await apiClient.post("users/login", data);
  };
  
  export const refreshTokenS = async () => {
    return await apiClient.post("users/refresh-token");
  };
  
  export const verifyEmailS = async (verificationToken: string) => {
    return await apiClient.get(`users/verify-email/${verificationToken}`);
  };
  
  export const forgotPasswordS = async (data: { email: string }) => {
    return await apiClient.post("users/forgot-password", data);
  };
  
  export const resetPasswordS = async (resetToken: string, data: { newPassword: string }) => {
    return await apiClient.post(`users/reset-password/${resetToken}`, data);
  };
  
  export const logoutService = async () => {
    return await apiClient.post("users/logout");
  };
  
  export const changePasswordS = async (data: { oldPassword: string, newPassword: string }) => {
    return await apiClient.post("users/change-password", data);
  };
  
  export const resendEmailVerificationS = async () => {
    return await apiClient.post("users/resend-email-verification");
  };
  
  export const getCurrentUserService = async () => {
    return await apiClient.get("users/current-user");
  };
  
  export const updateUserDetailsS = async (data: { [key: string]: any }) => {
    return await apiClient.put("users/update-user", data);
  };
  
  
  export const assignRoleS = async (userId: string, data: { role: string }) => {
    return await apiClient.post(`users/assign-role/${userId}`, data);
  };
  
  export const googleLoginS = async () => {
    return await apiClient.get("users/google");
  };
  
  export const googleCallbackS = async () => {
    return await apiClient.get("users/google/callback");
  };
  
  