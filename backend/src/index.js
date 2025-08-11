import express from "express";
import dotenv from "dotenv";
import {clerkMiddleware} from '@clerk/express';
import {fileUpload} from 'express-fileupload';
import path from "path";

import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT;

// to parse req.body, utility middleware (universal and is applied to every single incoming request)
app.use(express.json())
app.use(clerkMiddleware()); // adds auth to req object => req.auth
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 mb file size
    },
    
}))

// router middleware that checks every request to see if the path is matching, and if so runs the function
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/songs", songRoutes)
app.use("/api/albums", albumRoutes)
app.use("/api/stats", statRoutes)

// error handler
app.use((err, req, res, next) => {
    res.status(500).json({message: process.env.NODE_ENV === "production" ? "Internal sever error": err.message})
})

app.listen(PORT, ()=> {
    console.log("server is running on port " + PORT);
    connectDB();
})