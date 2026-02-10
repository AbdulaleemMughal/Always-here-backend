import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


export const connectDatabase = async () => {
    await mongoose.connect(process.env.MONGODB_URI + process.env.MONGODB_NAME);
    console.log("Database connected succcessfully!")
};