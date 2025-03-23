// API functions for different actions

import { LoginCredentials, RegisterData } from "@/types/AuthTypes";
import apiClient from "./apiClient";
import { IStudent, IStudentEducation } from "@/types/profile";



// ======================= Auth API =======================
export const registerService = async (data: RegisterData) => {
    return await apiClient.post("users/register", data)
  }
  
  export const loginService = async (data: LoginCredentials) => {
    return await apiClient.post("users/login", data);
  };
  
  export const refreshTokenService = async () => {
    return await apiClient.post("users/refresh-token");
  };
  
  export const verifyEmailService = async (verificationToken: string) => {
    return await apiClient.get(`users/verify-email/${verificationToken}`);
  };
  
  export const forgotPasswordService = async (data: { email: string }) => {
    return await apiClient.post("users/forgot-password", data);
  };
  
  export const resetPasswordService = async (resetToken: string, data: { newPassword: string }) => {
    return await apiClient.post(`users/reset-password/${resetToken}`, data);
  };
  
  export const logoutService = async () => {
    return await apiClient.post("users/logout");
  };
  
  export const changePasswordService = async (data: { oldPassword: string, newPassword: string }) => {
    return await apiClient.post("users/change-password", data);
  };
  
  export const resendEmailVerificationService = async () => {
    return await apiClient.post("users/resend-email-verification");
  };
  
  export const getCurrentUserService = async () => {
    return await apiClient.get("users/current-user");
  };
  
  export const updateUserDetailsService = async (data: { [key: string]: any }) => {
    return await apiClient.put("users/update-user", data);
  };
  
  
  export const assignRoleService = async (userId: string, data: { role: string }) => {
    return await apiClient.post(`users/assign-role/${userId}`, data);
  };
  
  export const googleLoginService = async () => {
    return await apiClient.get("users/google");
  };
  
  export const googleCallbackService= async () => {
    return await apiClient.get("users/google/callback");
  };
  
  

  // ======================= Student API =======================

  export const createStudentProfileService = async (data: IStudent) => {
    return await apiClient.post("students/profile", data);
  };
  
  export const createEducationDetailsService = async (data: IStudentEducation) => {
    return await apiClient.post("students/education", data);
  };
  
  export const updateStudentProfileService = async (data: IStudent,id: string) => {
    return await apiClient.put(`students/profile/${id}`, data);
  };

  
  export const updateEducationDetailsService = async (data: IStudentEducation) => {
    return await apiClient.put("students/education", data);
  };
  
  export const getStudentDataService = async () => {
    return await apiClient.get("students/profile");
  };
  
