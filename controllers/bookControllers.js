const Book = require("../models/bookModel");

//CREATE:
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        book: newBook,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
//READ:
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(201).json({
      status: "success",
      data: {
        books: books,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        book: book,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
//UPDATE:
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        book: book,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
//DELETE:
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//AGGREGATION PIPELINE:
exports.getStatistics = async (req, res) => {
  try {
    const statistics = await Book.aggregate([
      {
        $group: {
          _id: "$genre",
          averagePublicationYear: { $avg: { $toInt: "$publication" } },
          totalBooks: { $sum: 1 },
        },
      },
      {
        $project: {
          genre: "$_id",
          _id: 0,
          averagePublicationYear: 1,
          totalBooks: 1,
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        data: statistics,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "error",
      data: {
        data: err,
      },
    });
  }
};
