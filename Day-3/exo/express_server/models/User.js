import { model, Schema } from "mongoose";  

const userSchema = new Schema({

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: String ,
    isAdmin:{
        type: Boolean,
        default: false, 
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
export const User = model("User", userSchema);