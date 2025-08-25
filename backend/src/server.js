import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

// Trust Render/Proxies to ensure secure cookies work behind proxy
app.set("trust proxy", 1);

// Configure CORS
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:5173",
            "http://localhost:5001",
            "https://govibely.onrender.com",
            process.env.CLIENT_URL,
        ].filter(Boolean);

        // Allow requests with no origin (like mobile apps or curl) and same-origin
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        console.log(`CORS blocked for origin: ${origin}`);
        return callback(new Error(`Not allowed by CORS. Origin: ${origin}`));
    },
    credentials: true, // allow frontend to send cookies 
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Serve static files from the frontend in production
if (process.env.NODE_ENV === "production") {
    const staticPath = path.join(__dirname, "../../frontend/dist");
    
    // Serve static files
    app.use(express.static(staticPath, {
        setHeaders: (res, path) => {
            // Set proper MIME types for CSS and JS files
            if (path.endsWith('.css')) {
                res.setHeader('Content-Type', 'text/css');
            } else if (path.endsWith('.js')) {
                res.setHeader('Content-Type', 'application/javascript');
            }
        }
    }));
    
    // Handle SPA client-side routing - return index.html for all other routes
    app.get('*', (req, res) => {
        // Don't serve index.html for API routes
        if (req.path.startsWith('/api/')) {
            return res.status(404).json({ message: 'API route not found' });
        }
        res.sendFile(path.join(staticPath, 'index.html'));
    });
}

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