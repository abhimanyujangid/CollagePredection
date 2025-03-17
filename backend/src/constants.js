export const DB_NAME = 'collegePredection'


// ============== UserRoles ==============
export const UserRolesEnum = {
    ADMIN: "ADMIN",
    COLLEGE_ADMIN: "COLLEGE_ADMIN",
    STUDENT: "STUDENT",
};
export const AvailableUserRoles = Object.values(UserRolesEnum);

// ============== UserLogin ==============
export const UserLoginType = {
    GOOGLE: "GOOGLE",
    EMAIL_PASSWORD: "EMAIL_PASSWORD",
};
export const AvailableSocialLogins = Object.values(UserLoginType);

export const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000; // 20 minutes