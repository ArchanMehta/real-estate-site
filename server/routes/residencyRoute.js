import express from "express"
import cors from "cors";

import { createResidency, getallresd, getresd } from "../controllers/residencyController.js";
import jwtCheck from "../config/auth0config.js";
const router = express.Router();


router.use(cors());

router.post("/create",jwtCheck,createResidency)
router.get("/getallresd",getallresd)
router.get("/:id",getresd)


export {router as residencyRoute}