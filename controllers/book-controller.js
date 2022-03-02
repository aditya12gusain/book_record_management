const IssuedBook = require("../dtos/signup-user-dto");
const bookModel = require("../models/book-model");
const userModel = require("../models/user-model");

exports.getAllBooks = async (req, res) => {
  const books = await bookModel.find();
  if (books.length === 0)
    return res.status(404).json({ success: false, message: "No books found" });
  res.status(200).json({ success: true, data: books });
};

exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;

  const book = await bookModel.findById(id);

  if (!book) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }
  res.status(200).json({
    success: true,
    data: book,
  });
};

exports.getAllIssuedBooks = async (req, res) => {
  const users = await userModel
    .find({ issuedBook: { $exists: true } })
    .populate("issuedBook");

  console.log(users);

  const issuedBooks = users.map((each) => new IssuedBook(each));

  if (users.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "No books issued yet" });
  }
  res.status(200).json({ success: true, data: issuedBooks });
};

exports.addNewBook = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "No data provided" });
  }

  await bookModel.create(data);

  const allBooks = await bookModel.find();

  return res.status(201).json({ success: true, data: allBooks });
};

exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const updatedBook = await bookModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });

  return res.status(200).json({ success: true, data: updatedBook });
};
