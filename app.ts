import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
// variables
const PORT = 4000;

// middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

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
