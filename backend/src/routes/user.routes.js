import { Router } from "express";
import { 
    changeCurrentPassword, 
    getCurrentUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser, 
    updateUserAvatar, 
    updateUserDetails 
    } from "../controllers/user.controller.js";
import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT('student', 'administrator', 'admin'), logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(upload.none(), verifyJWT('student', 'administrator', 'admin'), changeCurrentPassword);
router.route("/current-user").get(verifyJWT('student', 'administrator', 'admin'), getCurrentUser);

router.route("/update-user").patch(upload.none(), verifyJWT('student', 'administrator', 'admin'), updateUserDetails);
router.route("/update-avatar").patch(verifyJWT('student', 'administrator', 'admin'), upload.single('avatar'), updateUserAvatar);


export default router