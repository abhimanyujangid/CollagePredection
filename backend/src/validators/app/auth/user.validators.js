import { body, param } from "express-validator";
import { AvailableUserRoles } from "../../../constants.js";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("fullName")
    .notEmpty()
    .withMessage("Full name is required"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    body("terms").notEmpty().withMessage("Terms is required"),
    body("role")
      .optional()
      .isIn(AvailableUserRoles)
      .withMessage("Invalid user role"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

const userChangeCurrentPasswordValidator = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword").notEmpty().withMessage("New password is required"),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const userResetForgottenPasswordValidator = () => {
  return [body("newPassword").notEmpty().withMessage("Password is required")];
};

const userAssignRoleValidator = () => {
  return [
    body("role")
      .optional()
      .isIn(AvailableUserRoles)
      .withMessage("Invalid user role"),
  ];
};

export {
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
  userResetForgottenPasswordValidator,
  userAssignRoleValidator
};
