import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Define a route handler for the root URL
app.get("/", (req, res) => {
    res.send("Welcome to the API"); // Send a welcome message or HTML page
});

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
});

app.use('/api/user', userRoute);
app.use('/api/residency', residencyRoute);
