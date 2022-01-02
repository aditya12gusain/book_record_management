const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /book
 * TYPE: GET
 * Description: Get all books
 * Access: Public
 * Parameters: None
 */
router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: books });
});

/**
 * Route: /book/:id
 * TYPE: GET
 * Description: Get book by id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", (req, res) => {
  const book = books.filter((each) => each.id === parseInt(req.params.id));

  if (book.length === 0)
    return res.status(404).json({ success: false, message: "Book not found" });

  res.status(200).json({
    success: true,
    data: book,
  });
});

/**
 * Route: /book/issued/books
 * TYPE: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: id
 */
router.get("/issued/books", (req, res) => {
  const user = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBooks = [];

  user.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;
    issuedBooks.push(book);
  });

  if (issuedBooks.length === 0)
    return res.status(404).json({ success: false, message: "No books issued" });

  res.status(200).json({ success: true, data: issuedBooks });
});

module.exports = router;
