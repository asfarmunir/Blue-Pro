import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String },
    userType:{type:String, default:'user' },
    googleId: String,
    googleEmail: String,
    googleDisplayName: String,
    googlePhoto: String,
    bluepoints: {type:Number, default:0},
    isBlocked: {
      type: Boolean,
      default: false
    },
    
  },
  { timestamps: true },
  


);

const User = models.User || model("User", UserSchema);

export default User;