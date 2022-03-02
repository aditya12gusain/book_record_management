const express = require("express");
const DbConnect = require("./databaseConnection");
const usersRouter = require("./routes/user-route");
const booksRouter = require("./routes/book-route");

require("dotenv").config();
// or
// const dotenv = require("dotenv");
// dotenv.config();

const app = express();

// database connection
DbConnect();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to the API" });
});

// routes
app.use("/users", usersRouter);
app.use("/books", booksRouter);

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
