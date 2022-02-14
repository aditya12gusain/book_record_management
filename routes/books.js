const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /books
 * TYPE: GET
 * Description: Get all books
 * Access: Public
 * Parameters: None
 */
router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: books });
});

/**
 * Route: /books/:id
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
 * Route: /books/issued/books
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

/**
 * Route: /books
 * TYPE: POST
 * Description: Create New Book
 * Access: Public
 * Data: author, name, genre, price, publisher, id
 */
router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "No data provided" });
  }

  const allBooks = [...books, data];

  return res.status(201).json({ success: true, data: allBooks });
});

/**
 * Route: /books/:id
 * TYPE: PUT
 * Description: Update Book
 * Access: Public
 * Data: author, name, genre, price, publisher, id
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }

  const updatedData = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });

  return res.status(200).json({ success: true, data: updatedData });
});

module.exports = router;
