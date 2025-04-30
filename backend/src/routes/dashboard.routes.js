import { Router } from "express";
import {
    verifyJWT,
    verifyPermission,
} from "../middlewares/auth.middleware.js";

import { getTopTensCollege } from "../controllers/dashboard.controller.js"

const router = Router();

router.route("/top-tens-colleges").get(verifyJWT, getTopTensCollege);

export default router;