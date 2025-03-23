import { body } from "express-validator";
import { AvailableGenders, AvailableCasts } from "../../../constants.js";

const StudentProfileValidator = () => {
    return [
        body("phoneNumber")
            .trim()
            .notEmpty()
            .isMobilePhone()
            .withMessage("Invalid phone number"),
        body("fullName")
            .trim()
            .notEmpty()
            .withMessage("Full name is required"),
        body("dateOfBirth")
            .trim()
            .notEmpty()
            .isISO8601()
            .withMessage("Invalid date of birth"),
        body("preferences")
            .optional(),
        body("gender")
            .trim()
            .notEmpty()
            .isIn(AvailableGenders)
            .withMessage("Invalid gender"),
        body("cast")
            .trim()
            .notEmpty()
            .isIn(AvailableCasts)
            .withMessage("Invalid cast"),
        body("hobbies")
            .optional()
            .isArray() 
            .withMessage("Hobbies must be an array"),
    ];
};

const StudentEducationValidator = () => {
    return [
        body("tenth")
            .notEmpty()
            .isObject()
            .withMessage("Invalid tenth details"),
        body("twelfth")
            .notEmpty()
            .isObject()
            .withMessage("Invalid twelfth details"),
        body("competitiveExams")
            .optional()
            .isObject() // Add validation before .withMessage()
            .withMessage("Competitive exams must be an object"),
    ];
};

export { StudentProfileValidator, StudentEducationValidator };
