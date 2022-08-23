const express = require("express");

// Create express app
const app = express();

// Select the port for the app to listen on
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`);
});
