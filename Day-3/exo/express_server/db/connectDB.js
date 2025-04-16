import mongoose from "mongoose";

mongoose

.connect("mondodb://localhost:27017/express_db")
.then(() => console.log("Connected"))
.catch((err) => console.error("connection error:", err));
