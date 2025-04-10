// API functions for different actions

import { LoginCredentials, RegisterData } from "@/ZODtypes/AuthTypes";
import apiClient from "./apiClient";
import { IStudent, IStudentEducation } from "@/ZODtypes/profile";



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
  

  // ======================= CollegeAdmin API =======================

  export const createCollegeAdminProfileService = async (formData: FormData) => {
    return await apiClient.post("college-admins/create", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

  export const getCollegeAdminProfileService = async () => {
    return await apiClient.get("college-admins/profile");
  };


  // ======================= College API ===================


export const createCollegeService = async (formData: FormData) => {
    return await apiClient.post("colleges", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const getCollegeByIdService = async (id: string) => {
    return await apiClient.get(`colleges/${id}`);
};

export const getAdministratorAllCollegesService = async ({ page = 1, limit = 10 }: { page?: number, limit?: number }) => {
    return await apiClient.get("colleges", { params: { page, limit } });
};

///////////// Strem API ////////////
export const createStreamService = async (collegeId: string, data: any) => {
    return await apiClient.post(`colleges/${collegeId}/stream`, data);
};

export const deleteStreamByIdService = async (streamId: string) => {
    return await apiClient.delete(`colleges/stream/${streamId}`);
};


///////////// Course API ////////////
export const createCourseOfStreamService = async (streamId: string, data: any) => {
    return await apiClient.post(`colleges/${streamId}/course`, data);
};


export const updateCourseOfStreamService = async (courseId: string, data: any) => {
    return await apiClient.put(`colleges/course/${courseId}`, data);
};

export const deleteCourseOfStreamService = async (courseId: string) => {
    return await apiClient.delete(`colleges/course/${courseId}`);
};
