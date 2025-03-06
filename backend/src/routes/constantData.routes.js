import { Router } from "express";
import { createConstantData, getConstantData, updateConstantData, deleteConstantData  } from "../controllers/constantData.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()



//secured routes
router.route("/").post(verifyJWT('admin'), createConstantData);
router.route("/").get(verifyJWT('student','administrator','admin'), getConstantData);
router.route("/:constantDataId").put(verifyJWT('admin'), updateConstantData);
router.route("/:constantDataId").delete(verifyJWT('admin'), deleteConstantData);


export default router