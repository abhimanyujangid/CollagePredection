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
    OPEN: "OPEN",
    OBC: "OBC",
    SC: "SC",
    ST: "ST",
    EWS: "EWS",
    OPEN_PWD:"OPEN_PWD",
    OBC_PWD:"OBC_PWD",
    SC_PWD:"SC_PWD",
    ST_PWD:"ST_PWD",
    EWS_PWD:"EWS_PWD",


    // PWD: "pwd",
};
export const AvailableCasts = Object.values(CastEnum);

// ============== CollegeType ==============
export const CollegeTypeEnum = {
    PRIVATE: "private",
    GOVERNMENT: "government",
    STATE: "state",
};
export const AvailableCollegeTypes = Object.values(CollegeTypeEnum);

// ============== CollegeApplicationStatus ==============
export const CollegeApplicationStatusEnum = {
    PENDING: "pending",
    APPROVED: "approved",
    REJECTED: "rejected",
};
export const AvailableCollegeApplicationStatuses = Object.values(CollegeApplicationStatusEnum);


// ============== CollegeStream ==============
export const CollegeStreamEnum = {
    engineering: "engineering",
    medical: "medical",
    management: "management",
    law: "law",
    arts: "arts",
    science: "science",
};
export const AvailableCollegeStreams = Object.values(CollegeStreamEnum);

// ============== CourseType ==============
export const CourseTypeEnum = {
    UNDERGRADUATE: "undergraduate",
    POSTGRADUATE: "postgraduate",
    DUAL_DEGREE: "dual_degree",
    DIPLOMA: "diploma",
};
export const AvailableCourseTypes = Object.values(CourseTypeEnum);

export const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000; // 20 minutes