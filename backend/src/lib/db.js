import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGOURI || process.env.MONGODB_URI;
        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log("Error in connecting to Mongo DB" , error);
        process.exit(1);
    }
} 