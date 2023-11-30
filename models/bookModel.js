const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A book must have a title"],
  },
  author: {
    type: String,
    required: [true, "A book must have a author"],
  },
  genre: {
    type: String,
    required: [true, "A book must have a genre"],
  },
  publication: {
    type: Number,
    required: [true, "A book must have a publication"],
  },
  ISBN: {
    type: Number,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
