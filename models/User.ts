import mongoose from "mongoose";

interface iUser {
  login: string;
  password: string;
  description: string;
  avatar_url?: string;
}

const userSchema = new mongoose.Schema<iUser>(
  {
    login: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "users" }
);

export default mongoose.model<iUser>("User", userSchema);
