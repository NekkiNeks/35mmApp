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
    follows: { type: [Schema.Types.ObjectId] },
    photos: { type: [Schema.Types.ObjectId] },
  },
  { collection: "users" }
);

export default mongoose.model<iUser>("User", userSchema);
