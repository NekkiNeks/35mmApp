const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// variables
const PORT = 4000;

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use("/users/", require("./routes/users"));
app.use("/auth/", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("homepage");
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
