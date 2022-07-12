import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { mongoURI, mongoOptions } from "./config";

// variables
const PORT = 4000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

async function connectDatabase() {
  try {
    await mongoose.connect(mongoURI, mongoOptions);
    console.log("connected to mongo database...");
  } catch (error) {
    if (error instanceof Error) {
      console.log(`connection to database error: ${error.message}`);
    }
    process.exit();
  }
}

connectDatabase();

//routes
app.use("/api/users", require("./routes/users.ts"));
app.use("/api/auth", require("./routes/auth.ts"));
app.use("/api/account", require("./routes/account.ts"));
app.use("/api/photos", require("./routes/photos.ts"));

app.get("/", (req, res) => {
  res.send("routes: users, auth, account");
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
