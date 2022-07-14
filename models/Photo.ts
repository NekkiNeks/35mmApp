import mongoose, { Schema, Types } from "mongoose";

interface iPhoto {
  name: string;
  owner: Types.ObjectId;
  camera?: string;
  film?: string;
}

const userSchema = new mongoose.Schema<iPhoto>(
  {
    name: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    camera: { type: String },
    film: { type: String },
  },
  { collection: "photos" }
);

export default mongoose.model<iPhoto>("Photo", userSchema);
