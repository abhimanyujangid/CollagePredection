import { Router } from "express";
import {
    changeCurrentPassword,
    getCurrentUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    updateUserAvatar,
    updateUserDetails,
    resendEmailVerification,
    resetForgottenPassword,
    verifyEmail,
    assignRole,
    forgotPasswordRequest,
    handleSocialLogin
} from "../controllers/user.controller.js";
import {
    userAssignRoleValidator,
    userChangeCurrentPasswordValidator,
    userForgotPasswordValidator,
    userLoginValidator,
    userRegisterValidator,
    userResetForgottenPasswordValidator,
} from "../validators/app/auth/user.validators.js";
import {
    verifyJWT,
    verifyPermission,
} from "../middlewares/auth.middleware.js";
import "../passport/index.js";
import { upload } from '../middlewares/multer.middleware.js'
import { validate } from "../validators/validate.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";
import { UserRolesEnum } from "../constants.js";
import passport from "passport";


const router = Router()

// Unsecured route
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/verify-email/:verificationToken").get(verifyEmail);

//
router
    .route("/forgot-password")
    .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);
router
    .route("/reset-password/:resetToken")
    .post(
        userResetForgottenPasswordValidator(),
        validate,
        resetForgottenPassword
    );

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router
    .route("/change-password")
    .post(
        verifyJWT,
        userChangeCurrentPasswordValidator(),
        validate,
        changeCurrentPassword
    );
router
    .route("/resend-email-verification")
    .post(verifyJWT, resendEmailVerification);

router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-user").patch(verifyJWT, updateUserDetails);
router.route("/update-avatar").patch(upload.single('avatar'), updateUserAvatar);


// Admin routes
router
    .route("/assign-role/:userId")
    .post(
        verifyJWT,
        verifyPermission([UserRolesEnum.ADMIN]),
        mongoIdPathVariableValidator("userId"),
        userAssignRoleValidator(),
        validate,
        assignRole
    );

// Social login
router.route("/google").get(
    passport.authenticate("google", {
        scope: ["profile", "email"],
    }),
    (req, res) => {
        res.send("redirecting to google...");
    }
);
router
    .route("/google/callback")
    .get(passport.authenticate("google"), handleSocialLogin);


export default router