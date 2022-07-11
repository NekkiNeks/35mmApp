import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import { mongoURI, mongoOptions } from "./config";

// variables
const PORT = 4000;

// middleware
app.use(cors());
app.use(express.json());

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

app.get("/", (req, res) => {
  res.send("homepage");
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
