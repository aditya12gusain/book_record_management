const express = require("express");
const { users } = require("./data/users.json");
const { books } = require("./data/books.json");

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
app.get("/user", (req, res) => {
  res.status(200).json({ success: true, data: users });
});

/**
 * Route: /user/:id
 * TYPE: GET
 * Description: Get user by id
 * Access: Public
 * Parameters: id
 */
app.get("/user/:id", (req, res) => {
  const user = users.filter((each) => each.id === req.params.id);

  if (user.length === 0)
    return res.status(404).json({ success: false, message: "User not found" });

  res.status(200).json({ success: true, data: user });
});

/**
 * Route: /book
 * TYPE: GET
 * Description: Get all books
 * Access: Public
 * Parameters: None
 */
app.get("/book", (req, res) => {
  res.status(200).json({ success: true, data: books });
});

/**
 * Route: /book/:id
 * TYPE: GET
 * Description: Get book by id
 * Access: Public
 * Parameters: id
 */
app.get("/book/:id", (req, res) => {
  const book = books.filter((each) => each.id === parseInt(req.params.id));

  if (book.length === 0)
    return res.status(404).json({ success: false, message: "Book not found" });

  res.status(200).json({
    success: true,
    data: book,
  });
});

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
