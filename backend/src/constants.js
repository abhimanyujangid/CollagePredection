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

// ============== Gender ==============
export const GenderEnum
    = {
        MALE: "male",
        FEMALE: "female",
        OTHER: "other",
    };
export const AvailableGenders = Object.values(GenderEnum);

// ============== Cast ==============
export const CastEnum = {
    GENERAL: "general",
    OBC: "obc",
    SC: "sc",
    ST: "st",
    EWS: "ews",
};
export const AvailableCasts = Object.values(CastEnum);

export const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000; // 20 minutes