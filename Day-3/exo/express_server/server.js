import express from "express";
import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.js";

// connect db
connectDB();

const app = express();

// Middleware hear  


// API routes
app.use("/api/v1", authRoutes);

// any error handler here

const PORT = process.env.PORT || 5000; // .env.PORT is used 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});