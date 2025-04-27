import { Router } from "express";

import { uploadCollege } from "../controllers/upload.controller.js";

const router = Router()

//secured routes
router.route("/college-db").post(uploadCollege)




export default router