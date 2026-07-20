import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

const port = process.env.PORT 

connectDB();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
        ],
        credentials: true,
    })
); // allows frontend to send requests to backend.
app.use(express.json());    // allows your server to read JSON data sent by the frontend or Postman
app.use(cookieParser());    //allows you to read cookies


app.use("/", authRoutes);

app.use(
    "/students",
    studentRoutes
);

app.use(
    "/attendance",
    attendanceRoutes
);

app.use(
    "/",
    dashboardRoutes
);

app.get("/", (req, res) => {
    res.send(
        "SmartSchool Backend is Running"
    );
});

app.listen(
    port,
    "0.0.0.0",
    () => {
        console.log(
            `Server running on port ${port}`
        );
    }
);
