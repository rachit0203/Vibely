import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true, // allow frontend to send cookies 
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);


const startServer = async () => {
    try {
        await connectDB();
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();

