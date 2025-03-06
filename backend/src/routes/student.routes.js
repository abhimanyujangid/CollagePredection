import { Router } from "express";
import {createStudentProfile, getStudentProfile, updateStudentProfile} from '../controllers/student.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()



//secured routes
router.route("/").post(verifyJWT('student'), createStudentProfile);
router.route("/").get(verifyJWT('student'), getStudentProfile);
router.route("/:id").put(verifyJWT('student'), updateStudentProfile);


export default router