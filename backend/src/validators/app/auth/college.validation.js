import { body } from "express-validator";
import { AvailableCollegeStreams, AvailableCollegeTypes } from "../../../constants.js";

export const collegeRegisterValidator = () => {
  return [
    body("administratorId").notEmpty().withMessage("administratorId is required"),
    body("collegeName").trim().notEmpty().withMessage("collegeName is required"),
    body("rankingNIRF").isInt().withMessage("rankingNIRF must be an integer"),
    body("university").trim().notEmpty().withMessage("university is required"),
    body("type").trim().notEmpty().isIn(AvailableCollegeTypes).withMessage("Invalid type"),
    body("typeOfCollege").trim().notEmpty().isIn(AvailableCollegeStreams).withMessage("Invalid typeOfCollege"),
    body("website").trim().optional().isURL().withMessage("website must be a valid URL"),
    body("email").trim().isEmail().withMessage("email must be a valid email"),
    body("contactNumber")
      .trim()
      .isLength({ min: 10, max: 10 })
      .withMessage("contactNumber must be exactly 10 digits")
      .isNumeric()
      .withMessage("contactNumber must contain only numbers"),
    body("description").trim().optional(),
    body("rating").optional().isFloat({ min: 0, max: 5 }).withMessage("Rating must be between 0 and 5").optional(),
    body("placementStatistics").isObject().withMessage("placementStatistics must be an object").optional(),
  ];
};