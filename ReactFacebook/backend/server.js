const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// Create express app
const app = express();
app.use(express.json());
app.use(cors());

//routes
readdirSync("./routes")
  .map((r) => app.use("/", require("./routes/" + r)));

// Connect to the database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

// Select the port for the app to listen on
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`);
});
