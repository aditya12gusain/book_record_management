const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById,
} = require("../controllers/book-controller");

// /books + / = /books/
/**
 * Route: /books
 * TYPE: GET
 * Description: Get all the books
 * Access: Public
 * Parameters: none
 */
router.get("/", getAllBooks);

// /books + /:id = /books/:id
/**
 * Route: /books/:id
 * TYPE: GET
 * Description: Get a book by id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", getSingleBookById);

// /books + /issued/books = /books/issued/books
/**
 * Route: /books/issued/books
 * TYPE: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */
router.get("/issued/books", getAllIssuedBooks);

// /books + / = /books/
/**
 * Route: /books
 * TYPE: POST
 * Description: Adding new book / Creating new book
 * Access: Public
 * Parameters: none
 * Data: author, name, genre, price, publisher, id
 */
router.post("/", addNewBook);

// /books + /:id = /books/:id
/**
 * Route: /books/:id
 * TYPE: POST
 * Description: Updaing book on bacis of id
 * Access: Public
 * Parameters: id
 * Data: author, name, genre, price, publisher, id
 */
router.put("/:id", updateBookById);

module.exports = router;
