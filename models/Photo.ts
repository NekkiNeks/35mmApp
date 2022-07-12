import mongoose, { Schema, Types } from "mongoose";

interface iPhoto {
  name: string;
  owner: Types.ObjectId;
  camera?: string;
  film?: string;
}

const userSchema = new mongoose.Schema<iPhoto>(
  {
    name: String,
    owner: Schema.Types.ObjectId,
    camera: String,
    film: String,
  },
  { collection: "photos" }
);

export default mongoose.model<iPhoto>("Photo", userSchema);
