const express = require("express");
const users = require("./data/users.json");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the API" });
});

/**
 * Route: /user
 * TYPE: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */
app.get("/user", (req, res) => {});

// Error handler for undefined routes
app.all("*", (req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Variable storing server port
const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
