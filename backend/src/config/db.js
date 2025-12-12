import mongoose from 'mongoose';
import {ENV} from './env.js';

export const connectDB = async() => {
    try{
        const conn = mongoose.connect(ENV.DB_URL);
        console.log(`✅ Connected to MongoDB: ${(await conn).connection.host}`);
    }
    catch(error){
        console.error("MongoDB failded to connect");
        process.exit(1); // 1 means failure and 0 means success
    }
}