import express from "express";
import cors from "cors";
import { bookvisit, cancelbooking, createUser, getallbookings, getallfavs, tofav } from "../controllers/userController.js";
import jwtCheck from "../config/auth0config.js";

const router = express.Router();

// Use CORS middleware
router.use(cors()); 
// Define routes
router.post("/register", createUser);
router.post("/bookvisit/:id",jwtCheck,  bookvisit);
router.post("/getallbookings", getallbookings);
router.post("/removebooking/:id", jwtCheck,cancelbooking);
router.post("/tofav/:rid",  jwtCheck,tofav);
router.post("/allfavresd",jwtCheck,  getallfavs);

export { router as userRoute };


     