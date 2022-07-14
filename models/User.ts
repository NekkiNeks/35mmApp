import mongoose, { Schema, Types } from "mongoose";

interface iUser {
  login: string;
  password: string;
  description?: string;
  avatar_url?: string;
  follows?: Types.ObjectId[];
  photos?: Types.ObjectId[];
}

const userSchema = new mongoose.Schema<iUser>(
  {
    login: { type: String, required: true },
    password: { type: String, required: true },
    description: { type: String },
    avatar_url: { type: String },
    follows: { type: [Schema.Types.ObjectId], ref: "User" },
    photos: { type: [Schema.Types.ObjectId], ref: "Photo" },
  },
  { collection: "users" }
);

export default mongoose.model<iUser>("User", userSchema);
