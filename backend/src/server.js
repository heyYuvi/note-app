import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import protect from "./middlewares/authMiddleware.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());


// Health Check

app.get("/health", (req, res) => {
    res.json({
        success: true,
        status: "ok",
        timestamp: new Date().toISOString(),
        message: "Note app is running"
    });
});

app.use("/api", authRoutes);
app.use("/api", noteRoutes);


const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log("Server is running on the Port: ", PORT);
        });
    } catch (error) {
        console.error("Server Failed: ", error.message);
    }
}

startServer();