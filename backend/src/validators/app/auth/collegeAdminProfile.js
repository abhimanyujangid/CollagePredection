import { body } from "express-validator";

export const CollegeAdminProfileValidator = () => [
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("gender").notEmpty().withMessage("Gender is required"),
    body("dateOfBirth").notEmpty().withMessage("Date of birth is required"),
    body("highestEducation").isObject().notEmpty().withMessage("Highest education is required"),
    body("phoneNumber").isObject().notEmpty().withMessage("Phone number is required"),
];
