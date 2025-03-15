import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

let cached = (global).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGO_URI) throw new Error("MONGO_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGO_URI);

  cached.conn = await cached.promise;
    console.log('Connected to database');
  return cached.conn;
};