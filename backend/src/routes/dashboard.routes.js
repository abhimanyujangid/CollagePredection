import { Router } from "express";
import {
    verifyJWT,
    verifyPermission,
} from "../middlewares/auth.middleware.js";

import { getTopTensCollege, getAllColleges } from "../controllers/dashboard.controller.js"

const router = Router();

router.route("/top-tens-colleges").get(verifyJWT, getTopTensCollege);
router.route("/all-colleges/:typeOfCollege").get(verifyJWT, getAllColleges);


export default router;